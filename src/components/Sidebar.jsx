import React from 'react';
import './Sidebar.css';

function Sidebar({ inputValue, setInputValue, handleAddInput, droppedInputs, handleDragStart, handleSave }) {
    return (
        <div className="sidebar">
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddInput();
                            }
                        }}
                        className="sidebar-input"
                    />
                    <button onClick={handleAddInput} className="sidebar-button">
                        Add Text
                    </button>
                </div>
                <button onClick={handleSave} className="sidebar-save-button">
                    Save & Next
                </button>
                <div className="sidebar-input-list">
                    {droppedInputs.map((input, index) => (
                        <div
                            key={index}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            className="sidebar-draggable-item"
                        >
                            {input.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
