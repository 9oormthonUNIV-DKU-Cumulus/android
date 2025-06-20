import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import IndividualTab from "./tabs/IndividualTab";
import ClubTab from "./tabs/ClubTab";
import SortButtons from "../../components/SortButtons";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  CategoryListScreen: { label: string };
};

const CategoryListScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "CategoryListScreen">>();
  const { label } = route.params;

  const types = ["개인", "동아리"];
  const [selectedType, setSelectedType] = useState("개인");
  const navigation = useNavigation();

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        {/* 상단 제목 */}
        <View style={styles.side}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/images/goback.png")}
              style={styles.goBackImg}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text style={styles.categoryTitle}>{label}</Text>
        </View>

        <View style={styles.side} />
      </View>
      {/* 탭바 */}
      <View style={styles.tabContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            style={[styles.tab, selectedType === type && styles.activeTab]}
          >
            <Text
              style={
                selectedType === type ? styles.activeTabText : styles.tabText
              }
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 탭별 컴포넌트 */}
      {selectedType === "개인" && (
        <>
          <SortButtons />
          <IndividualTab />
        </>
      )}
      {selectedType === "동아리" && (
        <>
          <SortButtons />
          <ClubTab />
        </>
      )}
    </View>
  );
};

export default CategoryListScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  side: {
    width: 40, // 아이콘 하나 정도의 너비 확보
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FAFAFA",
  },
  goBackImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  categoryTitle: {
    height: 40,
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#FAFAFA",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 2,
    borderColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 65,
    backgroundColor: "#FAFAFA",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#5498FF",
  },
  tabText: {
    color: "#868686",
  },
  activeTabText: {
    color: "#000 ",
  },
});
