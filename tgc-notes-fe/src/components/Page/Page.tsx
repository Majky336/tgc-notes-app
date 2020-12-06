import React, { FC, PropsWithChildren } from "react";

type Props = {};

const Page: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <div>{children}</div>;
};

export default Page;
