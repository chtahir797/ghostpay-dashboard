import React from 'react';

const GhostSwapIcon = ({ width = 20, height = 20, color = "#808080", ...props }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M14.1667 5.83334L17.5 9.16667L14.1667 12.5M5.83333 14.1667L2.5 10.8333L5.83333 7.50001M17.5 9.16667H7.5M2.5 10.8333H12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default GhostSwapIcon;
