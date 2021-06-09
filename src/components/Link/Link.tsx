import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import clsx from "clsx";

import useStyles from "./styles";

type LinkBehaviourProps = {
  externalTarget?: string,
} & LinkProps

const Link = React.forwardRef<any, LinkBehaviourProps>((
  {
    externalTarget = "_blank",
    href,
    to,
    className,
    ...props
  },
  ref,
) => {
  const classes = useStyles();
  const destination = href || to;
  if (typeof destination === "string" && /^https?:\/\//.test(destination)) {
    return (
      <a
        target={externalTarget}
        href={destination}
        className={clsx(classes.root, className)}
        {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <RouterLink ref={ref} to={destination} className={clsx(classes.root, className)} {...props} />
    );
  }
});

export default Link;
