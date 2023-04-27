import CreateTodoForm from "@/components/todo/Create/CreateTodoForm";
import React, { useEffect, useState } from "react";

const Edit = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[41%] h-[200px]">
        <CreateTodoForm />
      </div>
    </div>
  );
};

export default Edit;
