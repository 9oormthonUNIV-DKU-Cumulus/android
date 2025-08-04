import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../App"; // HomeStackParamList 타입 import
import PlanCard from "../../components/PlanCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getActivityById } from "../../utils/api";

type JoinMoimRouteProp = RouteProp<HomeStackParamList, "JoinMoim">;
type JoinMoimNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "JoinMoim"
>;

type Props = { navigation: JoinMoimNavigationProp; route: JoinMoimRouteProp };

export default function JoinMoimScreen({ navigation, route }: Props) {
  const { planId } = route.params;

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [cancleModalModalVisible, setCancleModalVisible] = useState(false);
  const [joined, setJoined] = useState(false); // 참여 상태
  const [menuVisible, setMenuVisible] = useState(false); // 모임 삭제,수정 팝업창 상태

  useEffect(() => {
    const fetchPlanDetail = async () => {
      try {
        const response = await getActivityById(planId);
        console.log("🔥 getActivityById 응답 전체:", response);
        console.log("📦 response.data:", response.data);
        console.log("🎯 response.data.data:", response.data.data);

        setPlan(response.data.data); // 이 부분은 콘솔 확인 후 조정
      } catch (error) {
        console.error("❌ 모임 상세 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetail();
  }, [planId]);

  const renderContent = () => (
    <>
      <View style={styles.topBar}>
        {/* 상단 제목 */}
        <View style={styles.side}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/images/goback.png")}
              style={styles.goBackImg}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text style={styles.createMoimTitle}>모임 참여</Text>
        </View>

        <View style={styles.side} />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>개설된 모임</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Image
            source={require("../../assets/images/more.png")}
            style={styles.moreBtn}
          />
        </TouchableOpacity>

        {/* 메뉴 팝업 */}
        {menuVisible && (
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPressOut={() => setMenuVisible(false)}
          >
            <View style={styles.menuBox}>
              <TouchableOpacity>
                <Text style={styles.menuItem}>모임 수정하기</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.menuItem}>모임 삭제하기</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <PlanCard data={plan} />
      <View>
        <Text>참여자 목록</Text>
      </View>

      <View style={styles.joinBtn}>
        <TouchableOpacity
          style={[styles.button, joined && styles.disabledButton]}
          onPress={() => setJoinModalVisible(true)}
          disabled={joined}
        >
          <Text style={styles.buttonText}>{joined ? "참여 완료" : "참여"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.cancleButton, joined && styles.disabledButton]}
          onPress={() => setCancleModalVisible(true)}
          disabled={joined}
        >
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
      </View>

      {/* 참여 확인 모달 */}
      <Modal visible={joinModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>모임에 참여하시겠습니까?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmBtn}>
                <Text style={styles.modalBtnText}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setJoinModalVisible(false)}
                style={styles.cancleBtn}
              >
                <Text style={styles.modalBtnText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 참여 취소 모달 */}
      <Modal visible={cancleModalModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>모임을 나가시겠습니까?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmBtn}>
                <Text style={styles.modalBtnText}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCancleModalVisible(false)}
                style={styles.cancleBtn}
              >
                <Text style={styles.modalBtnText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );

  return (
    <View style={styles.container}>
      {menuVisible ? (
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={{ flex: 1 }}>{renderContent()}</View>
        </TouchableWithoutFeedback>
      ) : (
        renderContent()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  side: {
    width: 40,

    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFF",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 50,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderBottomColor: "#EEE",
  },
  goBackImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  moreBtn: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },

  menuOverlay: {
    position: "absolute",
    top: 30,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.01)", // 외부 클릭 감지용
    width: "100%",
    height: "100%",
  },

  menuBox: {
    position: "absolute",
    top: 0,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    fontSize: 14,
    paddingVertical: 8,
    color: "#333",
  },
  createMoimTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  joinBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#428DFF",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    flex: 1,
  },
  cancleButton: {
    marginTop: 30,
    backgroundColor: "#D3D3D3",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    flex: 1,
  },
  disabledButton: {
    backgroundColor: "#bbb",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    alignItems: "baseline",
    fontWeight: "500",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 16,
  },
  confirmBtn: {
    backgroundColor: "#428DFF",
    paddingVertical: 12,
    borderRadius: 15,
    flex: 1,
    alignItems: "center",
  },
  cancleBtn: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 12,
    borderRadius: 15,
    flex: 1,
    alignItems: "center",
  },
  modalBtnText: {
    color: "#fff",
    fontWeight: 500,
  },
});
