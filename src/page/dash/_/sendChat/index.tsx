import React from "react";
import Input from "../../../../components/common/form/Input";
import ButtonComp from "../../../../components/common/form/Button";
import { Button, TextInput } from "flowbite-react";

export default function SendChat({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: any;
  className?: string;
}) {
  return (
    <div>
      <TextInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Ketik pesan"
        className={className}
      />
      <Button type="submit">➤</Button>
    </div>
  );
}
