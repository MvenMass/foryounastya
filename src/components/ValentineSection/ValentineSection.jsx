import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ValentineSection.module.css";
import photo1 from "../../photo_2025-07-17_22-51-50.jpg";
import photo2 from "../../photo_2025-09-23_10-42-06.jpg";
import photo3 from "../../photo_2025-09-23_10-42-24.jpg";
import photo4 from "../../photo_2025-11-23_22-25-12.jpg";
import photo5 from "../../photo_2025-11-23_22-27-45.jpg";

const loveBursts = Array.from({ length: 34 }).map((_, index) => ({
  id: index,
  x: Math.random() * 240 - 120,
  y: Math.random() * 200 - 160,
  delay: Math.random() * 0.4
}));

const loveTexts = Array.from({ length: 24 }).map((_, index) => ({
  id: index,
  x: Math.random() * 320 - 160,
  y: Math.random() * 240 - 160,
  rotate: Math.random() * 30 - 15,
  delay: Math.random() * 0.6
}));

export default function ValentineSection() {
  const [opened, setOpened] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const confetti = useMemo(() => loveBursts, []);
  const texts = useMemo(() => loveTexts, []);
  const photos = useMemo(() => [photo1, photo2, photo3, photo4, photo5], []);
  const toggle = () => {
    setOpened((prev) => {
      const next = !prev;
      if (next) {
        setBurstKey((key) => key + 1);
      }
      return next;
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>Только для тебя моя душа</h1>
        <div className={styles.heartWrapper}>
          <motion.button
            className={`${styles.heart} ${opened ? styles.opened : ""}`}
            onClick={toggle}
            aria-label="Открыть валентинку"
            initial={false}
            animate={{ scale: opened ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            {!opened && <span className={styles.heartText}>Открой 😊</span>}
            <span className={styles.heartHint}>
              {opened ? "" : ""}
            </span>
          </motion.button>

          <AnimatePresence>
            {opened && (
              <div className={styles.burstLayer} key={burstKey}>
                {texts.map((item) => (
                  <motion.span
                    key={`text-${item.id}`}
                    className={styles.loveText}
                    initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [0, item.y, item.y - 40],
                      x: [0, item.x, item.x + 20],
                      rotate: item.rotate,
                      scale: [0.7, 1, 0.9]
                    }}
                    transition={{ duration: 5, delay: item.delay }}
                  >
                    Люблю тебя
                  </motion.span>
                ))}
                {confetti.map((item) => (
                  <motion.span
                    key={`heart-${item.id}`}
                    className={styles.confettiHeart}
                    initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, item.y, item.y - 50],
                      x: [0, item.x, item.x + 20],
                      scale: [0.6, 1, 0.5]
                    }}
                    transition={{ duration: 4.6, delay: item.delay }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div
              className={styles.gallery}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {photos.map((src, index) => (
                <motion.div
                  key={`photo-${src}`}
                  className={styles.photoCard}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <img src={src} alt={`Наше фото ${index + 1}`} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {opened && (
            <motion.p
              className={styles.loveLine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Ты – самое лучшее, что случилось в моей жизни
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
