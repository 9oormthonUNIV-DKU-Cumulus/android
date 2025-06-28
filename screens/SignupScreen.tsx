import React, { useState, useCallback } from "react";
import { Image } from "react-native";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";

const STATUS_BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

export default function SignupScreen({ navigation }) {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const onToggleAll = useCallback(() => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreeService(next);
    setAgreePrivacy(next);
  }, [agreeAll]);

  const onToggleService = useCallback(() => {
    setAgreeService((v) => !v);
  }, []);
  const onTogglePrivacy = useCallback(() => {
    setAgreePrivacy((v) => !v);
  }, []);

  const canNext = agreeService && agreePrivacy;
  const handleNext = () => {
    if (canNext) navigation.navigate("SignupForm");
  };

  const Checkbox = ({
    checked,
    onPress,
  }: {
    checked: boolean;
    onPress(): void;
  }) => (
    <TouchableOpacity style={styles.checkbox} onPress={onPress}>
      {checked && <View style={styles.checkMark} />}
    </TouchableOpacity>
  );

  const Arrow = () => <Text style={styles.arrow}>{">"}</Text>;

  return (
    <View style={styles.body}>
      <View style={styles.topBar}>
        {/* 상단 제목 */}
        <View style={styles.side}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/images/goback.png")}
              style={styles.goBackImg}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text style={styles.categoryTitle}>회원가입</Text>
        </View>

        <View style={styles.side} />
      </View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.step}>
          <Text style={styles.stepActive}>1</Text>
          <Text style={styles.stepInactive}> / 2</Text>
        </Text>
        <Text style={styles.header}>약관 동의하기</Text>

        <TouchableOpacity style={styles.row} onPress={onToggleAll}>
          <Checkbox checked={agreeAll} onPress={onToggleAll} />
          <Text style={styles.rowTextAll}>전체 동의</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.row} onPress={onToggleService}>
          <Checkbox checked={agreeService} onPress={onToggleService} />
          <Text style={styles.rowText}>서비스 이용 약관 (필수)</Text>
          <Arrow />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={onTogglePrivacy}>
          <Checkbox checked={agreePrivacy} onPress={onTogglePrivacy} />
          <Text style={styles.rowText}>개인정보 수집 및 이용 동의 (필수)</Text>
          <Arrow />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[styles.nextButton, !canNext && styles.nextDisabled]}
          onPress={handleNext}
          disabled={!canNext}
        >
          <Text style={[styles.nextText, !canNext && styles.nextTextDisabled]}>
            다음으로
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const BOX = 24;
const styles = StyleSheet.create({
  body: {
    flex: 1,
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
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 50,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EEE",
    marginBottom: 50,
  },
  goBackImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  stepActive: {
    fontSize: 14,
    fontWeight: "bold", // 더 진하게
    color: "black", // 강조 색상 (원하는 색으로)
  },
  stepInactive: {
    fontSize: 14,
    color: "#999", // 회색으로 비활성화 느낌
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  checkbox: {
    width: BOX,
    height: BOX,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkMark: {
    width: BOX - 8,
    height: BOX - 8,
    backgroundColor: "#3366FF",
    borderRadius: 2,
  },
  rowTextAll: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 10,
  },
  rowText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
  },
  arrow: {
    fontSize: 18,
    color: "#999",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#D4D4D4",
    marginVertical: 4,
  },
  nextButton: {
    height: 50,
    backgroundColor: "#428DFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  nextDisabled: {
    backgroundColor: "#AAC4FF",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  nextTextDisabled: {
    color: "#EEE",
  },
});
