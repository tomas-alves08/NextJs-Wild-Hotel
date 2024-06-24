import { ReactNode } from "react";
import SideNavigation from "../_components/SideNavigation";

function Layout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}

export default Layout;
