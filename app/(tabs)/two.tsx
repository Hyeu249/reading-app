import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";

// ✅ API Functions
export async function start_read_rfids(ip_address: string) {
  try {
    const res = await fetch(
      `${ip_address}/InventoryController/startInventoryRequest`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Reader-startInventoryRequest",
          backgroundInventory: "false",
          tagFilter: {
            tagMemoryBank: "epc",
            bitOffset: 0,
            bitLength: 0,
            hexMask: null,
          },
        }),
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return false;
  }
}

export async function stop_read_rfids(ip_address: string) {
  try {
    const res = await fetch(
      `${ip_address}/InventoryController/stopInventoryRequest`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "Reader-stopInventoryRequest" }),
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return false;
  }
}

export async function tagReportingDataAndIndex(ip_address: string) {
  try {
    const res = await fetch(
      `${ip_address}/InventoryController/tagReportingDataAndIndex`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

export async function clearCacheTagAndIndex(ip_address: string) {
  try {
    await fetch(`${ip_address}/InventoryController/clearCacheTagAndIndex`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return true;
  } catch (error) {
    console.error("API Error:", error);
    return false;
  }
}

// ✅ URLs
const url = "http://192.168.11.16:5000";

export default function TagReaderScreen() {
  const [tags, setTags] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const init = async () => {
      await clearCacheTagAndIndex(url);
    };
    init();
  }, []);

  const fetchTags = async (): Promise<void> => {
    try {
      const res = await tagReportingDataAndIndex(url);
      const data = res.map((e: any) => e.epcHex);

      setTags((prevTags) => {
        const newTags = data.filter((tag: string) => !prevTags.includes(tag));
        return [...prevTags, ...newTags];
      });

      // ✅ Clear cache ngay sau khi đọc để giảm duplicate
      if (data.length > 0) {
        await clearCacheTagAndIndex(url);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleStart = async () => {
    await start_read_rfids(url);
    handleRead();
  };

  const handleStop = (): void => {
    stop_read_rfids(url);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleRead = async (): Promise<void> => {
    if (intervalRef.current) return; // tránh nhiều interval

    const poll = async () => {
      await fetchTags();
      intervalRef.current = setTimeout(poll, 200) as unknown as number; // đợi xong mới gọi tiếp
    };

    poll();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Start" onPress={handleStart} />
        <Button title="Stop" onPress={handleStop} />
      </View>
      <View style={styles.buttonContainer}>
        <Text>Length: {tags.length}</Text>
      </View>
      <ScrollView style={styles.chatBox}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.message}>
            <Text style={styles.messageText}>{tag}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  chatBox: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 10,
  },
  message: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  messageText: { fontSize: 16, color: "#333" },
});
