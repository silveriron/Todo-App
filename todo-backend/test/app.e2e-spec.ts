import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { unlinkSync } from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    unlinkSync('./test.sqlite');
  });

  describe('Auth', () => {
    it('SUCCESS: 회원가입 완료', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@test.com',
          password: 'test123456',
          userName: 'test',
        })
        .expect(201);
    });
    it('FAIL: 회원가입 중복가입 오류', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({
          email: 'test@test.com',
          password: 'test123456',
          userName: 'test',
        })
        .expect(400);
    });

    it('FAIL: 회원가입 이메일 형식 오류', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({
          email: 'test',
          password: 'test123456',
          userName: 'test',
        })
        .expect(400);
    });

    it('FAIL: 회원가입 비밀번호 8자 이하 오류', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/signup')
        .send({
          email: 'test1@test.com',
          password: 'test',
          userName: 'test',
        })
        .expect(400);
    });

    it('SUCCESS: 로그인 완료', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/signin')
        .send({
          email: 'test@test.com',
          password: 'test123456',
        })
        .expect(201);
    });

    it('FAIL: 로그인 계정 오류', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/signin')
        .send({
          email: 'test11@test.com',
          password: 'test123456',
        })
        .expect(400);
    });

    it('FAIL: 로그인 비밀번호 오류', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/signin')
        .send({
          email: 'test@test.com',
          password: 'test',
        })
        .expect(400);
    });

    it('SUCCESS: 로그아웃 완료', async () => {
      const response = await request(app.getHttpServer()).post(
        '/api/v1/auth/signout',
      );

      expect(response.status).toBe(201);
      expect(response.headers['set-cookie'][0].split(';')[0]).toEqual(
        'access_token=',
      );
      expect(response.headers['set-cookie'][1].split(';')[0]).toEqual(
        'refresh_token=',
      );
    });
  });

  describe('Todo', () => {
    it('SUCCESS: todo 전체 조회', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/signin')
        .send({ email: 'test@test.com', password: 'test123456' });

      return request(app.getHttpServer()).get('/api/v1/todos').expect(200);
    });

    it('FAIL: todo 전체 조회 (로그인 안됨)', async () => {
      return request(app.getHttpServer()).get('/api/v1/todos').expect(401);
    });

    it('SUCCESS: Todo 생성', async () => {
      return request(app.getHttpServer())
        .post('/api/v1/todos')
        .send({ title: 'test todo', content: 'test content' })
        .expect(201);
    });
  });
});
