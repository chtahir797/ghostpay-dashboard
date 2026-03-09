const SwapIcon = ({ width = 20, height = 20, color = "#808080", ...props }) => {
    return (
      <svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...props}>
        <path
          d="M9.16667 6.66732L5.83333 3.33398M5.83333 3.33398L2.5 6.66732M5.83333 3.33398V16.6673M10.8333 13.334L14.1667 16.6673M14.1667 16.6673L17.5 13.334M14.1667 16.6673V3.33398"
          stroke={color}
          strokeWidth="2.70833"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  
  export default SwapIcon;