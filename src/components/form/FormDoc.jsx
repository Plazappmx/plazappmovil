import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "../ui/CustomButton";
import {
  DOC_TYPES,
  GENERAL_DOCS_OPTIONS,
  MONTHLY_DOCS_OPTIONS,
} from "../../utils/consts";
import { uploadDocument } from "../../services/documentServices";

const FormDoc = ({ userId, getDocs, hideModal }) => {
  const [docType, setDocType] = useState("");
  const [docName, setDocName] = useState("");
  const [file, setFile] = useState(null);

  const INPUT_LOGIN_FIELDS = [
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
    } catch (error) {
      console.error("Error seleccionando documento:", error);
    }
  };

  const onSubmit = async () => {
    try {
      await uploadDocument({ userId, file, docName, docType });
      await getDocs();
      hideModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Subir Documento</Text>
      {INPUT_LOGIN_FIELDS.map(
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
        <Text style={styles.docPickerLabel}>
          {file ? file?.name : "Cargar documento"}
        </Text>
      </View>
      <CustomButton label="Subir" onPress={onSubmit} />
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
