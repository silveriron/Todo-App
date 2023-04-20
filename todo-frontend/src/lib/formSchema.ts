import * as yup from "yup";

const email = yup
  .string()
  .email("이메일을 확인해주세요.")
  .required("이메일을 확인해주세요.");

const password = yup
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .required("비밀번호를 확인해주세요.");

const userName = yup.string().required("이름을 확인해주세요.");

export const signinSchema = yup.object().shape({
  email,
  password,
});

export const signupSchema = yup.object().shape({
  email,
  userName,
  password,
});
