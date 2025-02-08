import clsx from "clsx";
import React from "react";

export default function Anchor({
  children,
  className,
  link,
}: {
  children: string;
  className: string;
  link: string;
}) {
  return (
    <a className={clsx("", className)} href={link}>
      {children}
    </a>
  );
}
