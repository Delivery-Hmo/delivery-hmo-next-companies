import styles from "./header.module.css";
import { Row } from "antd";
import Link from "next/link";
/* import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { getUserByCookie } from "@src/utils/serverFunctions";
import { superAdminRoutes } from "@src/utils/constants"; */
import TopHeader from "./topHeader";

export default async function Header() {
  //const tokenCookie = await getCookie("token", { cookies });
  //const pathname = await getCookie("pathname", { cookies }) || "";

  //const withSession = Boolean(tokenCookie);

  //if (superAdminRoutes.includes(pathname)) return null;

  //const user = await getUserByCookie();

  //const initialEmail = user?.email.charAt(0).toUpperCase() || "";

  return (
    <header>
      <TopHeader />
      <Row
        className={styles.header}
      >
        <div className={styles.container}>
          {/* Checkbox para control de menú */}
          <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />

          {/* Menú hamburguesa */}
          <label htmlFor="menu-toggle" className={styles.hamburger}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </label>

          {/* Menú de navegación */}
          <nav className={styles.nav} id="main-menu-nav">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              {/*   {
                (withSession && user?.role === "Super Admin") && <li>
                  <a href="/home">Admin Home</a>
                </li>
              } */}
            </ul>
            {/* {
              withSession
                ? <div className={styles.loggedButtons}>
                  <Link href="?logout=true" className={styles.logout}>Log out</Link>
                  <Tag
                    style={{ margin: "0px" }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          backgroundColor: '#2ECC71',
                          margin: 3,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "700",
                        }}
                      >
                        {initialEmail}
                      </div>
                      {user?.email}
                    </div>
                  </Tag>
                </div>
                : <div className={styles.authButtons}>
                  <Link href="?login=true" className={styles.login}>Login</Link>
                  <Link href="?signup=true" className={styles.register}>Sign up</Link>
                </div>
            } */}
          </nav>
        </div>
      </Row>
    </header>
  );
}
