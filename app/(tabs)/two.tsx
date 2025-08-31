import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import TextSpeaker from "@/components/TextSpeaker";
import TextSpeakHighlight from "@/components/TextSpeakHighlight";

const vi = [
  "Số phận của Cycling Anh đã thay đổi vào một ngày vào năm 2003.",
  "Tổ chức này, vốn là cơ quan quản lý xe đạp chuyên nghiệp ở Vương quốc Anh, vừa mới thuê Dave Brailsford làm giám đốc hiệu suất mới.",
  "Vào thời điểm đó, các vận động viên xe đạp chuyên nghiệp ở Vương quốc Anh đã phải chịu đựng gần một trăm năm của sự tầm thường.",
];

const en = [
  "the fate of British Cycling changed one day in 2003.",
  "The organi‑ zation, which was the governing body for professional cycling in Great Britain, had recently hired Dave Brailsford as its new perfor‑ mance director.",
  "At the time, professional cyclists in Great Britain had endured nearly one hundred years of mediocrity.",
];

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <TextSpeakHighlight vi={vi} en={en} />
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
