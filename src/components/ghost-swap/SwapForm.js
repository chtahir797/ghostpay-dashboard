import React, { useState } from 'react';
import CurrencyCard from './CurrencyCard';
import SwapIcon from '@/icons/SwapIcon';
import PersonIcon from '@/icons/PersonIcon';
import NumericKeypad from '../common/NumericKeypad';

const SwapForm = ({
  payAmount,
  receiveAmount,
  payCurrency,
  receiveCurrency,
  receiveAddress,
  selectedDelay,
  delayOptions,
  onPayAmountChange,
  onReceiveAmountChange,
  onPayCurrencyClick,
  onReceiveCurrencyClick,
  onReceiveAddressChange,
  onDelayChange,
  onContinue,
  activeInput = 'pay',
  onActiveInputChange,
}) => {
  const [localActiveInput, setLocalActiveInput] = useState(activeInput || 'pay');
  const [showKeypad, setShowKeypad] = useState(false);

  const currentActiveInput = activeInput || localActiveInput;
  const setActiveInput = onActiveInputChange || setLocalActiveInput;

  const handleKeypadKeyPress = (value) => {
    const currentAmount = currentActiveInput === 'pay' ? payAmount : receiveAmount;
    if (currentAmount === '0' || currentAmount === '') {
      if (currentActiveInput === 'pay') {
        onPayAmountChange(value);
      } else {
        onReceiveAmountChange(value);
      }
    } else {
      if (currentActiveInput === 'pay') {
        onPayAmountChange(currentAmount + value);
      } else {
        onReceiveAmountChange(currentAmount + value);
      }
    }
  };

  const handleKeypadBackspace = () => {
    const currentAmount = currentActiveInput === 'pay' ? payAmount : receiveAmount;
    if (currentAmount.length > 0) {
      const newAmount = currentAmount.slice(0, -1);
      if (currentActiveInput === 'pay') {
        onPayAmountChange(newAmount);
      } else {
        onReceiveAmountChange(newAmount);
      }
    }
  };

  const handleKeypadDecimal = () => {
    const currentAmount = currentActiveInput === 'pay' ? payAmount : receiveAmount;
    if (!currentAmount.includes('.')) {
      if (currentActiveInput === 'pay') {
        onPayAmountChange(currentAmount + '.');
      } else {
        onReceiveAmountChange(currentAmount + '.');
      }
    }
  };

  return (
    <div className="w-full max-w-[520px] mx-auto flex flex-col gap-[24px] mt-[40px] px-[25px] md:px-0">
      {/* You Pay and You Receive Cards */}
      <div className="flex flex-col gap-[16px] relative">
        {/* You Pay Card */}
        <div onClick={() => {
          setActiveInput('pay');
          if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setShowKeypad(true);
          }
        }}>
          <CurrencyCard
            label="You Pay"
            amount={payAmount}
            currency={payCurrency}
            usdValue="$2650.00 USD"
            balance={payCurrency.balance}
            onAmountChange={onPayAmountChange}
            onCurrencyClick={onPayCurrencyClick}
            showBalance={true}
            isActive={currentActiveInput === 'pay'}
            readOnly={true}
            onClick={() => {
              setActiveInput('pay');
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setShowKeypad(true);
              }
            }}
          />
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
          <button className="bg-[#B39BFD] rounded-[10px] p-[6px] hover:bg-[#9B8BED] transition-colors">
            <SwapIcon width={20} height={20} color="#000000" />
          </button>
        </div>

        {/* You Receive Card */}
        <div onClick={() => {
          setActiveInput('receive');
          if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setShowKeypad(true);
          }
        }}>
          <CurrencyCard
            label="You Receive"
            amount={receiveAmount}
            currency={receiveCurrency}
            usdValue="$2650.00 USD"
            onAmountChange={onReceiveAmountChange}
            onCurrencyClick={onReceiveCurrencyClick}
            isActive={currentActiveInput === 'receive'}
            readOnly={true}
            onClick={() => {
              setActiveInput('receive');
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setShowKeypad(true);
              }
            }}
          />
        </div>
      </div>

      {/* Receive Address Input */}
      <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[15px] flex items-center gap-[10px]">
        <PersonIcon width={32} height={32} color="#808080" />
        <input
          type="text"
          placeholder="Receive address (optional)"
          value={receiveAddress}
          onChange={(e) => onReceiveAddressChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none font-['Tomato_Grotesk'] font-normal text-[16px] tracking-0 text-[#808080] placeholder:text-[#808080]"
        />
      </div>

      {/* Swap Delay Timer - Hidden on mobile */}
      <div className="hidden md:flex flex-col gap-[12px]">
        <p className="font-['Tomato_Grotesk'] font-bold text-[14px] leading-[12px] tracking-0 text-[#808080]">
          Swap Delay Timer (Optional)
        </p>
        <div className="flex gap-[13.33px] flex-wrap">
          {delayOptions.map((option) => (
            <button
              key={option}
              onClick={() => onDelayChange(option)}
              className={`font-['Tomato_Grotesk'] font-bold text-[14px] leading-[12px] tracking-0 w-[120px] text-center py-[15px] rounded-[16px] transition-colors ${
                selectedDelay === option
                  ? 'bg-[#B39BFD] text-[#111111]'
                  : 'bg-[#0B0B0B] border border-[#151515] text-[#ffffff]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Numeric Keypad - Mobile Only */}
      {showKeypad && (
        <div className="md:hidden">
          <NumericKeypad
            onKeyPress={handleKeypadKeyPress}
            onBackspace={handleKeypadBackspace}
            onDecimal={handleKeypadDecimal}
          />
        </div>
      )}

      {/* Swap Button - Mobile shows "Swap", Desktop shows "Continue" */}
      <button
        onClick={onContinue}
        className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors"
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
          <span className="md:hidden">Swap</span>
          <span className="hidden md:inline">Continue</span>
        </span>
      </button>
    </div>
  );
};

export default SwapForm;

