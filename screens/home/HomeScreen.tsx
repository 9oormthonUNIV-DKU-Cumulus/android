import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import DiscoverTab from './tab/DiscoverTab';
import PopularTab from './tab/PopularTab';
import NewTab from './tab/NewTab';
import ContestTab from './tab/ContestTab';

const screenWidth = Dimensions.get('window').width;

const categories = ['발견', '인기모임', '신규모임', '공모전'];

export default function HomeScreen({navigation}) {
  const [selectedCatagory, setSelectedCategory] = useState('발견');

  return (
    <View style={styles.body}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* <Image
            source={require('../../assets/images/logo2x.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Dmatch</Text> */}
          <Image
            source={require('../../assets/images/logoTitle.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Image source={require('../../assets/images/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/notification.png')} />
          </TouchableOpacity>
        </View>
      </View>
      {/* 홈 화면 상단 탭바 */}
      <View style={styles.tabContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.tab,
              selectedCatagory === category && styles.activeTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                selectedCatagory === category && styles.activeTabText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 탭별 콘텐츠 */}
      {selectedCatagory === '발견' && <DiscoverTab navigation={navigation} />}
      {selectedCatagory === '인기모임' && (
        <PopularTab navigation={navigation} />
      )}
      {selectedCatagory === '신규모임' && <NewTab navigation={navigation} />}
      {selectedCatagory === '공모전' && <ContestTab navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerLeft: {flexDirection: 'row'},
  headerRight: {flexDirection: 'row', marginRight: 15},
  logo: {
    width: screenWidth * 0.3,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  headerButton: {marginRight: 15},
  title: {
    height: 40,
    fontWeight: 'bold',
    paddingTop: 10,

    fontSize: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    color: '#868686',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#5498FF',
  },
  activeTabText: {
    color: '#000 ',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderColor: '#FAFAFA',
  },
});
