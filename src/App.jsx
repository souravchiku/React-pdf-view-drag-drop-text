import { useState } from 'react'

import './App.css'
import MyDocument from './components/Mypage'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const App = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
  // <div style={{ textAlign: "center", padding: "20px" }}>
  //     <h2>Download PDF</h2>
  //     <PDFDownloadLink document={<MyDocument />} fileName="mypdf.pdf">
  //       {({ loading }) =>
  //         loading ? <button>Loading...</button> : <button>Download PDF</button>
  //       }
  //     </PDFDownloadLink>
  //   </div>
);

export default App
