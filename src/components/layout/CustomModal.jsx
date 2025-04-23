import { ScrollView, StyleSheet } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";

const CustomModal = ({ visible, hideModal, children }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
        style={{ padding: 16 }}
      >
        <IconButton
          iconColor="#808080"
          icon="close"
          onPress={hideModal}
          style={{ alignSelf: "flex-end" }}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {children}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#f3f3f3",
    padding: 20,
    borderRadius: 8,
  },
});
