import React from 'react';
import AssetIcon from '../common/dropdown/AssetIcon';
import ArrowDownIcon from '@/icons/ArrowDownIcon';

const CurrencyCard = ({
  label,
  amount,
  currency,
  usdValue,
  balance,
  onAmountChange,
  onCurrencyClick,
  showBalance = false,
  isActive = false,
  readOnly = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#0B0B0B] border rounded-[20px] md:py-[18px] md:px-[25px] py-[15px] px-[20px] flex flex-col gap-[15px] transition-colors cursor-pointer ${
        isActive ? 'border-[#B39BFD]' : 'border-[#151515]'
      }`}
    >
      {/* Label */}
      <p className="font-['Tomato_Grotesk'] font-normal text-[17px] leading-[22.5px] tracking-[0px] text-[#808080]">
        {label}
      </p>

      {/* Amount and Currency Selector */}
      <div className="flex items-center justify-between">
        {/* Mobile*/}
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="md:hidden w-full font-['Tomato_Grotesk'] font-extrabold text-[48px] leading-[51px] tracking-0 text-[#ffffff] bg-transparent border-none outline-none flex-1 min-w-0"
        />
        {/* Desktop */}
        <input
          type="text"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="hidden md:block font-['Tomato_Grotesk'] font-extrabold text-[60px] leading-[63px] tracking-0 text-[#ffffff] max-w-[75%] bg-transparent border-none outline-none w-auto"
        />
        <button
          onClick={onCurrencyClick}
          className="flex flex-col gap-[5px] items-end"
        >
          <div className="bg-[#000000] border border-[#151515] rounded-[16px] md:p-[10px] p-[8px] flex items-center gap-[8px] hover:border-[#222] transition-colors">
          
            <div className="md:hidden">
              <AssetIcon icon={currency.icon} size={20} />
            </div>
            <div className="hidden md:block">
              <AssetIcon icon={currency.icon} size={25} />
            </div>
            <p className="font-['Tomato_Grotesk'] font-bold text-[17px] leading-[25px] tracking-0 text-[#808080]">
              {currency.symbol}
            </p>
            <ArrowDownIcon width={12} height={12} color="#808080" />
          </div>
        </button>
      </div>

      {/* USD Value and Balance */}
      <div className="flex items-center justify-between">
        <p className="font-['Tomato_Grotesk'] font-normal text-[17px] leading-[22.5px] tracking-0 text-[#808080]">
          {usdValue}
        </p>
        {showBalance && balance && (
          <p className="font-['Tomato_Grotesk'] font-normal text-[15px] leading-[22.5px] tracking-0 text-[#808080]">
            Bal: {balance} {currency.symbol}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyCard;

