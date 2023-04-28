import Link from "next/link";
import React from "react";

const REDIRECT_URI = "https://todo-app.shop/auth/kakao/callback";

const href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KaKaoLogin = () => {
  return (
    <Link
      className="h-[35px] flex justify-center items-center rounded font-bold bg-[#FAE64D] mb-2"
      href={href}
    >
      카카오로 1초만에 로그인
    </Link>
  );
};

export default KaKaoLogin;
