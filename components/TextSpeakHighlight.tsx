import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import * as Speech from "expo-speech";
import Dropdown from "@/components/DropDown";

const SpeakingText = ({ en, vi }: { en: string[]; vi: string[] }) => {
  const [voices, setVoices] = useState<{ label: string; value: string }[]>([]);
  const [voice, setVoice] = useState("");
  const [startStatus, setStartStatus] = useState<"start" | "stop">("stop");
  const [resumeStatus, setResumeStatus] = useState<"pause" | "resume">(
    "resume"
  );

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(-1);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);

  const speak = async () => {
    setCurrentSentenceIndex(-1);
    setCurrentWordIndex(null);

    for (let i = 0; i < en.length; i++) {
      setCurrentSentenceIndex(i);
      setCurrentWordIndex(null);

      await new Promise<void>((resolve) => {
        Speech.speak(en[i], {
          voice: voice || undefined,
          onBoundary: (event: any) => {
            if (event.name === "word") {
              const wordIndex =
                event.target.text.slice(0, event.charIndex).split(/\s+/)
                  .length - 1;
              setCurrentWordIndex(wordIndex);
            }
          },
          onDone: () => {
            setCurrentWordIndex(null);
            resolve();
          },
        });
      });
    }

    setCurrentSentenceIndex(-1);
  };

  const handleStart = () => {
    if (startStatus !== "start") {
      speak();
      setStartStatus("start");
    } else {
      Speech.stop();
      setStartStatus("stop");
      setResumeStatus("resume");
      setCurrentSentenceIndex(-1);
      setCurrentWordIndex(null);
    }
  };

  const handleResume = () => {
    if (startStatus === "stop") return;
    if (resumeStatus !== "pause") {
      Speech.pause();
      setResumeStatus("pause");
    } else {
      Speech.resume();
      setResumeStatus("resume");
    }
  };

  useEffect(() => {
    const fetchVoices = async () => {
      const voicesList = await Speech.getAvailableVoicesAsync();
      setVoices(
        voicesList.map((e) => ({ label: e.name, value: e.identifier }))
      );
    };
    fetchVoices();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        {en.map((sentence, sIndex) => {
          const words = sentence.split(/\s+/);
          return (
            <View key={sIndex} style={styles.sentenceBlock}>
              <View style={styles.sentenceRow}>
                {words.map((word, wIndex) => (
                  <Text
                    key={wIndex}
                    style={[
                      styles.word,
                      sIndex === currentSentenceIndex &&
                        wIndex === currentWordIndex &&
                        styles.highlightWord,
                    ]}
                  >
                    {word}{" "}
                  </Text>
                ))}
              </View>
              <Text
                style={[
                  styles.translation,
                  sIndex === currentSentenceIndex &&
                    styles.highlightTranslation,
                ]}
              >
                {vi[sIndex]}
              </Text>
            </View>
          );
        })}
      </View>
      <Dropdown
        label="Chọn giọng đọc"
        options={voices}
        value={voice}
        onChange={setVoice}
        dropdownStyle={styles.dropdown}
        isEmptyOption={true}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={startStatus === "start" ? "Stop" : "Start"}
          onPress={handleStart}
          color="#4CAF50"
        />
        <Button
          title={resumeStatus === "pause" ? "Resume" : "Pause"}
          onPress={handleResume}
          color="#F44336"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  textContainer: {
    flexDirection: "column",
    gap: 20,
  },
  sentenceBlock: {
    marginBottom: 20,
  },
  sentenceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  word: {
    fontSize: 18,
    color: "#333",
  },
  highlightWord: {
    color: "#FF5722",
    fontWeight: "bold",
  },
  translation: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  highlightTranslation: {
    color: "#2196F3",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 270,
    marginTop: 20,
  },
});

export default SpeakingText;
