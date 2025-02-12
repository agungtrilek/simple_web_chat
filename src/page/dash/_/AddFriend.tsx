import { Button, Card, Modal } from "flowbite-react";
import React, { useState } from "react";
import ButtonComp from "../../../components/common/form/Button";
import useHooks from "../../../Hook/useHooks";
import Profile from "./UserName";
import useFriends from "../../../Hook/useAddFriend";
import { addFriend } from "../../../firebase/firestore/friends";
import { auth } from "../../../firebase/config/firebase";
import useFetchUsers from "./use-fetch-users";

export default function AddFriend() {
  const [openModal, setOpenModal] = useState(false);

  const usersChat = useFetchUsers();

  const userId = auth.currentUser;

  const handleAddFriend = async (uidUser: string) => {
    try {
      console.log("loading menambahkan teman");
      await addFriend(uidUser);
      console.log("teman berhasil ditambahkan");
    } catch (error) {
      console.error("gagal menambahkan teman", error);
    }
  };

  return (
    <div className="flex justify-center ">
      <ButtonComp type="button" onClick={() => setOpenModal(true)}>
        Tambah teman
      </ButtonComp>

      <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)}>
        <Modal.Header>Tambahkan Teman</Modal.Header>

        <Modal.Body>
          {usersChat.map((user, index) => (
            <Profile key={index} email={user.email} id={user.uid}>
              <ButtonComp
                type="button"
                onClick={() => handleAddFriend(user.uid)}
              >
                {user.teman &&
                user.teman.length > 0 &&
                user.teman.find((id) => id === userId?.uid) // harusnya menangkap punya teman juga
                  ? "Teman"
                  : "Tambah Pertemanan"}
              </ButtonComp>
            </Profile>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}
