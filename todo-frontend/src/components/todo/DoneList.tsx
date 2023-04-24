import React from "react";
import StatusBox from "./StatusBox";
import BigText from "../common/typography/BigText";
import { Status } from "@/types/status";

const DoneList = () => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type={Status.DONE}>
        <BigText>Done</BigText>
      </StatusBox>
    </section>
  );
};

export default DoneList;
