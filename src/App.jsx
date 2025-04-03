import { useState } from "react";
import "./App.css";
import MyDocument from "./components/Mypage";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import RightPanel from "./components/RightPanel";


const App = () => {
  const [droppedTexts, setDroppedTexts] = useState([]);

  // Handle text drop
  const handleDrop = (event) => {
    event.preventDefault();
    const text = event.dataTransfer.getData("text/plain");
    if (text) {
      setDroppedTexts((prev) => [...prev, text]); // Store dropped text
    }
  };

  // Allow drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="container">
        {/* Left Panel (PDF Preview) */}
        <div
          className="left"
          style={{ width: "60%", padding: "20px", border: "2px dashed gray", minHeight: "200px" }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h3>Drop Text Here:</h3>
          <PDFViewer style={{ width: "100%", height: "80vh" }}>
            <MyDocument  texts={droppedTexts}/>
          </PDFViewer>
        </div>

        {/* Right Panel (Draggable Texts) */}
        <RightPanel />

      </div>

      {/* PDF Download Button */}
      
    </>
  );
};

export default App;
