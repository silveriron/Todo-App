import { useState } from "react";
import StatusBox from "@/components/todo/StatusBox";
import { Status } from "@/types/status";

const StatusInput = () => {
  const [todoStatus, setTodoStatus] = useState<Status>(Status.TODO);
  const [isShowStatus, setIsShowStatus] = useState<boolean>(false);

  const ShowStatusHandler = () => {
    setIsShowStatus((prev) => !prev);
  };

  const statusTodoHandler = () => {
    setTodoStatus(Status.TODO);
    setIsShowStatus((prev) => !prev);
  };

  const statusInProgressHandler = () => {
    setTodoStatus(Status.IN_PROGRESS);
    setIsShowStatus((prev) => !prev);
  };

  const statusDoneHandler = () => {
    setTodoStatus(Status.DONE);
    setIsShowStatus((prev) => !prev);
  };

  const status =
    todoStatus === Status.TODO ? (
      <StatusBox type={Status.TODO}>Todo</StatusBox>
    ) : todoStatus === Status.IN_PROGRESS ? (
      <StatusBox type={Status.IN_PROGRESS}>In Progress</StatusBox>
    ) : (
      <StatusBox type={Status.DONE}>Done</StatusBox>
    );
  return (
    <div className="relative">
      <button onClick={ShowStatusHandler} type="button">
        {status}
      </button>
      {isShowStatus && (
        <div className="flex flex-col gap-2 absolute z-10 top-8">
          <button type="button" onClick={statusTodoHandler}>
            <StatusBox type={Status.TODO}>Todo</StatusBox>
          </button>
          <button type="button" onClick={statusInProgressHandler}>
            <StatusBox type={Status.IN_PROGRESS}>In Progress</StatusBox>
          </button>
          <button type="button" onClick={statusDoneHandler}>
            <StatusBox type={Status.DONE}>Done</StatusBox>
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusInput;
