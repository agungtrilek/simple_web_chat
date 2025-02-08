import React from "react";
import ButtonComp from "../../../../components/common/form/Button";
import clsx from "clsx";
import Input from "../../../../components/common/form/Input";
import BubbleChat from "../bubbleChat";
import useHooks from "../../../../Hook/useHooks";

export default function Chatting({ idFriend }: { idFriend: any }) {
  const { message, setMessage, handleSend, messages, userAuth } = useHooks();
  console.log(idFriend, "idfriend");
  return (
    <div
      className={clsx(
        " w-full h-screen p-4 bg-gray-200 border-t border-gray-300"
      )}
    >
      <div className={clsx("h-full overflow-auto pb-14  ")}>
        {messages
          .filter(
            (id) =>
              (id.to === idFriend && id.sender === userAuth?.uid) ||
              (id.to === userAuth?.uid && id.sender === idFriend)
          )
          .map((msg, index) => (
            <BubbleChat
              classNameContainer={`${
                msg.sender === userAuth?.uid ? "justify-end " : ""
              }`}
              classNameChat={`${
                msg.sender === userAuth?.uid ? "bg-green-400 " : "bg-white"
              }`}
            >
              {msg.text}
            </BubbleChat>
          ))}
      </div>
      <div className="flex  items-center gap-2 absolute bottom-5 left-0 w-full  justify-between ">
        <Input
          type="text"
          valueInput={message}
          onChange={(e) => setMessage(e.target.value)}
          classNameInput="flex-grow px-4 py-2 text-gray-700  rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          classNameLabel="hidden"
          placeholder="Ketik Pesan"
        />

        <ButtonComp
          type="submit"
          onClick={() => handleSend(idFriend)}
          className={
            "px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          }
        >
          ➤
        </ButtonComp>
      </div>
    </div>
  );
}
