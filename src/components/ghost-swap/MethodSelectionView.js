import React from 'react';
import LogoIcon from '@/icons/LogoIcon';
import WalletIcon from '@/icons/WalletIcon';
import ClockIcon from '@/icons/ClockIcon';

const MethodSelectionView = ({ onOneTimeAddress }) => {
  return (
    <div className="w-full max-w-[654px] mx-auto h-full flex flex-col items-center justify-center gap-[32px] pt-[40px] px-4 md:px-0">
      {/* Heading, Logo and Subtitle */}
      <div className="flex flex-col items-center gap-[12px]">
        <LogoIcon size={88} color="#A78BFA" />
        <h2 className="font-['Tomato_Grotesk'] font-bold text-[28px] md:text-[32px] leading-[33px] tracking-0 text-[#ffffff] text-center">
          Choose Method To Swap
        </h2>
        <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[18px] tracking-0 text-[#808080] text-center">
          Choose the method you want to use to swap.
        </p>
      </div>

      {/* Method Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Pay Via Wallet Card */}
        <button className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[20px] py-[20px] flex flex-col items-center hover:border-[#B39BFD] transition-colors">
          <div className="max-w-[193px] flex flex-col gap-2">
            <div className="flex flex-col items-center gap-3">
              <div className="p-[12px] bg-[#a78bfa21] border border-[#A78BFA] rounded-[8px]">
                <WalletIcon size={28} color="#ffffff" />
              </div>
              <h3 className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[16px] tracking-0 text-[#ffffff]">
                Pay Via Wallet
              </h3>
            </div>
            <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18px] tracking-0 text-[#808080] text-center">
              Complete your swap by swapping directly from your wallet.
            </p>
          </div>
        </button>

        {/* Use One-Time Address Card */}
        <button
          onClick={onOneTimeAddress}
          className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[20px] py-[20px] flex flex-col items-center hover:border-[#B39BFD] transition-colors"
        >
          <div className="max-w-[193px] flex flex-col gap-2">
            <div className="flex flex-col items-center gap-3">
              <div className="p-[12px] bg-[#a78bfa21] border border-[#A78BFA] rounded-[8px]">
                <ClockIcon size={28} color="#ffffff" />
              </div>
              <h3 className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[16px] tracking-0 text-[#ffffff]">
                Use One-Time Address
              </h3>
            </div>
            <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18px] tracking-0 text-[#808080] text-center">
              Swap by sending to a one time address
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MethodSelectionView;

