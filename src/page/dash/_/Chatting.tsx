import BubbleChat from "./BubbleChat";
import SendChat from "./SendChat";
import useFetchChats from "./use-fetch-chats";
import { auth } from "../../../firebase/config/firebase";
import { UserCard } from "./userCard";
import ButtonComp from "../../../components/common/form/Button";
import useFetchUsers from "./use-fetch-users";

export default function Chatting({
  idFriend,
  visible,
  setVisible,
  isSmallScreen,
}: {
  idFriend: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  isSmallScreen: boolean;
}) {
  const messages = useFetchChats();
  const usersChat = useFetchUsers();
  const dataUser = usersChat.find((item) => item.uid === idFriend);
  const user = auth.currentUser;
  console.log(idFriend, "idfriend");
  console.log(messages, "messages");
  return (
    <>
      {dataUser ? (
        <div className="bg-green-400 block ms:hidden ">
          <UserCard email={dataUser.email} id={dataUser.uid}>
            <div>
              <ButtonComp
                color="red"
                onClick={() => {
                  if (isSmallScreen) {
                    setVisible(false);
                  }
                }}
                type="button"
              >
                Close
              </ButtonComp>
            </div>
          </UserCard>
        </div>
      ) : (
        <div className="w-full p-2 bg-green-500">
          <p>maaf data tidak ditemukan</p>
        </div>
      )}
      <div
        className={" w-full h-screen p-4 bg-gray-200 border-t border-gray-300"}
      >
        <div className={"h-full overflow-auto pb-14  "}>
          {messages &&
            messages
              .filter(
                (id) =>
                  (id.to === idFriend && id.sender === user?.uid) ||
                  (id.to === user?.uid && id.sender === idFriend)
              )
              .map((msg, index) => (
                <BubbleChat
                  classNameContainer={`${
                    msg.sender === user?.uid ? "justify-end " : ""
                  }`}
                  classNameChat={`${
                    msg.sender === user?.uid ? "bg-green-400 " : "bg-white"
                  }`}
                >
                  {msg.text}
                </BubbleChat>
              ))}
        </div>
        <SendChat idFriend={idFriend} />
      </div>
    </>
  );
}
