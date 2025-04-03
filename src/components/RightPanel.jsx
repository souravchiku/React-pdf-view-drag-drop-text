import React, { useState } from 'react';
import DownloadButton from './DonwloadButton';

// Create Document Component
const RightPanel = () => {

    const [texts, setTexts] = useState([])
    const [inputText, setInputText] = useState("");

    const handleAddText = () => {
        if (inputText.trim() !== "") {
            setTexts([...texts, inputText]);
            setInputText(""); // Clear input field after adding
        }
    };
    const handleDragStart = (event, text) => {
        event.dataTransfer.setData("text/plain", text);
      };
    return (
        <div className='right'>
            <div>
                <input type='text' value={inputText} placeholder='enter text' onChange={(e) => setInputText(e.target.value)}

                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddText();
                        }
                    }}

                />
                <button onClick={handleAddText}>Add Text</button>
            </div>
            <div>
                <h3>Entered Texts:</h3>
               
                    {texts.map((text, index) => (
                        <div 

                        key={index}
                        draggable 
                        className='item'
                        onDragStart={(e) => handleDragStart(e, text)}
                        
                        
                        > {text}</div>
                    ))}
                
            </div>
            <DownloadButton  texts={texts}/>
        </div>)
}


export default RightPanel