import Layout from "@/components/common/Layout/Layout";
import CreateTodoForm from "@/components/todo/Create/CreateTodoForm";
import React, { useEffect, useState } from "react";

const Edit = () => {
  return (
    <Layout>
      <div className="w-full flex justify-center">
        <div className="w-[41%] h-[200px]">
          <CreateTodoForm />
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
