import styles from "./heroSection.module.css";
import Image from "next/image";
import { Card, Col, Row } from "antd";
import EmailForm from "./emailForm";
import { homeImage, logoLicensed } from "@src/utils/constants";

const HeroSection = () => {
  const businessHours = {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00 a.m.",
    closes: "06:00 p.m.",
  };

  return (
    <section className={styles.heroContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src={homeImage}
          alt="Image maintenance landing page TODO-CONSTRUCTION-LLC"
          priority
          height={1280}
          width={1920}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <div className={styles.heroText}>
        <h3>NEED HELP WITH</h3>
        <h1>
          HANDYMAN SERVICES<br />COMERCIAL AND RECIDENTIAL
        </h1>
        <Row
          gutter={10}
          justify="center"
          align="middle"
        >
          <Col>
            <h2 style={{ textDecoration: "underline" }}>TODO CONSTRUCTION LLC</h2>
          </Col>
          <Col>
            <Image
              src={logoLicensed}
              alt="TODO CONSTRUCTION LLC Licensed Logo"
              height={60}
              width={60}
              className={styles.logoLicensed}
              style={{ objectFit: 'cover' }}
              priority
            />
          </Col>
        </Row>
        <h3>WE’VE GOT YOU COVERED</h3>
        <p>Our expert team handles everything from small fixes to major repairs</p>
        <div className={styles.cardWrapper}>
          <Card>
            <EmailForm />
          </Card>
        </div>
        {/* Removed <br /> tag here */}
        <div className={styles.cardWrapperHours}>
          <Card>
            <h3>Business Hours</h3>
            <ul>
              {businessHours.dayOfWeek.map((day, index) => (
                <li key={index}>{day}: {businessHours.opens} - {day === "Saturday" ? "03:00 p.m." : businessHours.closes}</li>
              ))}
              <li>Sunday: Closed</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;