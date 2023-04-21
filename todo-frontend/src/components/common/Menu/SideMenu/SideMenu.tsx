import Header from "./Header";
import LogoutButton from "./LogoutButton";

const SideMenu = () => {
  return (
    <aside className="w-[16%] min-w-[160px] flex flex-col p-3 justify-between h-screen relative bg-[#fbfbfa] border-r-2 border-[#f1f0f0]">
      <Header />
      <LogoutButton />
    </aside>
  );
};

export default SideMenu;
