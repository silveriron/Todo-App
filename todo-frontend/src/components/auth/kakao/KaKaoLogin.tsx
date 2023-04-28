import Link from "next/link";
import React from "react";

const REDIRECT_URI = "https://todo-app.shop/auth/kakao/callback";

const href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KaKaoLogin = () => {
  return <Link href={href}>KAKAO Login</Link>;
};

export default KaKaoLogin;
