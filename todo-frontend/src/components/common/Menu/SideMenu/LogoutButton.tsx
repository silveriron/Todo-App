import Text from "../../typography/Text";
import Logout from "../icons/Logout";

const LogoutButton = () => {
  return (
    <button className="flex justify-end gap-3 items-center hover:bg-todo-color p-1">
      <Text>로그아웃</Text>
      <Logout />
    </button>
  );
};

export default LogoutButton;
