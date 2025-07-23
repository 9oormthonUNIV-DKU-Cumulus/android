import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App"; // 경로는 맞게 조정하세요
import { api } from "../../utils/api";

type Props = NativeStackScreenProps<HomeStackParamList, "SearchScreen">;

export default function SearchScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  // 검색 요청 api
  // const handleSearch = async () => {
  //   try {
  //     setSearched(true);
  //     const response = await api.get();
  //     setResults(response.data); // 검색 결과 저장
  //   } catch (error) {
  //     console.error("검색 오류", error);
  //     setResults([]);
  //   }
  // };

  return (
    <View style={styles.body}>
      {/* 상단 바 */}
      <View style={styles.topBar}>
        {/* 왼쪽: 뒤로가기 버튼 */}
        <View style={styles.side}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/images/goback.png")}
              style={styles.goBackImg}
            />
          </TouchableOpacity>
        </View>

        {/* 가운데: 타이틀 */}
        <View style={styles.center}>
          <Text style={styles.title}>검색</Text>
        </View>

        {/* 오른쪽 공간 (비워둠) */}
        <View style={styles.side} />
      </View>

      {/* TODO: 여기에 검색창 + 결과 목록 넣기 */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="동아리명을 입력하세요"
          keyboardType="default"
        />
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.hr} />

      <View style={styles.resultBox}>
        {!searched ? (
          <Text style={styles.emptyText}>검색어를 입력하세요</Text>
        ) : results.length === 0 ? (
          <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.clubItem}>
                <Text style={styles.clubName}>{item.name}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  side: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  img: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  hr: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 32,
    marginHorizontal: 20,
  },
  goBackImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 20,
    backgroundColor: "#FFF",
  },
  input: {
    width: "85%",
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 14,
    paddingHorizontal: 12,
    fontSize: 13,
    backgroundColor: "#FAFAFA",
    marginRight: 25,
  },
  resultBox: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 14,
  },
  clubItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  clubName: {
    fontSize: 16,
    color: "#333",
  },
});
