import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CustomButton = ({ label, width, onPress }) => {
  return (
    <Button
      mode="elevated"
      buttonColor="#4866f0"
      textColor="#fff"
      style={[styles.button, { width: width ?? "100%" }]}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
      onPress={onPress}
      uppercase
    >
      {label}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    borderRadius: 16,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
