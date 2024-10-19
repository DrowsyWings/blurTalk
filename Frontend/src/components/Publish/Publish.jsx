import Appbar from "../Header";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pollOptions, setPollOptions] = useState([""]);
  const [isPoll, setIsPoll] = useState(false);
  const navigate = useNavigate();

  const handleAddOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const handlePollOptionChange = (index, value) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    try {
      if (isPoll) {
        const response = await axios.post(
          `https://localhost:3000/api/poll/create`,
          {
            question: title,
            options: pollOptions,
          },
        );
        navigate(`/user/polls`);
      } else {
        const response = await axios.post(
          `https://localhost:3000/api/post/create`,
          {
            title,
            content: description,
          },
        );
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error publishing:", error.response ? error.response.data : error.message);
    }
  };

  return (
    
    <div className="bg-[#131324] h-[100vh] font-poppins">
      <Appbar />
      <div className="flex w-full">
        <Sidebar></Sidebar>
        <div className="flex justify-center pt-8 w-full">
          <div className="max-w-screen-lg w-full">
            <div className="mb-4">
              <button
                onClick={() => setIsPoll(false)}
                className={`mr-2 px-4 py-2 ${!isPoll ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
              >
                Create Post
              </button>
              <button
                onClick={() => setIsPoll(true)}
                className={`px-4 py-2 ${isPoll ? "bg-blue-500 text-white" : "bg-gray-200"} rounded`}
              >
                Create Poll
              </button>
            </div>

            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5"
              placeholder={isPoll ? "Poll Question" : "Post Title"}
            />

            {!isPoll ? (
              <TextEditor
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            ) : (
              <div className="mt-4">
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handlePollOptionChange(index, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                      placeholder={`Option ${index + 1}`}
                    />
                    {index === pollOptions.length - 1 && (
                      <button
                        onClick={handleAddOption}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Add Option
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              {isPoll ? "Publish Poll" : "Publish Post"}
            </button>
        </div>
        </div>
      </div>
    </div>
  );
}

// Text Editor Component for posts
function TextEditor({ onChange }) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
