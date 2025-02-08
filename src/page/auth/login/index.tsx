import { Button, Modal } from "flowbite-react";
import React, { useRef } from "react";
import useHooks from "../../../Hook/useHooks";
import { loginWithEmail } from "../../../firebase/fireauth/loginWithEmail";
import Input from "../../../components/common/form/Input";
import Title from "../../../components/common/form/Title";

export default function Index() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { email, password, setEmail, setPassword, setError, navigate } =
    useHooks();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await loginWithEmail(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal show={true} size="md" popup initialFocus={emailInputRef}>
      <Modal.Body>
        <Title
          title="Log-In"
          className="text-3xl font-bold text-green-400 py-6"
        />
        <form className="space-y-3" onSubmit={handleLogin}>
          <Input
            id="email"
            ValueLabel="Email"
            placeholder="Masukkan Email Anda"
            type="email"
            valueInput={email}
            onChange={(e: any) => setEmail(e.target.value)}
            classNameLabel="text-xl"
          />
          <Input
            id="password"
            ValueLabel="Password"
            placeholder="Masukkan Password Anda"
            type="password"
            valueInput={password}
            onChange={(e: any) => setPassword(e.target.value)}
            classNameLabel="text-xl"
          />
          <Button type="submit">Log in to your account</Button>
        </form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
