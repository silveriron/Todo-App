import Link from "next/link";
import React from "react";

const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

const KaKaoLogin = () => {
  return (
    <Link
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`}
    >
      KAKAO Login
    </Link>
  );
};

export default KaKaoLogin;
