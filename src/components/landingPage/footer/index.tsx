import Image from "next/image";
import styles from './footer.module.css';
import { logoLicensed } from "@src/utils/constants";
import { Col, Row } from "antd";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Row justify="center">
        <Col>
          <p>Copyright © {new Date().getFullYear()} TODO CONSTRUCTION LLC - All Rights Reserved.</p>
          <Row
            justify="center"
            align="middle"
            gutter={10}
          >
            <Col>
              <p>ROC License #357969</p>
            </Col>
            <Col>
              <Image
                src={logoLicensed}
                alt="TODO CONSTRUCTION LLC Licensed Logo"
                height={50}
                width={50}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;