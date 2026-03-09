import React from 'react';

const ArrowUpIcon = ({ width = 10, height = 10, color = "#59FF96", ...props }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    );
};

export default ArrowUpIcon;
