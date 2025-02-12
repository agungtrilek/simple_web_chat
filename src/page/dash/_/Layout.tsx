import clsx from "clsx";
import React from "react";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"sm:flex block sm:flex-row w-full h-screen "}>
      {children}
    </div>
  );
}
