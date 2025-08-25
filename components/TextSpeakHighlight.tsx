import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import Dropdown from "@/components/DropDown";

const SpeakingText = ({ text }: { text: string }) => {
  const [voices, setVoices] = useState<{ label: string; value: string }[]>([]);
  const [voice, setVoice] = useState("");
  const [startStatus, setStartStatus] = useState<"start" | "stop">("stop");
  const [resumeStatus, setResumeStatus] = useState<"pause" | "resume">(
    "resume"
  );
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const words = text.split(/\s+/); // Tách theo khoảng trắng

  const speak = () => {
    setCurrentWordIndex(null);

    Speech.speak(text, {
      voice: voice,
      onBoundary: (event: any) => {
        if (event.name === "word") {
          // Đếm số khoảng trắng trước charIndex để tìm index của từ
          const wordIndex =
            event.target.text.slice(0, event.charIndex).split(/\s+/).length - 1;
          setCurrentWordIndex(wordIndex);
        }
      },
      onDone: () => {
        setCurrentWordIndex(null);
      },
    });
  };

  const resume = () => {
    Speech.resume();
  };

  const pause = () => {
    Speech.pause();
  };

  const handleStart = () => {
    if (startStatus !== "start") {
      speak();
      setStartStatus("start");
    } else {
      Speech.stop();
      setStartStatus("stop");
      setResumeStatus("resume");
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
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {words.map((word, index) => (
          <Text
            key={index}
            style={[
              styles.word,
              index === currentWordIndex && styles.highlightWord,
            ]}
          >
            {word}{" "}
          </Text>
        ))}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  word: {
    fontSize: 20,
    color: "#333",
  },
  highlightWord: {
    color: "#FF5722",
  },
  buttonContainer: {
    flexDirection: "row",
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
  },
});

export default SpeakingText;
