import StatusIcons from "@/components/todo/icons/StatusIcons";
import Text from "@/components/common/typography/Text";
import StatusInput from "../StatusInput/StatusInput";

const StatusContainer = () => {
  return (
    <div className="flex items-center gap-1">
      <label className="w-[6.25rem] h-8 flex items-center gap-1">
        <StatusIcons />
        <Text className="text-[#a8a8a8]">상태</Text>
      </label>
      <StatusInput />
    </div>
  );
};

export default StatusContainer;
