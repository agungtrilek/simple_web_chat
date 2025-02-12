import { Avatar, Button } from "flowbite-react";
import React from "react";
import avatar from "../../../assets/avatar.png";
import Text from "../../../components/common/form/Text";
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
      className={clsx("flex justify-around items-center ", classNameContainer)}
    >
      <Avatar
        img={avatar}
        rounded
        className={clsx(" flex-1 min-w-0 py-2 ", classNameAvatar)}
      >
        <div className="space-y-1 ">
          <Text
            children={email}
            className={clsx(
              "font-medium whitespace-nowrap overflow-hidden text-ellipsis",
              classNameText
            )}
          />
          <Text
            children={id}
            className={clsx(
              "whitespace-nowrap overflow-hidden text-ellipsis",
              classNameText
            )}
          />
        </div>
      </Avatar>
      <div className="whitespace-nowrap space-x-2">{children}</div>
    </div>
  );
}
