import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../App"; // HomeStackParamList 타입 import
import PlanCard from "../../components/PlanCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type JoinMoimRouteProp = RouteProp<HomeStackParamList, "JoinMoim">;
type JoinMoimNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "JoinMoim"
>;

type Props = { navigation: JoinMoimNavigationProp; route: JoinMoimRouteProp };

export default function JoinMoimScreen({ navigation, route }: Props) {
  const { plan } = route.params;

  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [cancleModalModalVisible, setCancleModalVisible] = useState(false);
  const [joined, setJoined] = useState(false); // 참여 상태

  return (
    <View style={styles.container}>
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
      <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
        개설된 모임
      </Text>
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
    backgroundColor: "#FAFAFA",
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
    justifyContent: "space-around",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#428DFF",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    paddingHorizontal: 65,
  },
  cancleButton: {
    marginTop: 30,
    backgroundColor: "#D3D3D3",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    paddingHorizontal: 65,
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
    justifyContent: "space-around",
    marginTop: 10,
  },
  confirmBtn: {
    backgroundColor: "#428DFF",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  cancleBtn: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  modalBtnText: {
    color: "#fff",
    fontWeight: 500,
  },
});
