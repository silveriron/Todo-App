import { useMutation } from "@tanstack/react-query";
import Text from "../../../typography/Text";
import Logout from "./icons/Logout";
import { signOut } from "@/lib/api/api";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();
  const mutation = useMutation(signOut, {
    onSuccess: () => {
      window.location.href = "/auth/signin";
    },
  });

  const logoutHandler = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={logoutHandler}
      className="flex justify-end gap-3 items-center hover:bg-todo-color p-1"
    >
      <Text>로그아웃</Text>
      <Logout />
    </button>
  );
};

export default LogoutButton;
