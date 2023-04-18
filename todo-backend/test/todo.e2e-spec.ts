import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';

describe('todo e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Todo', () => {
    it('SUCCESS: todo 전체 조회', async () => {
      await request(app.getHttpServer()).post('/api/v1/auth/signup').send({
        email: 'test@test.com',
        userName: 'test',
        password: 'test123456',
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/signin')
        .send({ email: 'test@test.com', password: 'test123456' });

      const access_token = response.headers['set-cookie'][0];

      return request(app.getHttpServer())
        .get('/api/v1/todos')
        .set('Cookie', access_token)
        .expect(200);
    });

    it('FAIL: todo 전체 조회 (로그인 안됨)', async () => {
      return request(app.getHttpServer()).get('/api/v1/todos').expect(401);
    });

    it('SUCCESS: Todo 생성', async () => {
      await request(app.getHttpServer()).post('/api/v1/auth/signup').send({
        email: 'test@test.com',
        userName: 'test',
        password: 'test123456',
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/signin')
        .send({ email: 'test@test.com', password: 'test123456' });

      const access_token = response.headers['set-cookie'][0];

      return request(app.getHttpServer())
        .post('/api/v1/todos')
        .set('Cookie', access_token)
        .send({ title: 'test todo', content: 'test content' })
        .expect(201);
    });
  });
});
