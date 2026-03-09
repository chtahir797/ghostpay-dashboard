import React from 'react';
import LogoIcon from '@/icons/LogoIcon';
import ClipboardIcon from '@/icons/ClipboardIcon';
import InfoIcon from '@/icons/InfoIcon';

const OneTimeAddressView = ({ address, onCopyAddress, onISent }) => {
  return (
    <div className="max-w-[520px] mx-auto flex flex-col items-center gap-[24px] mt-[78px] px-4 md:px-0">
      <div className="flex flex-col gap-3 items-center">
        {/* Logo */}
        <LogoIcon size={88} color="#A78BFA" />
        <h2 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[33px] tracking-0 text-[#ffffff] text-center">
          Swap Via One-Time Address
        </h2>
        <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[18px] tracking-0 text-[#808080] text-center px-2">
          Send funds from your wallet to this one-time address to complete your transaction.
        </p>
      </div>

      {/* One-Time Address Box */}
      <div className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[16px] flex flex-col gap-[12px]">
        <p className="font-['Tomato_Grotesk'] font-normal text-[11px] leading-[16.5px] tracking-0 text-[#808080]">
          One-Time Address
        </p>
        <p className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[21px] tracking-0 text-[#ffffff] break-all">
          {address}
        </p>

        {/* Copy Address Button */}
        <button
          onClick={onCopyAddress}
          className="bg-[#222222] rounded-full p-[12px] flex items-center justify-center gap-[4px] hover:border-[#B39BFD] transition-colors"
        >
          <ClipboardIcon width={20} height={20} color="#ffffff" />
          <span className="font-['Tomato_Grotesk'] font-semibold text-[16px] leading-[24px] tracking-0 text-[#ffffff]">
            Copy Address
          </span>
        </button>
      </div>

      {/* Warning Box */}
      <div className="w-full bg-[#b49bfd06] border border-[#b49bfd14] rounded-[12px] p-[10px] flex items-start gap-2">
        <InfoIcon width={20} height={20} color="#A78BFA" />
        <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18.6px] tracking-0 text-[#A78BFA] max-w-[314px]">
          Only send requested currency to this address, any other funds sent may result in loss of funds.
        </p>
      </div>

      {/* I Sent Button */}
      <button
        onClick={onISent}
        className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors"
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
          I Sent
        </span>
      </button>
    </div>
  );
};

export default OneTimeAddressView;

