import React from "react";
import StatusBox from "./StatusBox";
import BigText from "../common/typography/BigText";

const DoingList = () => {
  return (
    <section className="w-[19.8%]">
      <StatusBox type="doing">
        <BigText>Doing</BigText>
      </StatusBox>
    </section>
  );
};

export default DoingList;
