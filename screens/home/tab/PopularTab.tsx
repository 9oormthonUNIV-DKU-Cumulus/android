import { View, Text, StyleSheet } from "react-native";

const PopularTab = ({ navigation: _navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> 인기 모임</Text>
    </View>
  );
};

export default PopularTab;

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
});
