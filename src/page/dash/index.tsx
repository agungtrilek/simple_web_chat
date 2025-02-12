import React, { useState } from "react";
import LayoutDashboard from "./_/Layout";
import clsx from "clsx";
import Profile from "./_/UserName";
import ButtonComp from "../../components/common/form/Button";
import Chatting from "./_/Chatting";
import { auth } from "../../firebase/config/firebase";
import useHooks from "../../Hook/useHooks";
import Banner from "./_/Banner";
import AddFriend from "./_/AddFriend";
import { logout } from "../../firebase/fireauth/Auth";
import useFetchFriends from "./_/use-fetch-friends";
import useFetchUsers from "./_/use-fetch-users";
import { useNavigate } from "react-router-dom";
import { UserCard } from "./_/userCard";

export default function Dashboard() {
  const { idToChat, setIdToChat } = useHooks();
  const [isVisible, setIsVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth <= 640
  );
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      console.log("mencoba logout");
      await logout();
      navigate("/");
      console.log("logout berhasil");
    } catch (error) {}
  };
  const Friend = useFetchFriends();
  const usersChat = useFetchUsers();
  const userAuth = auth.currentUser;
  console.log(Friend, "teman");
  console.log(usersChat, "userchat");
  return (
    <LayoutDashboard>
      <div
        className={clsx(
          `bg-white  md:basis-1/4 ${isVisible ? "hidden" : "block"}`
        )}
      >
        <div className={"bg-green-400"}>
          <UserCard id={userAuth!.uid} email={userAuth!.email}>
            <ButtonComp onClick={handleLogout} type="submit">
              Logout
            </ButtonComp>
          </UserCard>

          <div className={"py-5"}>
            <AddFriend />
          </div>
        </div>
        {/* chat teman user */}
        {Friend.map((userId, index) =>
          userId.user1 === userAuth?.uid
            ? usersChat
                .filter((id) => id.uid === userId.user2)
                .map((user, ind) => (
                  <UserCard email={user.email} id={user.uid} key={ind}>
                    <div>
                      <ButtonComp
                        onClick={() => {
                          setIdToChat(user.uid);
                          if (isSmallScreen) {
                            setIsVisible(true);
                          }
                        }}
                        type="button"
                      >
                        Chat
                      </ButtonComp>
                    </div>
                  </UserCard>
                ))
            : userId.user2 === userAuth?.uid
            ? usersChat
                .filter((id) => id.uid === userId.user1)
                .map((user, ind) => (
                  <UserCard email={user.email} id={user.uid} key={ind}>
                    <div>
                      <ButtonComp
                        onClick={() => {
                          setIdToChat(user.uid);
                          if (isSmallScreen) {
                            setIsVisible(true);
                          }
                        }}
                        type="button"
                      >
                        Chat
                      </ButtonComp>
                    </div>
                  </UserCard>
                ))
            : null
        )}
      </div>
      <div
        className={clsx(
          `bg-blue-300 sm:basis-3/4 relative ${
            isVisible ? "sm:hidden block" : "hidden sm:block"
          }`
        )}
      >
        {idToChat == null ? (
          <Banner />
        ) : (
          <Chatting
            idFriend={idToChat}
            visible={isVisible}
            isSmallScreen={isSmallScreen}
            setVisible={setIsVisible}
          />
        )}
      </div>
    </LayoutDashboard>
  );
}
