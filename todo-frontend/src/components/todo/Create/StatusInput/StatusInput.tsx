import { useEffect, useState } from "react";
import StatusBox from "@/components/todo/StatusBox";
import { Status } from "@/types/status";
import { useRecoilState } from "recoil";
import { Todo } from "@/store/atoms/Todo";

const StatusInput = () => {
  const [todo, setTodo] = useRecoilState(Todo);
  const [isShowStatus, setIsShowStatus] = useState<boolean>(false);

  const ShowStatusHandler = () => {
    setIsShowStatus((prev) => !prev);
  };

  const statusHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const status = e.currentTarget.dataset.set as Status;

    setTodo((prev) => ({ ...prev, isStatus: status }));

    setIsShowStatus((prev) => !prev);
  };

  const status =
    todo.isStatus === Status.TODO ? (
      <StatusBox type={Status.TODO}>Todo</StatusBox>
    ) : todo.isStatus === Status.IN_PROGRESS ? (
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
          <button type="button" data-set={Status.TODO} onClick={statusHandler}>
            <StatusBox type={Status.TODO}>Todo</StatusBox>
          </button>
          <button
            type="button"
            data-set={Status.IN_PROGRESS}
            onClick={statusHandler}
          >
            <StatusBox type={Status.IN_PROGRESS}>In Progress</StatusBox>
          </button>
          <button type="button" data-set={Status.DONE} onClick={statusHandler}>
            <StatusBox type={Status.DONE}>Done</StatusBox>
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusInput;
