import React from "react";
import StatusBox from "./StatusBox";
import BigText from "../common/typography/BigText";

const DoneList = () => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type="done">
        <BigText>Done</BigText>
      </StatusBox>
    </section>
  );
};

export default DoneList;
