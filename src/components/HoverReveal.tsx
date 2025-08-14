"use client";

import React from "react";
import clsx from "clsx";

type HoverRevealProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  href?: string;
  dir?: "up" | "left";
  outlined?: boolean;
  className?: string;
  magnetic?: boolean;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
};

export default function HoverReveal({
  text,
  as = "a",
  href,
  dir = "up",
  outlined = false,
  className,
  magnetic = false,
  onClick,
  children,
  ...rest
}: HoverRevealProps & Record<string, any>) {
  const Tag: any = href ? "a" : as;
  
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={clsx("hover-reveal", className)}
      data-dir={dir}
      data-magnetic={magnetic || undefined}
      {...rest}
    >
      <span className="reveal-line">
        <span className={clsx("reveal-text", "top")}>
          {children || text}
        </span>
        <span className={clsx("reveal-text", "bottom", outlined && "outlined")}>
          {children || text}
        </span>
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}



