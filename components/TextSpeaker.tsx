import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import Dropdown from "@/components/DropDown";

const TextSpeaker = () => {
  const [text, setText] = useState(""); // Thay vì prop, dùng state cho input
  const [voices, setVoices] = useState<{ label: string; value: string }[]>([]);
  const [voice, setVoice] = useState("");

  const speak = () => {
    if (text.trim()) {
      Speech.speak(text, { voice: voice });
    }
  };

  const stop = () => {
    Speech.stop();
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
      <TextInput
        style={styles.input}
        placeholder="Nhập văn bản để đọc"
        value={text}
        onChangeText={setText}
        multiline
      />
      <Dropdown
        label="Chọn giọng đọc"
        options={voices}
        value={voice}
        onChange={setVoice}
        dropdownStyle={styles.dropdown}
        isEmptyOption={true}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Speak" onPress={speak} color="#4CAF50" />
        </View>
        <View style={styles.button}>
          <Button title="Stop" onPress={stop} color="#F44336" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  input: {
    width: "100%",
    minHeight: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

export default TextSpeaker;
