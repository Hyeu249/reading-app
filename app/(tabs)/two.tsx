import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import TextSpeaker from "@/components/TextSpeaker";
import TextSpeakHighlight from "@/components/TextSpeakHighlight";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <TextSpeakHighlight text="My favorite hobby is reading books. I enjoy reading because it helps me learn new things and improve my imagination. Every day, I spend about one hour reading novels or short stories. Sometimes I read in the morning, but I usually read before going to bed. Reading makes me feel relaxed and happy. It is the best way for me to reduce stress after a long day." />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
