import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useState } from 'react';
import './TextEditor.css';
function TextEditor({ onChange }) {
  const [value, setValue] = useState('');

  const handleEditorChange = (content) => {
    setValue(content);
    onChange(content);  
  };

  return (
    <ReactQuill 
      theme="snow"
      value={value} 
      onChange={handleEditorChange} 
      modules={TextEditor.modules}
      formats={TextEditor.formats}
    />
  );
}

TextEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['clean'] // remove formatting button
  ],
};

TextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',];

export default TextEditor;
