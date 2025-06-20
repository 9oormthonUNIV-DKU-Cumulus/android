import {RouteProp, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IndividualTab from './tabs/IndividualTab';
import ClubTab from './tabs/ClubTab';
import SortButtons from '../../components/SortButtons';

type RootStackParamList = {
  CategoryListScreen: {label: string};
};

const CategoryListScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CategoryListScreen'>>();
  const {label} = route.params;

  const types = ['개인', '동아리'];
  const [selectedType, setSelectedType] = useState('개인');

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        {/* 상단 제목 */}
        <View>
          <Text style={styles.categoryTitle}>{label}</Text>
        </View>
      </View>
      {/* 탭바 */}
      <View style={styles.tabContainer}>
        {types.map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            style={[styles.tab, selectedType === type && styles.activeTab]}>
            <Text
              style={
                selectedType === type ? styles.activeTabText : styles.tabText
              }>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 탭별 컴포넌트 */}
      {selectedType === '개인' && (
        <>
          <SortButtons />
          <IndividualTab />
        </>
      )}
      {selectedType === '동아리' && (
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
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  categoryTitle: {
    height: 40,
    paddingTop: 10,
    fontSize: 20,
    backgroundColor: '#FAFAFA',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 65,
    backgroundColor: '#FAFAFA',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#5498FF',
  },
  tabText: {
    color: '#868686',
  },
  activeTabText: {
    color: '#000 ',
  },
});
