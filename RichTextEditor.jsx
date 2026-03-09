import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function RichTextEditor({ value, setValue }) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className="bg-white rounded-xl shadow-md mt-2"
    />
  );
}

export default RichTextEditor;