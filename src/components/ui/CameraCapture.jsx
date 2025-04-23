import { View, StyleSheet, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";

const CameraCapture = ({ setPhoto, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionsContainer}>
        <Text style={styles.message}>
          Necesitamos tu permiso para usar la cámara
        </Text>
        <Button
          mode="outlined"
          buttonColor="#ebebeb"
          textColor="#303030"
          onPress={requestPermission}
          style={styles.permissionBtn}
        >
          Conceder permiso
        </Button>
        <Button
          mode="outlined"
          buttonColor="#ff7474"
          textColor="#303030"
          onPress={onClose}
          style={styles.permissionBtn}
        >
          Cancelar
        </Button>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
        });
        onClose();
        setPhoto(photo)
      } catch (error) {
        console.error("Error al tomar la foto:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera}>
        <View style={styles.buttonContainer}>
          <IconButton
            style={styles.button}
            iconColor="#fff"
            icon="camera"
            size={32}
            onPress={takePicture}
          />
          <IconButton
            style={styles.button}
            iconColor="#fff"
            icon="close"
            size={32}
            onPress={onClose}
          />
        </View>
      </CameraView>
    </View>
  );
}

export default CameraCapture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  permissionBtn: {
    width: "50%",
    borderRadius: 12,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 24,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
