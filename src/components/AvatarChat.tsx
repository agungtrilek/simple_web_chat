import { Avatar, Button } from "flowbite-react";
import React from "react";
import avatar from "../assets/avatar.png";

export default function AvatarChat({
  email,
  logout,
}: {
  email: any;
  logout: any;
}) {
  return (
    <Avatar img={avatar} rounded>
      <div className="space-y-1 font-medium dark:text-white">
        <div>{email}</div>
        <Button onClick={logout} size="xs">
          Logout
        </Button>
      </div>
    </Avatar>
  );
}
