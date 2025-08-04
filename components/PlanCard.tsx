import { View, Text, StyleSheet } from "react-native";

export default function PlanCard({ data, showDescription = true }) {
  if (!data) return null;

  return (
    <View style={styles.planCard}>
      <Text style={styles.cardTitle}>{data.title}</Text>
      <Text style={styles.cardInfo}>날짜: {data.meetingDate}</Text>
      <Text style={styles.cardInfo}>모집인원: {data.maxParticipants}명</Text>
      {showDescription && data.description && (
        <Text style={styles.cardContent}>내용: {data.description}</Text>
      )}
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
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    elevation: 4,
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
