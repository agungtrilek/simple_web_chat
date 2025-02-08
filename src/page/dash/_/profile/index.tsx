import { Avatar, Button } from "flowbite-react";
import React from "react";
import avatar from "../../../../assets/avatar.png";
import Text from "../../../../components/common/form/Text";
import clsx from "clsx";

export default function Profile({
  email,
  id,
  onClick,
  children,
  classNameContainer,
  classNameAvatar,
  classNameText,
}: {
  classNameContainer?: string;
  classNameAvatar?: string;
  classNameText?: string;
  email: string | "agung";
  id: string;
  onClick?: any;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx("flex justify-around items-center", classNameContainer)}
    >
      <Avatar img={avatar} rounded className={clsx("  py-2", classNameAvatar)}>
        <div className="space-y-1">
          <Text
            children={email}
            className={clsx("font-medium", classNameText)}
          />
          <Text children={id} className={clsx("", classNameText)} />
        </div>
      </Avatar>
      {children}
    </div>
  );
}
