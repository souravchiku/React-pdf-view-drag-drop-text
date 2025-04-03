import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./Mypage";

const DownloadButton = ({ texts }) => {
  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <PDFDownloadLink document={<MyDocument texts={texts} />} fileName="download.pdf">
        {({ loading }) =>
          loading ? "Loading PDF..." : <button>Download PDF</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadButton;
