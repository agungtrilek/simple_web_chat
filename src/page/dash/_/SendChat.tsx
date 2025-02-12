import React, { useState } from "react";
import Input from "../../../components/common/form/Input";
import ButtonComp from "../../../components/common/form/Button";
import { Button, TextInput } from "flowbite-react";
import useFetchChats from "./use-fetch-chats";
import { sendChatFirestore } from "../../../firebase/firestore/sendChat";

export default function SendChat({
  className,
  idFriend,
}: {
  className?: string;
  idFriend: string;
}) {
  const [message, setMessage] = useState("");

  const handleSendMessage = async (id: string) => {
    try {
      console.log("loading send chat");
      await sendChatFirestore({ message, id });
      console.log("Pesan berhasil dikirim");
    } catch (error) {
      console.log("gagal mengirim pesan", error);
      alert("gagal mengirim pesan");
    }
  };
  return (
    <div className="flex  items-center gap-2 absolute bottom-5 left-0 w-full  justify-between ">
      <TextInput
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ketik pesan"
        className={"w-full"}
      />
      <Button onClick={() => handleSendMessage(idFriend)} type="submit">
        ➤
      </Button>
    </div>
  );
}
