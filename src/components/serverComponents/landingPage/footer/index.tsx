import styles from './footer.module.css';
import { Col, Row } from "antd";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Row justify="center" align="middle">
        <Col>
          <p>Copyright © {new Date().getFullYear()} TakHillo - Todos los derechos reservados.</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;