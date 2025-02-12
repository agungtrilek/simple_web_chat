import React from "react";
import avatar from "../../../assets/avatar.png";
import clsx from "clsx";

export const UserCard = ({
  email,
  id,
  children,
  className,
}: {
  email: string;
  id: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("flex justify-around items-center mx-5", className)}>
      <div className="flex items-center flex-1 min-w-0 py-2 ">
        {/* Avatar */}
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
        <div className="space-y-1 ml-3 truncate">
          {/* Email */}
          <p className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {email}
          </p>
          {/* ID */}
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {id}
          </p>
        </div>
      </div>
      {/* Children */}
      <div className="whitespace-nowrap space-x-2">{children}</div>
    </div>
  );
};
