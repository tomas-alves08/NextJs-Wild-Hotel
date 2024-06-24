import {  ReactNode } from "react";

export const metadata = {
  title: "Account",
};

function Page():ReactNode {
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, Tomas
    </h2>
  );
};

export default Page;
