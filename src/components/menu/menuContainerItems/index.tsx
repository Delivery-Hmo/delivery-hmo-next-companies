import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import items from "../items";
import { auth } from "@src/firebase";
import { useAuth } from "@src/context/auth";

const MenuContainerItems = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { clearSession } = useAuth();

  return (
    <Menu
      theme="dark"
      style={{ marginTop: 10 }}
      selectedKeys={["/" + pathname.split("/")[1]]}
      items={
        items.map((item) => {
          if (!item.path) return item;

          return {
            onClick: async () => {
              if (item.path === "/cerrar-sesión") {
                await auth.signOut();
                await clearSession();
                return;
              }

              router.push(item.path);
            },
            ...item
          };
        })
      }
    />
  );
};

export default MenuContainerItems;