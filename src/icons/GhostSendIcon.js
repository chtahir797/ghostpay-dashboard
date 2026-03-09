import React from 'react';

const GhostSendIcon = ({ width = 20, height = 20, color = "#808080", ...props }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M18.3333 1.66666L9.16663 10.8333M18.3333 1.66666L12.5 18.3333L9.16663 10.8333M18.3333 1.66666L1.66663 7.49999L9.16663 10.8333" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default GhostSendIcon;
