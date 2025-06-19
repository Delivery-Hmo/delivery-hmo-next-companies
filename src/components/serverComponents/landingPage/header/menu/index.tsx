import styles from "./menu.module.css";
import { Col, Menu, Row } from "antd";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import items from "./menuItems";

const MenuLandingPage = async () => {
  const pathname = await getCookie("pathname", { cookies }) || "";

  return (
    <Row
      justify="space-around"
      align="middle"
      className={styles.row}
    >
      <Col>
        Aqui poner logo
      </Col>
      <Col md={6}>
        <Menu
          className={styles.menu}
          defaultSelectedKeys={[pathname]}
          mode="horizontal"
          items={items}
        />
      </Col>
    </Row>
  );
};

export default MenuLandingPage;