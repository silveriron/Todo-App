import { Todo } from "@/store/atoms/Todo";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useRecoilState } from "recoil";

const Editor = () => {
  const [todo, setTodo] = useRecoilState(Todo);
  const onChangeHandler = (event: any, editor: any) => {
    const data = editor.getData();
    setTodo((prev) => ({ ...prev, content: data }));
  };

  return (
    <CKEditor
      editor={InlineEditor}
      onChange={onChangeHandler}
      data={todo.content}
    />
  );
};

export default Editor;
