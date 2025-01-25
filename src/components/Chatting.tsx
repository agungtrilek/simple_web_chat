import React from "react";
import useHooks from "../hooks/useHooks";
import sendFirebase from "../firebase/sendFirebase";
import { auth } from "../firebase/firebase";

export default function Chatting({ idFriend }: { idFriend: any }) {
  const { handleSend, setMessage, messages, message } = sendFirebase();
  const { formatTimestampToTime } = useHooks();

  return (
    <div className=" w-full h-screen p-4 bg-gray-200 border-t border-gray-300">
      <div className="h-full overflow-auto pb-14 ">
        {messages
          .filter(
            (v) =>
              (v.to === idFriend && v.sender === auth.currentUser?.uid) ||
              (v.to === auth.currentUser?.uid && v.sender === idFriend)
          )
          .map((msg, index) => (
            <div
              className={`flex w-full mb-2  ${
                msg.sender === auth.currentUser?.uid ? "justify-end " : ""
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  msg.sender === auth.currentUser?.uid
                    ? "bg-green-400 "
                    : "bg-white"
                }  text-gray-800 rounded-bl-sm 
        `}
              >
                {msg.text}

                <div
                  className={`text-xs text-gray-500 mt-1 ${
                    msg.sender === auth.currentUser?.uid ? "text-end " : ""
                  }`}
                >
                  {formatTimestampToTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex  items-center gap-2 absolute bottom-5 left-0 w-full  justify-between ">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-grow px-4 py-2 text-gray-700 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={() => handleSend(idFriend)}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
