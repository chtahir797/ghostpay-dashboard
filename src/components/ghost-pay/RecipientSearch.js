import React from 'react';
import SearchIcon from '@/icons/SearchIcon';
import ClipboardIcon from '@/icons/ClipboardIcon';

const RecipientSearch = ({ recipient, onRecipientChange, onKeyDown, onPasteClick }) => {
  return (
    <div className="w-full max-w-[520px] mx-auto pt-[40px] flex flex-col gap-[20px] px-4 md:px-0">
      {/* Recipient Text */}
      <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[15px] tracking-0 text-[#808080]">
        Recipient
      </p>

      {/* Search Input */}
      <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] py-[20px] px-[16px] mb-[20px] hover:border-[#222] transition-colors">
        <div className="flex items-center gap-[8px]">
          <SearchIcon width={20} height={20} color="#808080" />
          <input
            type="text"
            placeholder="Enter wallet address"
            value={recipient}
            onChange={(e) => onRecipientChange(e.target.value)}
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
          <ClipboardIcon width={32} height={32} color="#FB923C" />
          <div className="flex flex-col gap-[2px]">
            <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[21px] tracking-0 text-[#ffffff]">
              Paste from clipboard
            </p>
            <p className="font-['Tomato_Grotesk'] font-normal text-[11px] leading-[16.5px] tracking-0 text-[#555555]">
              Paste Copied Wallet address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientSearch;

