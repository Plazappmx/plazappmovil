import { StyleSheet, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";

const CustomModal = ({ visible, hideModal, children }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
        style={{ padding: 16 }}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#f3f3f3",
    adding: 20,
    borderRadius: 8,
  },
});
