import clsx from "clsx";
import React from "react";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("flex flex-row w-full h-screen ")}>{children}</div>
  );
}
