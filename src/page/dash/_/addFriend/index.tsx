import { Button, Card, Modal } from "flowbite-react";
import React, { useState } from "react";
import ButtonComp from "../../../../components/common/form/Button";
import useHooks from "../../../../Hook/useHooks";
import Profile from "../profile";
import useFriends from "../../../../Hook/useAddFriend";

export default function AddFriend() {
  const [openModal, setOpenModal] = useState(false);
  const { usersChat, userAuth } = useHooks();
  const { handleAddFriend } = useFriends();
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
                user.teman.find((id) => id === userAuth?.uid)
                  ? "teman"
                  : "bukan teman"}
              </ButtonComp>
            </Profile>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}
