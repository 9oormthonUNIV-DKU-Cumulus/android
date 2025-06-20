import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const DiscoverTab = ({navigation}) => {
  const firstRow = [
    {label: '스포츠', icon: require('../../../assets/images/sport2x.png')},
    {
      label: '외국/언어',
      icon: require('../../../assets/images/language2x.png'),
    },
    {label: '댄스', icon: require('../../../assets/images/dance2x.png')},
    {
      label: '봉사활동',
      icon: require('../../../assets/images/volunteer2x.png'),
    },
    {
      label: '자기계발',
      icon: require('../../../assets/images/self-dev2x.png'),
    },
  ];

  const secondRow = [
    {label: '독서/글', icon: require('../../../assets/images/book2x.png')},
    {
      label: '문화/공연',
      icon: require('../../../assets/images/festival2x.png'),
    },
    {label: '음악/연기', icon: require('../../../assets/images/music2x.png')},
    {label: '여행', icon: require('../../../assets/images/trip2x.png')},
    {label: '업종/직무', icon: require('../../../assets/images/work2x.png')},
  ];

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../assets/images/firstBanner2.png')}
          style={styles.bannerImg}
        />
      </View>
      {/*첫번째 줄 */}
      <View style={styles.categories}>
        <View style={styles.row}>
          {firstRow.map(item => (
            <View style={styles.iconContainer} key={item.label}>
              <TouchableOpacity
                style={styles.iconWrap}
                onPress={() =>
                  navigation.navigate('CategoryListScreen', {label: item.label})
                }>
                <Image source={item.icon} style={styles.iconImage} />
              </TouchableOpacity>
              <Text style={styles.categoryTitle}>{item.label}</Text>
            </View>
          ))}
        </View>
        {/*두번째 줄 */}
        <View style={styles.row}>
          {secondRow.map(item => (
            <View style={styles.iconContainer} key={item.label}>
              <TouchableOpacity
                style={styles.iconWrap}
                onPress={() =>
                  navigation.navigate('CategoryListScreen', {label: item.label})
                }>
                <Image source={item.icon} style={styles.iconImage} />
              </TouchableOpacity>
              <Text style={styles.categoryTitle}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 15, margin: 15}}>
          <Text style={{color: '#5498FF'}}>단웅</Text>님께 추천하는 모임
        </Text>
      </View>
    </View>
  );
};

export default DiscoverTab;

const styles = StyleSheet.create({
  container: {backgroundColor: '#FAFAFA'},
  bannerImg: {
    height: undefined,
    width: screenWidth,
    aspectRatio: 3,
    resizeMode: 'cover',
  },
  categories: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  iconContainer: {
    alignItems: 'center',
    width: screenWidth / 5,
  },
  iconWrap: {
    backgroundColor: '#ECECEC',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth / 6,
    height: screenWidth / 6,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  categoryTitle: {color: '#37404C'},
  content: {
    marginTop: 30,
    alignItems: 'center',
  },
});
