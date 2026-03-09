import React from 'react';
import ArrowDownIcon from '@/icons/ArrowDownIcon';
import SwapPreview from './SwapPreview';

const SwapQuoteView = ({
  payAmount,
  receiveAmount,
  payCurrency,
  receiveCurrency,
  quoteTimer,
  onAcceptQuote,
}) => {
  const previewData = [
    { label: 'Destination', value: 'aaaaaaa....aaa' },
    { label: 'Rate', value: '1 USDC = 0.006757 SOL', highlight: true },
    { label: 'Fees', value: '0%', highlight: true },
  ];

  return (
    <div className="w-full max-w-[520px] mx-auto flex flex-col gap-[24px] mt-[40px] px-4 md:px-0">
      {/* Quote Section */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-['Tomato_Grotesk'] font-bold text-[12px] leading-[15px] tracking-0 text-[#808080]">
              Quote
            </p>
            <p className="font-['Tomato_Grotesk'] font-medium text-[12px] leading-[18px] tracking-0 text-[#A78BFA]">
              {quoteTimer}s
            </p>
          </div>
          <div className="h-[3px] w-full bg-[#151515] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B39BFD] transition-all duration-1000"
              style={{ width: `${(quoteTimer / 8) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-4 relative">
          {/* You Send Card */}
          <div className="bg-[#0B0B0B] border border-[#151515] rounded-[20px] py-[18px] px-[25px] flex flex-col items-center gap-3">
            <p className="font-['Tomato_Grotesk'] font-normal text-[17px] leading-[22.5px] tracking-[0px] text-[#808080]">
              You Send
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <p className="font-['Tomato_Grotesk'] font-extrabold text-[48px] md:text-[60px] leading-[50px] md:leading-[63px] tracking-0 text-[#ffffff]">
                {payAmount}
              </p>
              <p className="font-['Tomato_Grotesk'] font-extrabold text-[32px] md:text-[40px] leading-[35px] md:leading-[44px] tracking-0 text-[#979797]">
                {payCurrency.symbol}
              </p>
            </div>
            <p className="font-['Tomato_Grotesk'] font-normal text-[17px] leading-[22.5px] tracking-0 text-[#808080]">
              $140.00 USD
            </p>
          </div>

          {/* Arrow Icon */}
          <div className="flex justify-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
            <button className="bg-[#B39BFD] rounded-[10px] p-[6px] hover:bg-[#9B8BED] transition-colors">
              <ArrowDownIcon width={20} height={20} color="#000000" />
            </button>
          </div>

          {/* You Receive Card */}
          <div className="bg-[#0B0B0B] border border-[#151515] rounded-[20px] py-[18px] px-[25px] flex flex-col items-center gap-3">
            <p className="font-['Tomato_Grotesk'] font-normal text-[17px] leading-[22.5px] tracking-[0px] text-[#808080]">
              You Receive
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <p className="font-['Tomato_Grotesk'] font-extrabold text-[48px] md:text-[60px] leading-[50px] md:leading-[63px] tracking-0 text-[#A78BFA]">
                {receiveAmount}
              </p>
              <p className="font-['Tomato_Grotesk'] font-extrabold text-[32px] md:text-[40px] leading-[35px] md:leading-[44px] tracking-0 text-[#A78BFA]">
                {receiveCurrency.symbol}
              </p>
            </div>
            <p className="font-['Tomato_Grotesk'] font-normal text-[17px] leading-[22.5px] tracking-0 text-[#808080]">
              $140.00 USD
            </p>
          </div>
        </div>
      </div>

      {/* Swap Preview Section */}
      <div className="flex flex-col gap-3">
        <p className="font-['Tomato_Grotesk'] font-bold text-[14px] leading-[20px] tracking-0 text-[#808080]">
          Swap Preview
        </p>
        <SwapPreview previewData={previewData} />
      </div>

      {/* Accept Quote Button */}
      <button
        onClick={onAcceptQuote}
        className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors"
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
          Accept Quote
        </span>
      </button>
    </div>
  );
};

export default SwapQuoteView;

