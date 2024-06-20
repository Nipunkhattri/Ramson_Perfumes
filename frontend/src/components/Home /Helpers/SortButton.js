import React, { useState } from 'react'

export const SortButton = ({ children, value, onSelect ,key }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClick = (option) => {
      setSelectedOption(option);
      onSelect(option)
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
                className={`bullets ${selectedOption == key ? 'selected' : ''}`}
                onClick={()=>handleClick(key)}
            >
            </div>
            <h2 type="button" className={`sort-button ${selectedOption ? 'selected' : ''}`} onClick={handleClick}>
                {children}
            </h2>
        </div>
    );
};