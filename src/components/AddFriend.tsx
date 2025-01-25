import { Button, Card, Modal } from "flowbite-react";
import React, { useState } from "react";
import pertemananFIrebase from "../firebase/pertemananFIrebase";
import usersFirebase from "../firebase/usersFirebase";
import { auth } from "../firebase/firebase";
import Search from "./Search";

export default function AddFriend() {
  const { usersChat } = usersFirebase();
  const { handlePertemanan, teman } = pertemananFIrebase();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-center my-4">
      <Button onClick={() => setOpenModal(true)}>Tambah Teman</Button>

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)}>
        <Modal.Header>
          Tambahkan Teman
          <Search />
        </Modal.Header>

        <Modal.Body>
          <div>
            {usersChat.map((user, index) => (
              <Card key={index} className="max-w-sm">
                <p>{user.uid}</p>
                <p>{user.email}</p>
                {user.teman?.map((e, i) => (
                  <Button
                    key={i}
                    onClick={
                      e !== auth.currentUser?.uid
                        ? () => handlePertemanan(user)
                        : undefined
                    }
                  >
                    {e === auth.currentUser?.uid
                      ? "Teman"
                      : "Tambah Pertemanan"}
                  </Button>
                ))}
              </Card>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
