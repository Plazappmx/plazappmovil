import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomInput from "../ui/CustomInput";
import CustomButton from "../ui/CustomButton";
import { changePassword } from "../../services/authService";
import { useNavigation } from "@react-navigation/native";

const FormPassword = ({ loggedUser }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();

  const INPUT_LOGIN_FIELDS = [
    {
      value: currentPassword,
      onChange: setCurrentPassword,
      label: "Ingresa tu contraseña actual",
      icon: "key",
    },
    {
      value: newPassword,
      onChange: setNewPassword,
      label: "Ingresa tu contraseña nueva",
      icon: "key",
    },
  ];

  const onSubmit = async () => {
    try {
      await changePassword({ currentPassword, newPassword }, loggedUser);
      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Actualizar Contraseña:</Text>
      {INPUT_LOGIN_FIELDS.map(({ label, value, onChange, icon }, index) => (
        <View key={`input-${index}`} style={styles.inputContainer}>
          <CustomInput
            label={label}
            value={value}
            onChange={onChange}
            icon={icon}
            secure={true}
          />
        </View>
      ))}
      <CustomButton label="Actualizar" onPress={onSubmit} />
    </View>
  );
};

export default FormPassword;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    gap: 24,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    color: "#000000",
  },
  inputContainer: {
    width: "100%",
  },
});
