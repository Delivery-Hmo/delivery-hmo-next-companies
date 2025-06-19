import { MenuDividerType, MenuItemGroupType, MenuItemType, SubMenuType } from "antd/es/menu/interface";
import Link from "next/link";

type MenuItem = MenuItemType | SubMenuType | MenuItemGroupType | MenuDividerType;

const items: MenuItem[] = [
  {
    key: '/iniciar-sesion',
    label: <Link href="/">Iniciar sesión</Link>
  },
  {
    key: '/registrarse',
    label: <Link href="/registrarse">Registrarse</Link>
  }
];

export default items;