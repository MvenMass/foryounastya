import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./CounterSection.module.css";

const START_DATE = new Date(2023, 4, 11, 0, 0, 0);

function getTotalMonths(now) {
  let months =
    (now.getFullYear() - START_DATE.getFullYear()) * 12 +
    (now.getMonth() - START_DATE.getMonth());
  if (now.getDate() < START_DATE.getDate()) {
    months -= 1;
  }
  return Math.max(0, months);
}

function getYears(now) {
  let years = now.getFullYear() - START_DATE.getFullYear();
  const monthDiff = now.getMonth() - START_DATE.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < START_DATE.getDate())) {
    years -= 1;
  }
  return Math.max(0, years);
}

function calculateTotals(now) {
  const diffMs = Math.max(0, now - START_DATE);
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalMonths = getTotalMonths(now);
  const years = getYears(now);

  return {
    years,
    months: totalMonths,
    days: totalDays,
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds
  };
}

export default function CounterSection() {
  const [time, setTime] = useState(() => calculateTotals(new Date()));
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }).map(() => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${6 + Math.random() * 6}s`
      })),
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTotals(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Мы с тобой с 11 мая 2023 года </h2>
        <p className={styles.since}>Это:</p>
        <div className={styles.timer}>
          {Object.entries(time).map(([label, value]) => (
            <motion.div
              key={label}
              className={styles.timeCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className={styles.number}>{value}</span>
              <span className={styles.label}>
                {label === "years" && "года"}
                {label === "months" && "месяца"}
                {label === "days" && "дней"}
                {label === "hours" && "часов"}
                {label === "minutes" && "минут"}
                {label === "seconds" && "секунд"}
              </span>
            </motion.div>
          ))}
        </div>
        <p className={styles.subtitle}>
          И это только начало нашей бесконечной истории 💞
        </p>
      </div>

      <div className={styles.floatingHearts}>
        {hearts.map((heart, index) => (
          <span
            key={`float-${index}`}
            className={styles.heart}
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration
            }}
          />
        ))}
      </div>
    </section>
  );
}
