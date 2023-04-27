import { useRecoilState, useRecoilValue } from "recoil";
import Header from "./Header";
import LogoutButton from "./LogoutButton";
import { menuState } from "@/store/atoms/menuState";
import Text from "@/components/common/typography/Text";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/lib/api/api";

const SideMenu = () => {
  const [isMenu, SetIsMenu] = useRecoilState(menuState);
  const { mutate } = useMutation(signOut, {
    onSuccess: () => {
      SetIsMenu(false);
      window.location.href = "/auth/signin";
    },
  });

  const signOutHandler = () => {
    mutate();
  };

  const w = isMenu ? "w-[16%]" : "w-[0px]";
  const minW = isMenu ? "min-w-[160px]" : "min-w-[0px]";

  return (
    <aside
      className={`${w} ${minW} overflow-hidden h-screen bg-[#fbfbfa]  border-[#f1f0f0] `}
      style={{ transition: "width ease 0.3s" }}
    >
      <div className="w-full h-full justify-between flex flex-col p-3 border-r-2">
        <div className="flex flex-col gap-2">
          <Header />
          <div className="flex justify-between items-center">
            <button onClick={signOutHandler}>
              <Text>Logout</Text>
            </button>
          </div>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
};

export default SideMenu;
