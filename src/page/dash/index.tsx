import React from "react";
import LayoutDashboard from "./_/layout";
import clsx from "clsx";
import Profile from "./_/profile";
import ButtonComp from "../../components/common/form/Button";
import Chatting from "./_/chatting";
import { auth } from "../../firebase/config/firebase";
import useHooks from "../../Hook/useHooks";
import Banner from "./_/banner";
import AddFriend from "./_/addFriend";
import useFriends from "../../Hook/useAddFriend";

export default function Dashboard() {
  const { userAuth, handleLogout, usersChat, idToChat, setIdToChat } =
    useHooks();
  const { teman } = useFriends();
  console.log(teman, "teman");
  console.log(usersChat, "userchat");
  return (
    <LayoutDashboard>
      <div className={clsx("bg-white basis-1/4")}>
        <div className={clsx("bg-green-400")}>
          <Profile id={userAuth?.uid} email={userAuth?.email}>
            <div>
              <ButtonComp onClick={handleLogout} type="submit">
                Logout
              </ButtonComp>
            </div>
          </Profile>
          <div className={clsx("py-5")}>
            <AddFriend />
          </div>
        </div>
        {/* chat teman user */}
        {teman.map((userId, index) =>
          userId.user1 === userAuth?.uid
            ? usersChat
                .filter((id) => id.uid === userId.user2)
                .map((user, ind) => (
                  <Profile email={user.email} id={user.uid} key={ind}>
                    <div>
                      <ButtonComp
                        onClick={() => setIdToChat(user.uid)}
                        type="button"
                      >
                        Chat
                      </ButtonComp>
                    </div>
                  </Profile>
                ))
            : userId.user2 === userAuth?.uid
            ? usersChat
                .filter((id) => id.uid === userId.user1)
                .map((user, ind) => (
                  <Profile email={user.email} id={user.uid} key={ind}>
                    <div>
                      <ButtonComp
                        onClick={() => setIdToChat(user.uid)}
                        type="button"
                      >
                        Chat
                      </ButtonComp>
                    </div>
                  </Profile>
                ))
            : null
        )}
      </div>
      <div className={clsx("bg-blue-300 basis-3/4 relative")}>
        {idToChat == null ? <Banner /> : <Chatting idFriend={idToChat} />}
      </div>
    </LayoutDashboard>
  );
}
