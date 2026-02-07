import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./AudioPlayer.module.css";
import audioTrack from "../../Scissor_Sisters_-_I_Can_t_Come_Quickly_Enough_(SkySound.cc).mp3";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [blocked, setBlocked] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = async () => {
      try {
        await audio.play();
        setBlocked(false);
        setPlaying(true);
      } catch (error) {
        setBlocked(true);
        setPlaying(false);
      }
    };

    tryPlay();

    const resume = () => {
      tryPlay();
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };

    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);

    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
        setBlocked(false);
      } catch (error) {
        setBlocked(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        className={styles.audio}
        src={audioTrack}
        autoPlay
        loop
      />
      <motion.button
        className={`${styles.unblock} ${playing ? styles.on : styles.off}`}
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: playing ? "0 0 24px rgba(255, 255, 255, 0.35)" : "0 0 0 rgba(0,0,0,0)" }}
      >
        <span className={styles.icon}>{playing ? "♪" : "🔇"}</span>
        <span className={styles.text}>
          {blocked ? "Включить музыку" : playing ? "Музыка играет" : "Музыка выключена"}
        </span>
      </motion.button>
    </>
  );
}
