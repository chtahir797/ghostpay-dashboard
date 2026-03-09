import React from 'react';
import CurrencyCard from './CurrencyCard';
import SwapIcon from '@/icons/SwapIcon';
import PersonIcon from '@/icons/PersonIcon';

const SwapConfirmationView = ({
  payAmount,
  receiveAmount,
  payCurrency,
  receiveCurrency,
  receiveAddress,
  payUsdValue,
  receiveUsdValue,
  rate,
  networkFee,
  slippage,
  onSwap,
}) => {
  return (
    <div className="w-full max-w-[520px] mx-auto flex flex-col gap-[24px] mt-[40px] px-4 md:px-0">
      {/* You Pay and You Receive Cards */}
      <div className="flex flex-col gap-[16px] relative">
        {/* You Pay Card */}
        <CurrencyCard
          label="You Pay"
          amount={payAmount}
          currency={payCurrency}
          usdValue={payUsdValue}
          balance={payCurrency.balance}
          onAmountChange={() => {}}
          onCurrencyClick={() => {}}
          showBalance={true}
          readOnly={true}
        />

        {/* Swap Icon */}
        <div className="flex justify-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
          <button className="bg-[#B39BFD] rounded-[10px] p-[6px]">
            <SwapIcon width={20} height={20} color="#000000" />
          </button>
        </div>

        {/* You Receive Card */}
        <CurrencyCard
          label="You Receive"
          amount={receiveAmount}
          currency={receiveCurrency}
          usdValue={receiveUsdValue}
          onAmountChange={() => {}}
          onCurrencyClick={() => {}}
          readOnly={true}
        />
      </div>

      {/* Receive Address Input */}
      {receiveAddress && (
        <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[15px] flex items-center gap-[10px]">
          <PersonIcon width={32} height={32} color="#808080" />
          <input
            type="text"
            value={receiveAddress}
            readOnly
            className="flex-1 bg-transparent border-none outline-none font-['Tomato_Grotesk'] font-normal text-[16px] tracking-0 text-[#808080] pointer-events-none"
          />
        </div>
      )}

      {/* Swap Details */}
      <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[16px] flex flex-col gap-[12px]">
        <div className="flex justify-between items-center">
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
            You Pay
          </p>
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
            {payAmount} {payCurrency.symbol} ({payUsdValue})
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
            You Receive
          </p>
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
            ≈ {receiveAmount} {receiveCurrency.symbol}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
            Rate
          </p>
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
            {rate}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
            Network Fee
          </p>
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
            {networkFee}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
            Slippage
          </p>
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
            {slippage}
          </p>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={onSwap}
        className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors"
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
          Swap
        </span>
      </button>
    </div>
  );
};

export default SwapConfirmationView;

