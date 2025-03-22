import { StyleSheet, Text, View } from "react-native";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";

const INPUT_LOGIN_FIELDS = [
  { name: "email", label: "Ingresa tu email", icon: "email" },
  {
    name: "password",
    label: "Ingresa tu contraseña",
    icon: "key",
    secure: true,
  },
];

const FormLogin = ({ children }) => {
  const onSubmit = () => {
    try {
      console.log("Login");
      // navigation.replace('DrawerNavigator');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Inicia sesión con tu email y contraseña:</Text>
      {INPUT_LOGIN_FIELDS.map(({ label, icon, secure }, index) => (
        <View key={`input-${index}`} style={styles.inputContainer}>
          <CustomInput label={label} icon={icon} secure={secure} />
        </View>
      ))}
      <CustomButton label="Iniciar Sesión" onPress={onSubmit} />
      {children}
    </View>
  );
};

export default FormLogin;

const styles = StyleSheet.create({
  form: {
    width: "95%",
    maxWidth: 400,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.33,
    shadowRadius: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "DMSans-Regular",
    color: "#000000",
  },
  inputContainer: {
    width: "100%",
  },
});
