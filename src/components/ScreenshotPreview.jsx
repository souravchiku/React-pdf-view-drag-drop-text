import React from 'react';

function ScreenshotPreview({ screenshotData, handleDownloadAndReset }) {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ 'display': 'flex',alignItems:'center', 'justifyContent': 'center', 'gap': '10px', flexDirection: 'column' }}>
                <button className='sidebar-button' onClick={handleDownloadAndReset}>Download & Reset</button>
                <img src={screenshotData} alt="Screenshot" style={{ maxWidth: '80%', maxHeight: '80vh' }} />
            </div>
        </div>
    );
}

export default ScreenshotPreview;
