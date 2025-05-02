import { FlatList, Linking, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { deleteDocumentAndFile } from "../../services/documentServices";
import { GEN_DOCS_MAP } from "../../utils/consts";

const DocsGrid = ({ userId, docs, docType, allowDelete, getDocs }) => {
  const handleDeleteDoc = async (docId) => {
    await deleteDocumentAndFile({ userId, docType, docId });
    await getDocs();
  };

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
      data={docs}
      renderItem={({ item }) => (
        <View style={styles.gridItem}>
          <Text style={styles.gridItemLabel}>
            {GEN_DOCS_MAP[item?.docName]}
          </Text>
          <View style={styles.buttons}>
            <IconButton
              mode="contained"
              containerColor="#188754"
              iconColor="#fff"
              icon="file-pdf-box"
              onPress={() => Linking.openURL(item.fileUrl)}
            />
            <IconButton
              mode="contained"
              containerColor="#dc3545"
              iconColor="#fff"
              icon="delete"
              onPress={() => handleDeleteDoc(item.id)}
              disabled={!allowDelete}
            />
          </View>
        </View>
      )}
      keyExtractor={(item) => item}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default DocsGrid;

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
  },
  contentContainer: {
    padding: 16,
  },
  gridItem: {
    height: 125,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#dde2f7",
    borderRadius: 8,
    gap: 12,
  },
  buttons: {
    flexDirection: "row",
  },
});
