import Appbar from "../Header";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import TextEditor from "../TextEditor/TextEditor";

function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]); 
  const [isPoll, setIsPoll] = useState(false);
  const navigate = useNavigate();

  const handleAddOption = () => {
    if (pollOptions.length < 4) { 
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handleDeleteOption = (index) => {
    if (pollOptions.length > 2) {
      const updatedOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(updatedOptions);
    }
  };

  const handlePollOptionChange = (index, value) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    console.log("Submitting...");
    try {
      if (isPoll) {
        const response = await axios.post(
          `http://localhost:3000/api/poll/create`,
          {
            question: title,
            options: pollOptions,
          },
        );
        navigate(`/`);
      } else {
        const response = await axios.post(
          `http://localhost:3000/api/post/create`,
          {
            title,
            content: description,
          },
        );
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error publishing:", error);
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
                className={`mr-2 px-4 py-2 ${!isPoll ? "bg-[#4e0eff] text-white" : "bg-gray-200"} rounded`}
              >
                Create Post
              </button>
              <button
                onClick={() => setIsPoll(true)}
                className={`px-4 py-2 ${isPoll ? "bg-[#4e0eff] text-white" : "bg-gray-200"} rounded`}
              >
                Create Poll
              </button>
            </div>

            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="w-full bg-[#1b1b2b] border border-gray-500 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder={isPoll ? "Poll Question" : "Post Title"}
            />

            {!isPoll ? (
              <div className="mt-4 mb-4">
              <TextEditor
                onChange={(content) => setDescription(content)}
              />
              </div>
            ) : (
              <div className="mt-4">
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handlePollOptionChange(index, e.target.value)}
                      className="w-full bg-[#1b1b2b] border border-gray-500 text-gray-300 text-sm rounded-lg p-2.5"
                      placeholder={`Option ${index + 1}`}
                    />
                    {index >= 2 && (
                      <button
                        onClick={() => handleDeleteOption(index)}
                        className="ml-2 text-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}

                {/* Add Option button below input boxes, disappears after fourth option */}
                {pollOptions.length < 4 && (
                  <button
                    onClick={handleAddOption}
                    className="mt-2 px-3 py-1 bg-[#4e0eff] text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    Add Option
                  </button>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-[#4e0eff] rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              {isPoll ? "Publish Poll" : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Publish;
