import React, { useRef, useState } from "react";
import Title from "../../../components/common/form/Title";
import Input from "../../../components/common/form/Input";
import { Button, Modal } from "flowbite-react";
import { registration } from "../../../firebase/fireauth/Auth";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("mencoba regis");
      await registration(email, password, confirmPassword);
      navigate("/");
      alert("berhasil Regis");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <Modal show={true} size="md" popup initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <Title
              title="Registrasi"
              className="text-xl font-medium text-gray-900 dark:text-white"
            />

            <form
              onSubmit={handleRegistration}
              className="flex max-w-md flex-col gap-4"
            >
              <Input
                id="email"
                ValueLabel="Email"
                placeholder="Masukkan Email Anda"
                type="email"
                valueInput={email}
                onChange={(e) => setEmail(e.target.value)}
                classNameLabel="text-xl"
              />
              <Input
                id="password"
                ValueLabel="Password"
                placeholder="Masukkan Password Anda"
                type="password"
                valueInput={password}
                onChange={(e) => setPassword(e.target.value)}
                classNameLabel="text-xl"
              />
              <Input
                id="confirmPassword"
                ValueLabel="Confirm Password"
                placeholder="Ketik Ulang Password Anda"
                type="password"
                valueInput={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                classNameLabel="text-xl"
              />

              <div className="w-full">
                <Button type="submit">Registration</Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
