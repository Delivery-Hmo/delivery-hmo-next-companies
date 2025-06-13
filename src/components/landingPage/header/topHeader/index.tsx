import React from 'react';
import styles from './topHeader.module.css';
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { Col, Row } from "antd";
import Link from "next/link";
import { logoUrl } from "@src/utils/constants";
import Image from "next/image";

const TopHeader = () => {
  return (
    <Row
      justify="center"
      className={styles.topBar}
    >
      <Col
        xs={24}
        md={16}
      >
        <Row
          justify="space-between"
          align="middle"
        >
          <Col
            xs={24}
            md={4}
          >
            <Row
              className={styles.logoContainer}
              justify="center"
            >
              <Link href="/">
                <Image
                  src={logoUrl}
                  alt="Logo TODO CONSTRUCTION LLC"
                  className={styles.logo}
                  height={125}
                  width={140}
                />
              </Link>
              <p
                style={{ marginTop: 10 }}
              >
                <b>Quality First, Always the Best!</b>
              </p>
            </Row>
          </Col>
          <Col xs={24} md={20}>
            <Row
              align="middle"
              className={styles.contactSection}
            >
              <Col xs={11} md={7} className={styles.contactItem}>
                <b><span><FaPhone className={styles.icon} /></span> +1 (480)800-1142</b>
                <div className={styles.textSubtitle}>todoconstructionllc@gmail.com</div>
              </Col>
              <Col xs={11} md={5} className={styles.contactItem}>
                <b><span><FaLocationDot className={styles.icon} /></span>1304 E Ivyglen St. Mesa</b>
                <div>AZ 85203</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TopHeader;