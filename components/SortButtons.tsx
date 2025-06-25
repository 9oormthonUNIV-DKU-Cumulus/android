import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

/** CategoryListScreen 쪽에서 재사용할 공통 타입 */
export type SortKey = string;

export interface SortOption {
  key: SortKey;
  label: string;
}

interface SortButtonsProps {
  /** 버튼 배열 (key / label) */
  options: readonly SortOption[];
  /** 현재 선택된 key */
  selected: SortKey;
  /** 클릭 시 호출 */
  onChange: (key: SortKey) => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({
  options,
  selected,
  onChange,
}) => (
  <View style={styles.row}>
    {options.map((opt) => {
      const active = selected === opt.key;
      return (
        <TouchableOpacity
          key={opt.key}
          style={[styles.button, active && styles.selectedButton]}
          onPress={() => onChange(opt.key)}>
          <Text style={active ? styles.selectedText : styles.text}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default SortButtons;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginVertical: 8, marginHorizontal: 10 },
  button: {
    marginRight: 8,
    backgroundColor: '#ddd',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  selectedButton: { backgroundColor: '#5498FF' },
  text: { color: '#68696D', fontSize: 14 },
  selectedText: { color: '#FAFAFA', fontSize: 14, fontWeight: '600' },
});
