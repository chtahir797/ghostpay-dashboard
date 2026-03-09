import React from 'react';

const NumericKeypad = ({ onKeyPress, onBackspace, onDecimal }) => {
  const handleKeyClick = (value) => {
    onKeyPress(value);
  };

  const handleBackspace = () => {
    onBackspace();
  };

  const handleDecimal = () => {
    onDecimal();
  };

  return (
    <div className="md:hidden grid grid-cols-3 gap-[12px] px-4 py-[20px]">
      {/* Numbers 1-9 */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => handleKeyClick(num.toString())}
          className="py-[20px] px-[16px] flex items-center justify-center  transition-colors"
        >
          <span className="font-['Tomato_Grotesk'] font-bold text-[26px] leading-[39px] tracking-0 text-[#ffffff]">
            {num}
          </span>
        </button>
      ))}

      {/* Decimal point */}
      <button
        onClick={handleDecimal}
        className="py-[20px] px-[16px] flex items-center justify-center  transition-colors"
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[26px] leading-[39px] tracking-0 text-[#ffffff]">
          .
        </span>
      </button>

      {/* Zero */}
      <button
        onClick={() => handleKeyClick('0')}
        className=" py-[20px] px-[16px] flex items-center justify-center  transition-colors"
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[26px] leading-[39px] tracking-0 text-[#ffffff]">
          0
        </span>
      </button>

      {/* Backspace */}
      <button
        onClick={handleBackspace}
        className=" py-[20px] px-[16px] flex items-center justify-center transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 4H8L1 12L8 20H21C21.5304 20 22.0391 19.7893 22.4142 19.4142C22.7893 19.0391 23 18.5304 23 18V6C23 5.46957 22.7893 4.96086 22.4142 4.58579C22.0391 4.21071 21.5304 4 21 4Z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 9L12 15M12 9L18 15"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default NumericKeypad;

