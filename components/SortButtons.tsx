import {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const SORT_OPTIONS = ['전체', '추천', '인기', '최신'];

const SortButtons = () => {
  const [selectedSort, setSelectedSort] = useState('전체');

  return (
    <View style={styles.row}>
      {SORT_OPTIONS.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selectedSort === option && styles.selectedButton,
          ]}
          onPress={() => setSelectedSort(option)}>
          <Text
            style={selectedSort === option ? styles.selectedText : styles.text}>
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
    flexDirection: 'row',
    marginBottom: 1,
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#ddd',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  selectedButton: {backgroundColor: '#5498FF'},
  selectedText: {color: '#FAFAFA'},
  text: {color: '#68696D'},
});
