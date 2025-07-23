// screens/myPage/FavoritesScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Favorites'>;
interface Props { navigation: Nav; }

interface FavItem {
  id: string;
  title: string;
  place: string;
  time: string;
}

const dummyFavs: FavItem[] = [
  { id: '1', title: '단국대 운동 동아리', place: '수업 끝나고 7시부터 9시까지', time: '독서/글 · 멤버 45' },
  { id: '2', title: '단국대 운동 동아리', place: '수업 끝나고 7시부터 9시까지', time: '독서/글 · 멤버 45' },
];

export default function FavoritesScreen({ navigation }: Props) {
  const [list, setList] = useState(dummyFavs);

  const toggleLike = (id: string) => setList(prev => prev.filter(i => i.id !== id));

  const renderItem = ({ item }: { item: FavItem }) => (
    <View style={styles.card}>
      <View style={styles.thumb} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.sub}>{item.place}</Text>
        <Text style={styles.sub}>{item.time}</Text>
      </View>
      <TouchableOpacity style={styles.heartBtn} onPress={() => toggleLike(item.id)}>
        <Ionicons name="heart" size={18} color="#FF4D4D" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} hitSlop={8} style={styles.back}>
          <Ionicons name="chevron-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>찜 동아리</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={list}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E4E4E4',
    paddingHorizontal: 16,
  },
  back: { position: 'absolute', left: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1C1C1C' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 12,
    padding: 16,
  },
  thumb: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#D9D9D9' },
  title: { fontSize: 14, fontWeight: '700', color: '#1C1C1C' },
  sub: { fontSize: 11, color: '#6F6F6F', marginTop: 2 },
  heartBtn: {
    marginLeft: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
