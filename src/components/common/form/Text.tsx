import clsx from "clsx";
import React from "react";

export default function Text({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  return <p className={clsx("", className)}>{children}</p>;
}
