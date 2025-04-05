import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';



pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

const Sidebar = lazy(() => import('./Sidebar'));
const ScreenshotPreview = lazy(() => import('./ScreenshotPreview'));

function PdfEditor() {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [scale, setScale] = useState(1.5);
  const [droppedInputs, setDroppedInputs] = useState([]);
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [screenshotData, setScreenshotData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const pdfContainerRef = useRef(null);

  useEffect(() => {
    setPdfUrl('/sample.pdf');
  }, []);

  useEffect(() => {
    if (pdfUrl) {
      const loadPdf = async () => {
        try {
          const loadingTask = pdfjsLib.getDocument(pdfUrl);
          const loadedPdf = await loadingTask.promise;
          setPdfDoc(loadedPdf);
        } catch (error) {
          console.error('Error loading PDF:', error);
        }
      };
      loadPdf();
    }
  }, [pdfUrl]);

  useEffect(() => {
    if (pdfDoc) {
      renderPages();
    }
  }, [pdfDoc]);

  const renderPages = async () => {
    if (!pdfDoc || !pdfContainerRef.current) return;

    pdfContainerRef.current.innerHTML = '';

    for (let num = 1; num <= pdfDoc.numPages; num++) {
      const page = await pdfDoc.getPage(num);
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      canvas.style.marginBottom = '10px';
      pdfContainerRef.current.appendChild(canvas);

      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext);
    }
  };

  const handleAddInput = () => {
    if (inputValue.trim() === '') return;
    setDroppedInputs((prevInputs) => [...prevInputs, { text: inputValue }]);
    setInputValue('');
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const index = e.dataTransfer.getData('index');
    const newInputs = [...droppedInputs];
    newInputs[index] = {
      ...newInputs[index],
      left: e.nativeEvent.offsetX,
      top: e.nativeEvent.offsetY,
    };
    setDroppedInputs(newInputs);
  };

  const handleSave = () => {
    const pdfContainer = pdfContainerRef.current;
    html2canvas(pdfContainer, { scrollY: 0 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      setScreenshotData(imgData);
      setShowNextScreen(true);
    });
  };

  const handleDownloadAndReset = () => {
    if (!screenshotData) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(screenshotData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(screenshotData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('pdf_preview.pdf');

    setTimeout(() => {
      window.location.reload();
    }, 500);


  };

  console.log(pdfContainerRef)
  if (!showNextScreen) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: 'auto' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div
            ref={pdfContainerRef}
            style={{ flex: 1, overflow: 'auto', position: 'relative', border: '1px solid black' }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {droppedInputs.map((input, index) => {
              if (typeof input.left !== 'number' || typeof input.top !== 'number') return null;
              return (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  style={{
                    position: 'absolute',
                    left: input.left,
                    top: input.top,
                    padding: '8px 12px',
                    backgroundColor: '#e0f0ff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #007bff',
                    color: '#004085',
                    fontWeight: '500',
                    fontSize: '14px',
                    cursor: 'move',
                    maxWidth: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {input.text}
                </div>
              );
            })}

          </div>

          <Suspense fallback={<div className='center-align'>Loading Sidebar...</div>}>
            <Sidebar
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleAddInput={handleAddInput}
              droppedInputs={droppedInputs}
              handleDragStart={handleDragStart}
              handleSave={handleSave}
            />
          </Suspense>
        </div>
      </div>
    );
  } else {
    return (
      <Suspense fallback={<div className='center-align'>Loading Preview...</div>}>
        <ScreenshotPreview
          screenshotData={screenshotData}
          handleDownloadAndReset={handleDownloadAndReset}
        />
      </Suspense>
    );
  }
}

export default PdfEditor;
