import { MenuDividerType, MenuItemGroupType, MenuItemType, SubMenuType } from "antd/es/menu/interface";
import Link from "next/link";
import { LoginOutlined, UserAddOutlined, HomeOutlined } from "@ant-design/icons";

type MenuItem = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType;

const items: MenuItem[] = [
  {
    key: '/',
    label: <Link href="/">Inicio</Link>,
    icon: <HomeOutlined />
  },
  {
    key: '/iniciar-sesion',
    label: <Link href="/iniciar-sesion">Iniciar sesión</Link>,
    icon: <LoginOutlined />
  },
  {
    key: '/registrarse',
    label: <Link href="/registrarse">Registrarse</Link>,
    icon: <UserAddOutlined />
  }
];

export default items;