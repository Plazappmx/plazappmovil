import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "../ui/CustomButton";
import {
  DOC_TYPES,
  GENERAL_DOCS_OPTIONS,
  MONTHLY_DOCS_OPTIONS,
} from "../../utils/consts";
import {
  analyzeDocument,
  uploadDocument,
} from "../../services/documentServices";
import { addContactInfo } from "../../services/userServices";

const FormDoc = ({
  photo,
  setPhoto,
  userId,
  getDocs,
  hideModal,
  openCamera,
}) => {
  const [docType, setDocType] = useState("");
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (photo) {
      setFile(null);
    }
  }, [photo]);

  const INPUT_DOCS_FIELDS = [
    {
      name: "docType",
      value: docType,
      onChange: (itemValue, itemIndex) => setDocType(itemValue),
      label: "Selecciona un tipo de documento",
      options: DOC_TYPES,
    },
    {
      name: "docName",
      value: docName,
      onChange: (itemValue, itemIndex) => setDocName(itemValue),
      label: "Selecciona un nombre de documento",
    },
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      setFile(result.assets[0]);
      setPhoto(null);
    } catch (error) {
      console.error("Error seleccionando documento:", error);
    }
  };

  const submitUploadedDoc = async () => {
    setIsLoading(true);
    try {
      await uploadDocument({ userId, file, docName, docType });
      await getDocs();
      hideModal();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitPhoto = async () => {
    setIsLoading(true);
    try {
      const filePhoto = {
        uri: photo?.uri,
        mimeType: "image/jpeg",
        name: "camera-photo.jpg",
      };

      const { data } = (await analyzeDocument(photo?.base64)) ?? {};
      if (docName === "lessorId") {
        if (!data?.curp) {
          return Alert.alert("Atención", "No fue posible extraer el CURP", [
            {
              text: "Aceptar",
            },
          ]);
        }

        // if (!data?.names) {
        //   return Alert.alert("No fue posible extraer el nombre", "", [
        //     {
        //       text: "Aceptar",
        //     },
        //   ]);
        // }
      }

      await uploadDocument({
        userId,
        file: filePhoto,
        docName,
        docType,
      });
      await getDocs();
      hideModal();

      if (docName === "lessorId") {
        await addContactInfo(
          {
            CURP: data?.curp,
            // name: data?.names
          },
          userId
        );
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = photo ? submitPhoto : submitUploadedDoc;

  const btnDisabled = photo
    ? Boolean(!photo?.uri || !docType || !docName)
    : Boolean(!file || !docType || !docName);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Subir Documento</Text>
      {INPUT_DOCS_FIELDS.map(
        ({ name, label, value, options, onChange }, index) => {
          const selectOptions = options
            ? options
            : !docType
            ? []
            : docType === "general"
            ? GENERAL_DOCS_OPTIONS
            : MONTHLY_DOCS_OPTIONS;

          const noType = name === "docName" && !docType;

          return (
            <View key={`input-${index}`} style={styles.inputContainer}>
              <Picker selectedValue={value} onValueChange={onChange}>
                <Picker.Item
                  color={noType ? "#808080" : "#4866f0"}
                  label={noType ? "Selecciona primero el tipo" : label}
                  value=""
                />
                {selectOptions?.map((opt, index) => (
                  <Picker.Item
                    key={`${opt.value}-${index}`}
                    label={opt.label}
                    value={opt.value}
                  />
                ))}
              </Picker>
            </View>
          );
        }
      )}

      <View style={styles.docPicker}>
        <IconButton
          mode="contained"
          containerColor="#188754"
          iconColor="#fff"
          icon="upload"
          onPress={pickDocument}
        />
        <Text style={styles.docPickerLabel}>Cargar documento</Text>
        {file ? (
          <Text
            style={{ color: "#808080", fontWeight: 500, fontStyle: "italic" }}
          >
            {file?.name}
          </Text>
        ) : null}
      </View>

      <Text style={{ marginTop: 12 }}>También puedes:</Text>

      <View style={styles.docPicker}>
        <IconButton
          mode="contained"
          containerColor="#606060"
          iconColor="#fff"
          icon="camera"
          onPress={openCamera}
        />
        <Text style={styles.docPickerLabel}>Tomar foto</Text>
        {photo ? (
          <Text
            style={{ color: "#808080", fontWeight: 500, fontStyle: "italic" }}
          >
            camera-photo.jpg
          </Text>
        ) : null}
      </View>

      <CustomButton
        label={isLoading ? "Enviando ..." : "Enviar"}
        onPress={isLoading ? () => null : onSubmit}
        disabled={btnDisabled}
      />
    </View>
  );
};

export default FormDoc;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
  },
  inputContainer: {
    width: "100%",
  },
  docPicker: {
    alignItems: "center",
  },
  docPickerLabel: {
    color: "#4866f0",
  },
});
