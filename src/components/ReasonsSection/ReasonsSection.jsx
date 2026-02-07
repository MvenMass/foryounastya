import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ReasonsSection.module.css";

const reasons = [
  "За твою прекрасную улыбку",
  "За твою доброту и нежность",
  "За то, какая ты настоящая",
  "За все наши моменты вместе",
  "Просто за то, что ты – это ты",
  "За твою заботу, которую я чувствую каждый день",
  "За твою поддержку в любых моих идеях",
  "За твою искренность и открытое сердце",
  "За то, как ты умеешь слушать",
  "За твой свет в глазах",
  "За твою нежность в каждом касании",
  "За твою смелость быть собой",
  "За то, как ты вдохновляешь меня",
  "За твою теплоту и домашний уют",
  "За твою уникальность",
  "За наши маленькие традиции",
  "За твою внимательность к мелочам",
  "За твою веру в нас",
  "За твой смех, который делает день ярче",
  "За твою искреннюю доброту",
  "За твой вкус и чувство стиля",
  "За твои мечты и планы",
  "За то, как ты делаешь меня лучше",
  "За твою нежную заботу обо мне",
  "За нашу близость и доверие",
  "За твое терпение и мягкость",
  "За твой уютный голос",
  "За наши совместные открытия",
  "За твою ласку",
  "За твою любовь, которую я чувствую сердцем",
  "За то, что рядом с тобой спокойно",
  "За твою красоту, внешнюю и внутреннюю",
  "За то, что ты моя"
];

export default function ReasonsSection() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reasons.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const current = reasons[index];
    let pointer = 0;
    setTyped("");
    const typer = setInterval(() => {
      pointer += 1;
      setTyped(current.slice(0, pointer));
      if (pointer >= current.length) {
        clearInterval(typer);
      }
    }, 45);
    return () => clearInterval(typer);
  }, [index]);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Почему я люблю тебя, Настенька:</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={`reason-${index}`}
            className={styles.card}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <span className={styles.index}>{index + 1}</span>
            <p className={styles.text}>
              {typed}
              <span className={styles.caret} />
            </p>
            <span className={styles.counter}> {index + 1} из {reasons.length}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
