const ReferralsIcon = ({ width = 20, height = 20, color = "#808080", ...props }) => {
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
        d="M7.5 8.75C8.88071 8.75 10 7.63071 10 6.25C10 4.86929 8.88071 3.75 7.5 3.75C6.11929 3.75 5 4.86929 5 6.25C5 7.63071 6.11929 8.75 7.5 8.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 8.75C13.8807 8.75 15 7.63071 15 6.25C15 4.86929 13.8807 3.75 12.5 3.75C11.1193 3.75 10 4.86929 10 6.25C10 7.63071 11.1193 8.75 12.5 8.75Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 16.25C3.75 13.3505 5.85051 11.25 8.75 11.25H11.25C14.1495 11.25 16.25 13.3505 16.25 16.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.25 16.25C1.25 14.1789 2.92893 12.5 5 12.5H6.25C8.32107 12.5 10 14.1789 10 16.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReferralsIcon;

