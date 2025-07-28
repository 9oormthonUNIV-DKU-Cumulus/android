// components/SortButtons.tsx
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type SortButtonsProps = {
  options?: string[];
  defaultValue?: string;
  onChange?: (selected: string) => void;
};

const SortButtons = ({
  options = ["전체", "인기", "최신"],
  defaultValue = "전체",
  onChange,
}: SortButtonsProps) => {
  const [selectedSort, setSelectedSort] = useState(defaultValue);

  const handlePress = (option: string) => {
    setSelectedSort(option);
    onChange?.(option); // 선택값 전달
  };

  return (
    <View style={styles.row}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selectedSort === option && styles.selectedButton,
          ]}
          onPress={() => handlePress(option)}
        >
          <Text
            style={selectedSort === option ? styles.selectedText : styles.text}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SortButtons;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginLeft: 10,
  },
  button: {
    marginBottom: 28,
    marginLeft: 10,
    backgroundColor: "#ddd",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 23,
  },
  selectedButton: { backgroundColor: "#5498FF" },
  selectedText: { color: "#FAFAFA" },
  text: { color: "#68696D" },
});
