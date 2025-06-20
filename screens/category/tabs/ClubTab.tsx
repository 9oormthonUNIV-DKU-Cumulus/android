import {View, Text, StyleSheet} from 'react-native';
import MatchingList from '../../../components/MatchingList';

const clubData = [
  {
    id: '1',
    title: '주말 풋살 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: '주말 사진 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: '맛집 탐방 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: '사진 찍기 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    title: '사진 찍기 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '6',
    title: '사진 찍기 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '7',
    title: '사진 찍기 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '8',
    title: '사진 찍기 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '9',
    title: '사진 찍기 모임',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const ClubTab = () => {
  const handleItemPress = (item: any) => {
    console.log('Pressed item:', item); // 나중에 navigation 연결도 가능
  };
  return (
    <View style={styles.body}>
      <Text style={styles.contentTitle}>동아리 둘러보기</Text>
      <MatchingList data={clubData} onItemPress={handleItemPress} />
    </View>
  );
};

export default ClubTab;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FAFAFA',
  },
  contentTitle: {
    margin: 15,
    fontSize: 20,
    color: '#333C4A',
  },
});
