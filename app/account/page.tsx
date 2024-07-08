import { FC } from "react";
import { auth } from "../_services/auth";

export const metadata = {
  title: "Account",
};

const Page: FC = async () => {
  const session = await auth();

  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, <span className="capitalize">{firstName}</span>
    </h2>
  );
};

export default Page;
