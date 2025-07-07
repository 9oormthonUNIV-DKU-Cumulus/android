import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeStackParamList } from "../../App";

export default function PlanTabContent() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Calendar
          current={new Date().toISOString().split("T")[0]} // 오늘 날짜
          onDayPress={(day) => {
            console.log("선택한 날짜:", day.dateString); // 예: "2025-07-14"
          }}
          markedDates={{
            "2025-07-14": {
              selected: true,
              selectedColor: "#428DFF",
            },
            "2025-07-23": {
              marked: true,
              dotColor: "#428DFF",
            },
          }}
          theme={{
            selectedDayBackgroundColor: "#428DFF",
            todayTextColor: "#428DFF",
            arrowColor: "#428DFF",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 18,
          }}
        />

        <View style={styles.planSection}>
          {/* 정기 모임 만들기 */}
          <View>
            <Text style={styles.planTitle}>정기 모임</Text>
            <Text style={styles.planDescription}>아직 정기 모임이 없어요!</Text>
            <Text style={styles.planSubText}>정기 모임을 만들어보세요.</Text>
          </View>
          <View style={styles.hr} />
          {/* 자유 모임 만들기 */}
          <View>
            <Text style={styles.planTitle}>자유 모임</Text>
            <Text style={styles.planDescription}>아직 자유 모임이 없어요!</Text>
            <Text style={styles.planSubText}>자유 모임을 만들어보세요.</Text>
          </View>
        </View>
      </ScrollView>
      {/* ─── 하단 바 ─── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MoimForm")}
          style={styles.createBtn}
        >
          <Text style={styles.createBtnTxt}>모임 만들기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  planSection: {
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  //   planCard: {
  //     backgroundColor: "#FFFFFF",
  //     padding: 20,
  //     borderRadius: 12,
  //     marginBottom: 16,
  //     shadowColor: "#000",
  //     shadowOpacity: 0.05,
  //     shadowRadius: 4,
  //     shadowOffset: { width: 0, height: 2 },
  //     elevation: 2,
  //   },
  planTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 14,
    marginTop: 20,
  },
  planDescription: {
    fontSize: 14,
    color: "#333C4A",
    marginBottom: 4,
  },
  planSubText: {
    fontSize: 13,
    color: "#7D828A",
  },
  hr: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 32,
    marginBottom: 20,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",

    borderColor: "#E5E7EB",
  },

  createBtn: {
    flex: 1,
    height: 48,
    borderRadius: 17,
    backgroundColor: "#5498FF",
    justifyContent: "center",
    alignItems: "center",
  },
  createBtnTxt: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
