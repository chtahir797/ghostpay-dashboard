import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <header className="md:py-[23px] md:px-[25px] py-[12px] px-[16px] border-b border-[#151515] flex flex-col gap-[4px]">
      <h1 className="font-['Tomato_Grotesk'] font-bold text-[28px] leading-[42px] tracking-[-0.5px] text-[#ffffff]">
        {title}
      </h1>
      {subtitle && (
        <p className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[19.5px] tracking-0 border-[#808080] text-[#808080]">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default Header;

