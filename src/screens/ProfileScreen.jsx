import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../services/authService";
import useAuthContext from "../hooks/useAuthContext";
import { Button, Divider, Icon, IconButton } from "react-native-paper";
import FormPassword from "../components/form/FormPassword";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { loggedUser } = useAuthContext();

  return (
    <View style={styles.main}>
      <View style={styles.titleContainer}>
        <IconButton
          icon="arrow-left"
          containerColor="#e0e4f7"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Mi Perfil</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>{loggedUser?.name}</Text>
        <View style={styles.email}>
          <Icon source="email" size={28} color="#334cbb" />
          <Text style={styles.subTitle}>{loggedUser?.email}</Text>
        </View>
      </View>
      <Divider />
      {!loggedUser?.passwordChanged ? (
        <Text style={styles.warnMsg}>Actualiza tu contraseña</Text>
      ) : null}
      <FormPassword loggedUser={loggedUser} />
      <Divider />
      <Button
        onPress={async () => {
          await logout();
          navigation.navigate("Login");
        }}
        style={styles.logoutBtn}
        mode="outlined"
        textColor="#334cbb"
      >
        <Text>CERRAR SESIÓN</Text>
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: "#F3F3F3",
    gap: 24,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  subTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "500",
    color: "#334cbb",
  },
  email: {
    flexDirection: "row",
    gap: 6,
  },
  warnMsg: {
    marginTop: 20,
    borderColor: "#dc3545",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    textAlign: "center",
    color: "#dc3545",
    fontSize: 18,
    fontWeight: "bold",
  },
  formTitle: {
    fontSize: 20,
  },
  logoutBtn: {
    borderColor: "#334cbb",
    marginTop: 20,
  },
});
