import Text from "@/components/common/typography/Text";
import NameContainer from "@/components/todo/Create/NameContainer/NameContainer";
import StatusContainer from "@/components/todo/Create/StatusContainer/StatusContainer";
import StatusInput from "@/components/todo/Create/StatusInput/StatusInput";
import PersonIcons from "@/components/todo/icons/PersonIcons";
import StatusIcons from "@/components/todo/icons/StatusIcons";
import React, { useEffect, useState } from "react";

const Editor = React.lazy(
  () => import("@/components/todo/Create/Editor/Editor")
);

const Create = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (window) {
      setInit(true);
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <form className="w-[41%] h-[200px]">
        <div className="pt-12 pb-6 flex flex-col gap-2 border-b border-[#e0e0e0] mb-7">
          <input
            className=" text-[2.5rem] outline-none font-bold placeholder:text-[#E1E1E0] placeholder:font-bold"
            placeholder="제목 없음"
          />
          <StatusContainer />
          {/* <NameContainer /> */}
        </div>
        {init && <Editor />}
      </form>
    </div>
  );
};

export default Create;
