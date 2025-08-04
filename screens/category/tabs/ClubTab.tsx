// import { Alert, View, Text, StyleSheet } from "react-native";
// import { MatchingListItem } from "../../../components/MatchingList";
// import { FlatList } from "react-native-gesture-handler";
// import { useEffect, useState } from "react";
// import SortButtons from "../../../components/SortButtons";
// import { deleteClub } from "../../../utils/api";

// // 목업 데이터 (api 연결 시 삭제)
// const clubData = [
//   {
//     id: "1",
//     title: "주말 풋살 모임",
//     category: "독서/글",
//     description: "수업 끝나고 7시부터 9시까지",
//     member: "45",
//     // imageUrl: "https://via.placeholder.com/150",
//     imageUrl: require("../../../assets/mockImg/activity1.png"),
//   },
//   {
//     id: "2",
//     title: "주말 사진 모임",
//     category: "독서/글",
//     description: "수업 끝나고 7시부터 9시까지",
//     member: "45",
//     // imageUrl: "https://via.placeholder.com/150",
//     imageUrl: require("../../../assets/mockImg/activity2.png"),
//   },
//   {
//     id: "3",
//     title: "맛집 탐방 모임",
//     category: "독서/글",
//     description: "수업 끝나고 7시부터 9시까지",
//     member: "45",
//     // imageUrl: "https://via.placeholder.com/150",
//     imageUrl: require("../../../assets/mockImg/activity3.png"),
//   },
//   {
//     id: "4",
//     title: "사진 찍기 모임",
//     category: "독서/글",
//     description: "수업 끝나고 7시부터 9시까지",
//     member: "45",
//     // imageUrl: "https://via.placeholder.com/150",
//     imageUrl: require("../../../assets/mockImg/activity4.png"),
//   },
//   {
//     id: "5",
//     title: "사진 찍기 모임",
//     category: "독서/글",
//     description: "수업 끝나고 7시부터 9시까지",
//     member: "45",
//     // imageUrl: "https://via.placeholder.com/150",
//     imageUrl: require("../../../assets/mockImg/activity5.png"),
//   },
//   {
//     id: "6",
//     title: "사진 찍기 모임",
//     category: "독서/글",
//     description: "수업 끝나고 7시부터 9시까지",
//     member: "45",
//     // imageUrl: "https://via.placeholder.com/150",
//     imageUrl: require("../../../assets/mockImg/activity6.png"),
//   },
//   {
//     id: "7",
//     title: "사진 찍기 모임",
//     category: "독서/글",
//     description: "수업 끝나고 7시부터 9시까지",
//     member: "45",
//     // imageUrl: "https://via.placeholder.com/150",
//     imageUrl: require("../../../assets/mockImg/activity7.png"),
//   },
// ];

// const ClubTab = ({
//   categoryId,
// }: // sort,
// {
//   categoryId: string;
//   // sort: string;
// }) => {
//   // 동아리 상태 저장
//   // const [clubData, setClubData] = useState<any[]>([]);

//   // 동아리 모임 좋아요 상태 저장
//   const [likedItems, setLikedItems] = useState<string[]>([]);

//   // 동아리 모임 api 호출(일단은 목업으로 대체)
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       // json-server로 api 테스트
//   //       const response = await fetch(
//   //         `http://10.0.2.2:3001/clubs?category=${categoryId}`
//   //       );
//   //       const json = await response.json();
//   //       setClubData(json);
//   //     } catch (error) {
//   //       console.error("데이터 불러오기 실패: ", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [categoryId]);

//   // 좋아요 버튼 액션
//   const handleToggleLike = (item: { id: string }) => {
//     setLikedItems((prev) =>
//       prev.includes(item.id)
//         ? prev.filter((id) => id !== item.id)
//         : [...prev, item.id]
//     );
//   };

//   const handleDelete = (id: string) => {
//     Alert.alert("동아리 삭제", "정말로 이 동아리를 삭제하시겠습니까?", [
//       {
//         text: "취소",
//         style: "cancel",
//       },
//       {
//         text: "삭제",
//         onPress: async () => {
//           try {
//             await deleteClub(parseInt(id, 10));
//             // 성공 시 목록 새로고침 (실제로는 API 재호출)
//             // setClubData((prev) => prev.filter((item) => item.id !== id));
//             Alert.alert("삭제 완료", "동아리가 성공적으로 삭제되었습니다.");
//           } catch (error) {
//             Alert.alert("오류", "동아리 삭제 중 오류가 발생했습니다.");
//           }
//         },
//         style: "destructive",
//       },
//     ]);
//   };

//   return (
//     <View style={styles.body}>
//       <Text style={styles.contentTitle}>둘러보기</Text>
//       <SortButtons />
//       <FlatList
//         data={clubData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <MatchingListItem
//             item={item}
//             likedItems={likedItems}
//             onToggleLike={handleToggleLike}
//             onDelete={handleDelete}
//             isOwner={true} // 임시로 true 설정
//           />
//         )}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default ClubTab;

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//   },
//   contentTitle: {
//     margin: 15,
//     marginLeft: 20,
//     fontWeight: "bold",
//     fontSize: 20,
//     color: "#333C4A",
//   },
// });
