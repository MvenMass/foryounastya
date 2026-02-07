import AudioPlayer from "./components/AudioPlayer/AudioPlayer.jsx";
import ValentineSection from "./components/ValentineSection/ValentineSection.jsx";
import LetterSection from "./components/LetterSection/LetterSection.jsx";
import CounterSection from "./components/CounterSection/CounterSection.jsx";
import ReasonsSection from "./components/ReasonsSection/ReasonsSection.jsx";
import FinalSection from "./components/FinalSection/FinalSection.jsx";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <AudioPlayer />
      <ValentineSection />
      <LetterSection />
      <CounterSection />
      <ReasonsSection />
      <FinalSection />
    </div>
  );
}
