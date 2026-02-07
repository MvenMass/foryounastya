import { motion } from "framer-motion";
import styles from "./FinalSection.module.css";

export default function FinalSection() {
  return (
    <section className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Моя любовь к тебе безгранична, Настенька
        </motion.h2>
        <motion.p
          className={styles.signature}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          С любовью, от Арсения
        </motion.p>
      </div>

      <div className={styles.infiniteHearts}>
        {Array.from({ length: 26 }).map((_, index) => (
          <span
            key={`final-heart-${index}`}
            className={styles.heart}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </section>
  );
}
