import { useRecoilValue } from "recoil";
import Header from "./Header";
import LogoutButton from "./LogoutButton";
import { menuState } from "@/store/atoms/menuState";

const SideMenu = () => {
  const isMenu = useRecoilValue(menuState);

  const w = isMenu ? "w-[16%]" : "w-[0px]";
  const minW = isMenu ? "min-w-[160px]" : "min-w-[0px]";

  return (
    <aside
      className={`${w} ${minW} overflow-hidden h-screen bg-[#fbfbfa]  border-[#f1f0f0] `}
      style={{ transition: "width ease 0.3s" }}
    >
      <div className="w-full h-full justify-between flex flex-col p-3 border-r-2">
        <Header />
        <LogoutButton />
      </div>
    </aside>
  );
};

export default SideMenu;
