"use client";

import { homeImage } from "@src/utils/constants";
import styles from "./index.module.css";
import Image from "next/image";

const Home = () => {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        <Image
          src={homeImage}
          alt="Image maintenance landing page TAKHILLO"
          priority
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
};

export default Home;