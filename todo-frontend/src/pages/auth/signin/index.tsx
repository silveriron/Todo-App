import Button from "@/components/Sign/Button";
import Input from "@/components/Sign/Input";
import useApi from "@/hooks/useApi";
import useInput from "@/hooks/useInput";
import { emailValidator, passwordValidator } from "@/lib/validator";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Signin = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassworError] = useState(false);
  const {
    value: email,
    onChange: onChangeEmail,
    isValidate: isEmailValidate,
  } = useInput({
    validator: emailValidator,
  });
  const {
    value: password,
    onChange: onChangePassword,
    isValidate: isPasswordValidate,
  } = useInput({
    validator: passwordValidator,
  });
  const router = useRouter();
  const { signInhandler } = useApi();

  useEffect(() => {
    if (window) {
      const token = localStorage.getItem("access_token");

      if (token) {
        router.push("/todo");
      }
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValidate && !isPasswordValidate) {
      if (!isEmailValidate) {
        setEmailError(true);
      }

      if (!isPasswordValidate) {
        setPassworError(true);
      }
      return;
    }

    signInhandler({ email, password });
  };

  const isFormCheck = isEmailValidate && isPasswordValidate;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-[300px]">
      <Input
        value={email}
        name="email"
        onChange={onChangeEmail}
        testid="email-input"
        type="email"
      />
      {emailError && <div className="text-red-500">이메일을 확인해주세요.</div>}
      <Input
        value={password}
        name="password"
        onChange={onChangePassword}
        testid="password-input"
        type="password"
      />
      {passwordError && (
        <div className="text-red-500">
          비밀번호는 8자 이상으로 만들어주세요.
        </div>
      )}
      <Button disabled={!isFormCheck} testid="signin-button">
        로그인
      </Button>
      <Link className="text-center" href="/signup">
        <span className="hover:text-red-600 hover:border-b-red-600 border-b-2">
          회원가입
        </span>
      </Link>
    </form>
  );
};

export default Signin;
