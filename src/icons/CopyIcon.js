const CopyIcon = ({ width = 20, height = 20, color = "#808080", ...props }) => {
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
        d="M13.3333 10.8333V14.1667C13.3333 15.5474 12.2141 16.6667 10.8333 16.6667H5.83333C4.45262 16.6667 3.33333 15.5474 3.33333 14.1667V9.16667C3.33333 7.78595 4.45262 6.66667 5.83333 6.66667H9.16667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 10.8333H16.6667C17.5871 10.8333 18.3333 10.0871 18.3333 9.16667V5.83333C18.3333 4.91286 17.5871 4.16667 16.6667 4.16667H13.3333C12.4129 4.16667 11.6667 4.91286 11.6667 5.83333V9.16667C11.6667 10.0871 12.4129 10.8333 13.3333 10.8333Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CopyIcon;

