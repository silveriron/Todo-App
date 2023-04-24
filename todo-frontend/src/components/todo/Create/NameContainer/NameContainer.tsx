import PersonIcons from "@/components/todo/icons/PersonIcons";
import Text from "@/components/common/typography/Text";

const NameContainer = () => {
  return (
    <div className="flex items-center gap-1">
      <label className="w-[6.25rem] h-8  flex items-center gap-1">
        <PersonIcons />
        <Text className="text-[#a8a8a8]">담당자</Text>
      </label>
      <input
        type="text"
        placeholder="비어 있음"
        className="hover:bg-todo-color hover: cursor-pointer outline-none rounded p-1"
      />
    </div>
  );
};

export default NameContainer;
