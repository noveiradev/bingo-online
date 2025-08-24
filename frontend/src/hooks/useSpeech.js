import { useEffect, useState } from "react";

export default function useSpeech() {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text, options = {}) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.pitch = options.pitch || 1.1;
    utterance.rate = options.rate || 1;
    utterance.volume = options.volume || 1;
    utterance.lang = "es-ES";

    const selectedVoice =
      voices.find((v) => v.lang === "es-419") ||
      voices.find((v) => v.lang === "es-MX") ||
      voices.find((v) => v.lang === "es-ES");

    if (selectedVoice) utterance.voice = selectedVoice;

    window.speechSynthesis.speak(utterance);
  };

  return { speak };
}