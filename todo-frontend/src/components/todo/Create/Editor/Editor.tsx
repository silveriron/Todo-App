import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";

const Editor = () => {
  const onChangeHandler = (event: any, editor: any) => {
    const data = editor.getData();
    console.log(data);
  };

  return <CKEditor editor={InlineEditor} onChange={onChangeHandler} />;
};

export default Editor;
