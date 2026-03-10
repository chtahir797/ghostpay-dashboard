import React from 'react';

const MobileHomeHeader = () => {
  return (
    <header className="md:hidden flex items-center justify-between px-[25px] pt-[16px] pb-[12px]">
      <div className="flex flex-col gap-[4px]">
        <p className="font-['Tomato_Grotesk'] text-[12px] leading-[16px] tracking-0 text-[#808080]">
          Welcome Back,
        </p>
        <p className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#ffffff]">
          King Bob
        </p>
      </div>
      <div className="w-[32px] h-[32px] rounded-[10px] bg-[#151515] flex items-center justify-center text-[12px] font-['Tomato_Grotesk'] font-bold text-[#ffffff]">
        KB
      </div>
    </header>
  );
};

export default MobileHomeHeader;


