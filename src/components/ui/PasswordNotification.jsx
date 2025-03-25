import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";

const PasswordNotification = ({ hideModal }) => {
  const navigation = useNavigation();

  const handleUpdate = () => {
    navigation.navigate("Private", { screen: "Perfil" });
    hideModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actualiza tu contraseña</Text>
      <Text style={styles.text}>
        La contraseña actual fue generada automáticamente cuando se creó tu
        cuenta. Por razones de seguridad, es importante que la cambies ahora.
      </Text>
      <View style={styles.buttons}>
        <CustomButton label="Actualizar" width="48%" onPress={handleUpdate} />
        <CustomButton
          label="Rechazar"
          width="48%"
          color="#dc3545"
          onPress={() => hideModal()}
        />
      </View>
    </View>
  );
};

export default PasswordNotification;

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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
