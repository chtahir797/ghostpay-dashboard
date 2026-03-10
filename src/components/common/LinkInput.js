import React from 'react';
import SearchIcon from '@/icons/SearchIcon';
import CopyIcon from '@/icons/CopyIcon';
import LogoIcon from '@/icons/LogoIcon';

const LinkInput = ({
  label = "Recipient",
  placeholder = "Enter wallet address",
  pasteCardTitle = "Paste from clipboard",
  pasteCardDescription = "Paste Copied Wallet address",
  value,
  onChange,
  onKeyDown,
  onPasteClick,
  color = "#FB923C",
  showLogo = false,
}) => {
  return (
    <div className="w-full max-w-[520px] mx-auto pt-[40px] flex flex-col gap-[20px] px-[25px] md:px-0">
      {/* Label */}
      <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[15px] tracking-0 text-[#808080]">
        {label}
      </p>

      {/* Search Input */}
      <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] py-[20px] px-[16px] mb-[20px] hover:border-[#222] transition-colors">
        <div className="flex items-center gap-[8px]">
          <SearchIcon width={20} height={20} color="#808080" />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent border-none outline-none font-['Tomato_Grotesk'] font-semibold text-[16px] tracking-0 text-[#808080] placeholder:text-[#808080]"
          />
        </div>
      </div>

      {/* Paste Card */}
      <div 
        className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] py-[20px] px-[16px] cursor-pointer hover:border-[#222] transition-colors"
        onClick={onPasteClick}
      >
        <div className="flex items-center gap-[12px]">
        
            <div className="p-[8px] rounded-[9px] flex-shrink-0" style={{ backgroundColor: color }}>
              <CopyIcon width={16} height={16} color="#000000" />
            </div>
          
          <div className="flex flex-col gap-[2px]">
            <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[21px] tracking-0 text-[#ffffff]">
              {pasteCardTitle}
            </p>
            <p className="font-['Tomato_Grotesk'] font-normal text-[11px] leading-[16.5px] tracking-0 text-[#555555]">
              {pasteCardDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkInput;

