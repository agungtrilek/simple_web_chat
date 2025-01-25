import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import avatar from "../assets/avatar.png";
import useHooks from "../hooks/useHooks";

export default function UserChat({
  email,
  id,
  set,
}: {
  email: any;
  id: any;
  set: any;
}) {
  return (
    <li className="pb-0 pt-3 sm:pt-4">
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
          <img
            alt="Thomas image"
            height="32"
            src={avatar}
            width="32"
            className="rounded-full"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {email}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {id}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <Button onClick={set} size="xs">
            Chat
          </Button>
        </div>
      </div>
    </li>
  );
}
