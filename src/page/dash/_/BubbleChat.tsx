import clsx from "clsx";
import React from "react";

export default function BubbleChat({
  children,
  classNameContainer,
  classNameChat,
}: {
  children: React.ReactNode;
  classNameContainer?: string;
  classNameChat?: string;
}) {
  return (
    <div className={clsx(`flex w-full mb-2 `, classNameContainer)}>
      <div
        className={clsx(
          "max-w-[70%] px-4 py-2 rounded-lg  text-gray-800 rounded-bl-sm  ",
          classNameChat
        )}
      >
        {children}
      </div>
    </div>
  );
}
