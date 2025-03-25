import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import { logout } from "../../services/authService";
import { acceptTerms } from "../../services/userServices";

const TermsNotification = ({ loggedUserId, updateModal }) => {
  const navigation = useNavigation();

  const handleAccept = async () => {
    await acceptTerms(loggedUserId);
    updateModal();
  };

  const handleReject = async () => {
    await logout();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acepta los términos y condiciones</Text>
      <Text style={styles.text}>
        Para continuar, por favor, lea cuidadosamente los términos y condiciones
        y luego haga click en <Text style={styles.emphasis}>ACEPTAR</Text>.
      </Text>
      <Pressable
        onPress={() =>
          Linking.openURL(
            "https://plazapp-171e0.web.app/admin-panel/DtT2cqC1krdUeEf1ABkm"
          )
        }
      >
        <View style={styles.link}>
          <Icon source="file" size={20} />
          <Text style={styles.linkText}>Términos y Condiciones</Text>
        </View>
      </Pressable>
      <View style={styles.buttons}>
        <CustomButton label="Aceptar" width="48%" onPress={handleAccept} />
        <CustomButton
          label="Rechazar"
          width="48%"
          color="#dc3545"
          onPress={handleReject}
        />
      </View>
    </View>
  );
};

export default TermsNotification;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#334cbb",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#4866f0",
  },
  emphasis: {
    fontWeight: "bold",
  },
  link: {
    flexDirection: "row",
    paddingVertical: 12,
    gap: 4,
  },
  linkText: {
    color: "#4866f0",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
