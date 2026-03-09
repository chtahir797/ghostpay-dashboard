import React from 'react';
import Link from 'next/link';
import LogoIcon from '@/icons/LogoIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

const SwapCompleteView = ({ amount, rate, txHash, date, onCopyTxHash, explorerLink = '#' }) => {
  const formatTimestamp = () => {
    if (date) return date;
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
  };

  const formatAddress = (address) => {
    if (!address) return 'abcd........1234';
    if (address.length <= 12) return address;
    return `${address.slice(0, 4)}${'.'.repeat(8)}${address.slice(-4)}`;
  };

  return (
    <div className="w-full max-w-[520px] mx-auto flex flex-col items-center gap-[24px] pt-[40px] px-4 md:px-0">
      {/* Header with Close Button - Mobile */}
      <div className="w-full flex justify-between items-center md:hidden">
        <h2 className="font-['Tomato_Grotesk'] font-bold text-[18px] leading-[24px] tracking-0 text-[#ffffff]">
          Swap Complete
        </h2>
        <button className="p-[8px]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#808080"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Heading, Logo and Description */}
      <div className="flex flex-col items-center gap-[12px] pb-[24px] md:pb-[42px]">
        <LogoIcon size={88} color="#A78BFA" />
        <h2 className="hidden md:block font-['Tomato_Grotesk'] font-bold text-[24px] leading-[33px] tracking-0 text-[#ffffff] text-center">
          Swap Complete
        </h2>
        <h2 className="md:hidden font-['Tomato_Grotesk'] font-bold text-[20px] leading-[28px] tracking-0 text-[#ffffff] text-center">
          Ghost Swap Complete
        </h2>
        <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[18px] tracking-0 text-[#808080] text-center">
          {formatTimestamp()}
        </p>
      </div>

      {/* Transaction Details Table */}
      <div className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] overflow-hidden">
        {/* Amount */}
        <div className="px-[16px] py-[12px] flex justify-between items-center border-b border-[#151515]">
          <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
            Amount
          </p>
          <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
            {amount || '1.25 ETH'}
          </p>
        </div>

        {/* Rate */}
        <div className="px-[16px] py-[12px] flex justify-between items-center border-b border-[#151515]">
          <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
            Rate
          </p>
          <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
            {rate || '1 ETH = 1987.50'}
          </p>
        </div>

        {/* Status */}
        <div className="px-[16px] py-[12px] flex justify-between items-center border-b border-[#151515]">
          <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
            Status
          </p>
          <div className="flex items-center gap-[8px]">
            <div className="w-[8px] h-[8px] bg-[#B39BFD] rounded-full"></div>
            <p className="font-['Tomato_Grotesk'] font-semibold text-[13px] leading-[19.5px] tracking-0 text-[#B39BFD]">
              Confirmed
            </p>
          </div>
        </div>

        {/* Tx Hash */}
        <div className="px-[16px] py-[12px] flex justify-between items-center">
          <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
            Tx Hash
          </p>
          <div className="flex items-center gap-[8px]">
            <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
              {formatAddress(txHash)}
            </p>
            <button
              onClick={() => onCopyTxHash && onCopyTxHash(txHash)}
              className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 bg-[#222222] py-[8px] px-[9px] rounded-[7px] border-[1px] border-[#808080] hover:bg-[#2a2a2a] transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* View on Explorer Link */}
      <Link href={explorerLink} className="flex items-center gap-[4px] justify-center">
        <span className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080] hover:text-[#ffffff] transition-colors">
          View on Explorer
        </span>
        <ArrowRightIcon width={12} height={12} color="#808080" className="rotate-320" />
      </Link>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors text-center"
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
          Back to Home
        </span>
      </Link>
    </div>
  );
};

export default SwapCompleteView;

