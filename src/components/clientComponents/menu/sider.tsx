import { useState } from "react";
import { Layout } from "antd";
import MenuContainerItems from "./menuContainerItems";
import HeaderMenu from "./menuContainerItems/headerMenu";

const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <HeaderMenu
        collapsed={collapsed}
      />
      <MenuContainerItems />
    </Layout.Sider>

  );
};

export default Sider;