import React, { useEffect } from "react";
import { auth } from "../firebase/firebase";

import useHooks from "../hooks/useHooks";
import AvatarChat from "../components/AvatarChat";
import { Button, Card, Label, TextInput } from "flowbite-react";
import sendFirebase from "../firebase/sendFirebase";
import usersFirebase from "../firebase/usersFirebase";
import pertemananFIrebase from "../firebase/pertemananFIrebase";
import Chatting from "../components/Chatting";
import UserChat from "../components/UserChat";
import Banner from "../components/Banner";
import AddFriend from "../components/AddFriend";
// import searchUserFirebase from "../firebase/searchUserFirebase";

const Dashboard: React.FC = () => {
  const { handleLogout, userAuth, loading, idToChat, setIdToChat } = useHooks();

  const { usersChat } = usersFirebase();
  const { teman } = pertemananFIrebase();
  // const { handleSearch, search } = searchUserFirebase();

  console.log("userChat", usersChat);
  console.log("temanChat", teman);
  console.log("id teman", idToChat);
  console.log("auth", auth.currentUser?.uid);

  return (
    <div className="flex flex-row w-full h-screen bg-red-300">
      <div className="bg-white basis-1/4">
        <div className="bg-green-400 py-4 ">
          <AvatarChat email={auth?.currentUser?.email} logout={handleLogout} />
          <AddFriend />
        </div>
        <div className="bg-white">
          <Card className="max-w-sm">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {teman.map((userID, index) =>
                  userID.user1 === auth?.currentUser?.uid
                    ? usersChat
                        .filter((id) => id.uid === userID.user2)
                        .map((user, index) => (
                          <UserChat
                            key={index}
                            email={user.email}
                            id={user.uid}
                            set={() => setIdToChat(user.uid)}
                          />
                        ))
                    : userID.user2 === auth?.currentUser?.uid
                    ? usersChat
                        .filter((id) => id.uid === userID.user1)
                        .map((user, index) => (
                          <UserChat
                            key={index}
                            email={user.email}
                            id={user.uid}
                            set={() => setIdToChat(user.uid)}
                          />
                        ))
                    : null
                )}
              </ul>
            </div>
          </Card>
        </div>
      </div>
      <div className="bg-blue-300 basis-3/4 relative">
        {idToChat == null ? <Banner /> : <Chatting idFriend={idToChat} />}
      </div>
    </div>
  );
};

export default Dashboard;

// <div className="w-2/4">
//   <div>
//     <div className="shadow-sm bg-slate-300 flex justify-between">
//       <AvatarChat email={auth?.currentUser?.email!} index={5} url="" />
//       <Button onClick={handleLogout}>Logout</Button>
//     </div>
//   </div>
//   {/* chat */}
//   <div>
//     <div className="bg-white shadow-sm ">
//       <div className="chat-box ">
//         {messages.map((msg, index) => (
//           <div key={index} className={""}>
//             <div
//               className={
//                 msg.sender === auth?.currentUser?.email! ? `text-end` : ""
//               }
//             >
//               <p className="px-3 py-1 ">
//                 <span className="px-3">{msg.timestamp}</span>
//                 {msg.text}
//               </p>
//               <span>{msg.sender}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex ">
//         <TextInput
//           type="text"
//           className="flex-auto"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message"
//         />

//         <Button onClick={handleSend}>Send</Button>
//       </div>
//     </div>
//   </div>

//   <div>
//     {usersChat.map((user, index) => (
//       <Card key={index} className="max-w-sm">
//         <p>{user.uid}</p>
//         <p>{user.email}</p>
//         {user.teman?.map((e, i) => (
//           <Button
//             key={i}
//             onClick={
//               e !== auth.currentUser?.uid
//                 ? () => handlePertemanan(user)
//                 : undefined
//             }
//           >
//             {e === auth.currentUser?.uid ? "Teman" : "Tambah Pertemanan"}
//           </Button>
//         ))}
//       </Card>
//     ))}
//   </div>
//   <div>
//     {teman.map((userID, index) => (
//       <Card key={index} className="max-w-sm">
//         <p>
//           {userID.user1 === auth?.currentUser?.uid
//             ? usersChat
//                 .filter((id) => id.uid === userID.user2)
//                 .map((user, index) => user.email)
//             : userID.user2 === auth?.currentUser?.uid
//             ? usersChat
//                 .filter((id) => id.uid === userID.user1)
//                 .map((user, index) => user.email)
//             : null}
//         </p>
//       </Card>
//     ))}
//   </div>
// </div>
