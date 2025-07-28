import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SortButtons from "../../../components/SortButtons";
import PlanCard from "../../../components/PlanCard";

export default function NewTab({ navigation }: { navigation: any }) {
  const [sortType, setSortType] = useState("정기");
  const [plans, setPlans] = useState({
    정기: [
      /* 정기 모임 배열 */
    ],
    자유: [
      /* 자유 모임 배열 */
    ],
  });

  const currentPlans = plans[sortType] ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}> 신규 모임</Text>

      <View style={{ marginLeft: -10 }}>
        <SortButtons
          options={["정기", "자유"]}
          defaultValue="정기"
          onChange={(value) => setSortType(value)}
        />
      </View>

      {currentPlans.length > 0 ? (
        <FlatList
          data={currentPlans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("JoinMoim", { plan: item })}
            >
              <PlanCard data={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.empty}>아직 {sortType} 모임이 없어요.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  empty: { fontSize: 14, color: "#888", textAlign: "center", marginTop: 50 },
});
