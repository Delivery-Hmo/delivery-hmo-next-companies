import styles from "./header.module.css";
import MenuLandingPage from "./menu";
/* import { getUserByCookie } from "@src/utils/serverFunctions";
import { superAdminRoutes } from "@src/utils/constants"; */


const Header = () => {
  //const tokenCookie = await getCookie("token", { cookies });

  //const withSession = Boolean(tokenCookie);

  //if (superAdminRoutes.includes(pathname)) return null;

  //const user = await getUserByCookie();

  //const initialEmail = user?.email.charAt(0).toUpperCase() || "";

  return (
    <header className={styles.header}>
      <MenuLandingPage />
    </header>
  );
};

export default Header;
