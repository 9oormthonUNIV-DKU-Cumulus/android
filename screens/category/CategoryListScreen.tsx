// ----------------- screens/category/CategoryListScreen.tsx -----------------
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {
  RouteProp,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import SortButtons, { SortOption } from '../../components/SortButtons';
import { MatchingItem, MatchingListItem } from '../../components/MatchingList';
import { getCategoryId } from '../../utils/category';

/* ───────── 네비게이션 타입 (HomeStack과 동일하게 정의) ───────── */
export type HomeStackParamList = {
  Home: undefined;
  CategoryListScreen: { label: string };
  MeetingDetail: { id: string };
};

type NavProp  = NativeStackNavigationProp<HomeStackParamList, 'CategoryListScreen'>;
type RouteT   = RouteProp<HomeStackParamList, 'CategoryListScreen'>;

/* ───────── 표시용 더미 데이터 ───────── */
const { width } = Dimensions.get('window');
const dummyData: MatchingItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `${i + 1}`,
  title      : '단국대 운동 동아리',
  category   : '독서/글',
  description: '수업 끝나고 7시부터 9시까지',
  member     : '45',
  imageUrl   : 'https://via.placeholder.com/150',
}));

/* ───────── 정렬 옵션 ───────── */
const SORT_OPTIONS = [
  { key: 'all',       label: '전체' },
  { key: 'recommend', label: '추천' },
  { key: 'popular',   label: '인기' },
  { key: 'latest',    label: '최신' },
] as const satisfies readonly SortOption[];
type SortKeyUnion = (typeof SORT_OPTIONS)[number]['key'];

export default function CategoryListScreen() {
  const navigation = useNavigation<NavProp>();
  const route      = useRoute<RouteT>();
  const { label }  = route.params;
  const categoryId = getCategoryId(label);

  const TYPES = ['개인', '동아리'] as const;
  const [selectedType, setSelectedType] = useState<typeof TYPES[number]>('개인');
  const [sort, setSort]                 = useState<SortKeyUnion>('all');
  const [likedItems, setLikedItems]     = useState<string[]>([]);

  /* 하트 토글 */
  const handleToggleLike = (item: MatchingItem) => {
    setLikedItems((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id],
    );
  };

  /* 게시물 클릭 → MeetingDetail 이동 */
  const handlePressItem = (item: MatchingItem) => {
    navigation.navigate('MeetingDetail', { id: item.id });
  };

  const renderItem: ListRenderItem<MatchingItem> = ({ item }) => (
    <MatchingListItem
      item={item}
      onPress={handlePressItem}
      likedItems={likedItems}
      onToggleLike={handleToggleLike}
    />
  );

  return (
    <View style={styles.body}>
      {/* ── 헤더 ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.side} onPress={navigation.goBack}>
          <Image
            source={require('../../assets/images/goback.png')}
            style={styles.goBackImg}
          />
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.categoryTitle}>{label}</Text>
        </View>
        <View style={styles.side} />
      </View>

      {/* ── 개인/동아리 탭 ── */}
      <View style={styles.tabContainer}>
        {TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setSelectedType(type)}
            style={[styles.tab, selectedType === type && styles.activeTab]}>
            <Text style={selectedType === type ? styles.activeTabText : styles.tabText}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── 정렬 버튼 ── */}
      <SortButtons
        options={SORT_OPTIONS}
        selected={sort}
        onChange={(key) => setSort(key as SortKeyUnion)}
      />

      {/* ── 게시물 리스트 ── */}
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

/* ───────── 스타일 ───────── */
const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  side: { width: 40, justifyContent: 'center', paddingLeft: 12 },
  center: { flex: 1, alignItems: 'center' },
  goBackImg: { width: 20, height: 20, resizeMode: 'contain' },
  categoryTitle: { fontSize: 20, fontWeight: 'bold' },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  tab: { paddingVertical: 10, paddingHorizontal: width * 0.15 },
  activeTab: { borderBottomWidth: 2, borderColor: '#5498FF' },
  tabText: { color: '#868686' },
  activeTabText: { color: '#000' },
});
