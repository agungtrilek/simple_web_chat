import React from 'react'
import clsx from "clsx"

export default function Title({title, className}:{title: string, className?: string}) {
  return (
    <h1 className={clsx("",className)}>{title}</h1>
  )
}
