import Image from "next/image";
import styles from './handymanSection.module.css';
import { Row, Col } from "antd";

const HandymanSection = () => {
  return (
    <section className={styles.container}>
      <Row
        justify="center"
        align="middle"
      >
        <Col xs={24} md={8}>
          <Image
            src="https://renovation.thememove.com/data/images/home03_section3.png"
            alt="Handyman"
            className={styles.image}
            width={500}
            height={300}
          />
        </Col>
        <Col xs={24} md={8}>
          <h2 className={styles.title}>
            We Are Professional & Thoughtful <br /> HandyMan
          </h2>
          <p className={styles.paragraph}>
            Every home owner has a list of renovation, home repair, or home improvement projects he or she needs done —
            both interior and exterior. Sometimes that list can get quite long, too! The bathrooms that needs updating.
            The garbage disposal that’s on the fritz. The basement that needs drywall repairs.
            But with today’s busy lifestyles, who has the time or the patience to do it all yourself?
            Let us help your home run more smoothly with a wide range of affordable repair, improvement and remodel services.
          </p>
        </Col>
      </Row>
    </section>
  );
};

export default HandymanSection;
