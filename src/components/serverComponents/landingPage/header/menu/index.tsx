import styles from "./menu.module.css";
import { Col, Menu, Row } from "antd";
import { headers } from "next/headers";
import items from "./menuItems";
import Image from "next/image";
import { logoUrl } from "@src/utils/constants";

const MenuLandingPage = async () => {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path") || "/";

  return (
    <Row
      justify="space-around"
      align="middle"
      className={styles.row}
    >
      <Col xs={16}>
        <div className={styles.logoContainer}>
          <Image
            src={logoUrl}
            height={46}
            width={120}
            alt="Logo Takhillo"
            className={styles.logo}
          />
        </div>
      </Col>
      <Col
        xs={3}
        md={5}
      >
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