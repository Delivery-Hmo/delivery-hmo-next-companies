import { Grid } from "antd";
import Sider from "./sider";
import Header from "./header";
import { useAuth } from "@src/context/auth";
import { usePathname } from "next/navigation";

const { useBreakpoint } = Grid;

const MenuComponent = () => {
  const pathname = usePathname();
  const screens = useBreakpoint();
  const { userFirebase } = useAuth();

  if (!userFirebase || pathname === "/") return null;

  return (
    screens.xs ? <Header /> : <Sider />
  );
};

export default MenuComponent;