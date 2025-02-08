import clsx from "clsx";
import { Label, TextInput } from "flowbite-react";
import React from "react";

export default function Input({
  ValueLabel,
  classNameInput,
  classNameLabel,
  id,
  type,
  valueInput,
  onChange,
  placeholder,
}: {
  ValueLabel?: string;
  classNameInput?: string;
  classNameLabel?: string;
  id?: string;
  type: string;
  valueInput?: any;
  onChange?: any;
  placeholder: string;
}) {
  return (
    <>
      <div className={clsx("mb-2", classNameLabel)}>
        <Label htmlFor={id} value={ValueLabel} />
      </div>
      <TextInput
        className={clsx("", classNameInput)}
        id={id}
        type={type}
        value={valueInput}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </>
  );
}
