import Text from "@/components/common/typography/Text";
import PersonIcons from "@/components/todo/icons/PersonIcons";
import StatusIcons from "@/components/todo/icons/StatusIcons";
import React from "react";

const Create = () => {
  return (
    <div className="w-full flex justify-center">
      <form className="w-[41%] h-[200px]">
        <div className="pt-12 pb-6 flex flex-col gap-2 border-b border-[#e0e0e0]">
          <input
            className=" text-[2.5rem] outline-none font-bold placeholder:text-[#E1E1E0] placeholder:font-bold"
            placeholder="제목 없음"
          />
          <label className="w-[6.25rem] h-8 flex items-center gap-1">
            <StatusIcons />
            <Text className="text-[#a8a8a8]">상태</Text>
          </label>
          <label className="w-[6.25rem] h-8  flex items-center gap-1">
            <PersonIcons />
            <Text className="text-[#a8a8a8]">담당자</Text>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Create;
