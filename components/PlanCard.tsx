import { View, Text, StyleSheet } from "react-native";

export default function PlanCard({ data }) {
  return (
    <View style={styles.planCard}>
      <Text style={styles.cardTitle}>{data.title}</Text>
      <Text style={styles.cardInfo}>위치: {data.location}</Text>
      <Text style={styles.cardInfo}>날짜: {data.date}</Text>
      <Text style={styles.cardInfo}>모집인원: {data.peopleCount}명</Text>
      <Text style={styles.cardContent}>내용: {data.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  planCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardInfo: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  cardContent: {
    fontSize: 13,
    marginTop: 8,
    color: "#333",
  },
});
