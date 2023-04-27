import Link from "next/link";
import React from "react";

const REDIRECT_URI =
  "http://ec2-52-78-166-75.ap-northeast-2.compute.amazonaws.com/auth/kakao/callback";

const href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const KaKaoLogin = () => {
  return <Link href={href}>KAKAO Login</Link>;
};

export default KaKaoLogin;
