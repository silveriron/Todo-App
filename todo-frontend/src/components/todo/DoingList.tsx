import React from "react";
import StatusBox from "./StatusBox";
import BigText from "../common/typography/BigText";
import { Status } from "@/types/status";

const DoingList = () => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type={Status.IN_PROGRESS}>
        <BigText>Doing</BigText>
      </StatusBox>
    </section>
  );
};

export default DoingList;
