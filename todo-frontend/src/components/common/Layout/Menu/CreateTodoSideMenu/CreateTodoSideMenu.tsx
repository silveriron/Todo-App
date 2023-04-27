import ArrowBack from "./icons/ArrowBack";
import { useRecoilState } from "recoil";
import { createTodoMenuState } from "@/store/atoms/createTodoMenuState";
import CreateTodoForm from "@/components/todo/Create/CreateTodoForm";
import Link from "next/link";
import FullScreen from "./icons/FullScreen";
import { useRouter } from "next/router";

const CreateTodoSideMenu = () => {
  const router = useRouter();
  const [isCreateTodoMenu, setIsCreateTodoMenu] =
    useRecoilState(createTodoMenuState);

  const w = isCreateTodoMenu ? "w-[40%]" : "w-[0px]";

  const toggleCreateTodoMenu = () => {
    setIsCreateTodoMenu(!isCreateTodoMenu);
  };

  const changeFullScreenHandler = () => {
    setIsCreateTodoMenu(false);
    router.push("/todo/edit");
  };

  return (
    <div
      className={`${w} h-screen overflow-hidden bg-neutral-50 border-l border-[#f3f3f3]`}
      style={{
        boxShadow: "0px 1px 2px 0 rgba(0,0,0,0.2)",
        transition: "width ease 0.3s",
      }}
    >
      <div className="p-3">
        <div className="flex gap-4">
          <button onClick={toggleCreateTodoMenu}>
            <ArrowBack />
          </button>
          <button onClick={changeFullScreenHandler}>
            <FullScreen />
          </button>
        </div>
        <CreateTodoForm />
      </div>
    </div>
  );
};

export default CreateTodoSideMenu;
