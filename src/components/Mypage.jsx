import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
});

const MyDocument = ({ texts }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Dropped Texts:</Text>
      {texts.map((text, index) => (
        <View key={index} style={styles.section}>
          <Text>{text}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default MyDocument;
