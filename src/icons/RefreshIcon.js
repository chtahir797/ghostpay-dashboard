const RefreshIcon = ({ width = 20, height = 20, color = "#808080", ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.6667 10C16.6667 13.6819 13.6819 16.6667 10 16.6667C6.3181 16.6667 3.33333 13.6819 3.33333 10C3.33333 6.3181 6.3181 3.33333 10 3.33333C12.5 3.33333 14.5833 4.75 15.8333 6.66667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8333 3.33333V6.66667H12.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RefreshIcon;

