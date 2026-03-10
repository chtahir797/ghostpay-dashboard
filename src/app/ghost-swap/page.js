"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";
import SwapForm from "@/components/ghost-swap/SwapForm";
import CurrencyCard from "@/components/ghost-swap/CurrencyCard";
import LogoIcon from '@/icons/LogoIcon';
import SwapIcon from '@/icons/SwapIcon';
import PersonIcon from '@/icons/PersonIcon';
import ArrowDownIcon from '@/icons/ArrowDownIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import WalletIcon from '@/icons/WalletIcon';
import ClockIcon from '@/icons/ClockIcon';
import ClipboardIcon from '@/icons/ClipboardIcon';
import InfoIcon from '@/icons/InfoIcon';
import MethodSelection from '@/components/common/MethodSelection';
import { ChevronLeftIcon, ChevronsLeftIcon, X } from 'lucide-react';

const swapDelayOptions = ['Instant', '1m', '5m', '10m'];

export default function GhostSwap() {
  const [payAmount, setPayAmount] = useState('1.25');
  const [receiveAmount, setReceiveAmount] = useState('1.25');
  const [payCurrency, setPayCurrency] = useState({ name: 'Ethereum', symbol: 'ETH', icon: 'eth', balance: '1.42' });
  const [receiveCurrency, setReceiveCurrency] = useState({ name: 'USDC', symbol: 'USDC', icon: 'usdc', balance: '42.5' });
  const [selectedDelay, setSelectedDelay] = useState('Instant');
  const [receiveAddress, setReceiveAddress] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [showMethodSelection, setShowMethodSelection] = useState(false);
  const [showOneTimeAddress, setShowOneTimeAddress] = useState(false);
  const [showSwapProgress, setShowSwapProgress] = useState(false);
  const [showSwapComplete, setShowSwapComplete] = useState(false);
  const [showSwapConfirmation, setShowSwapConfirmation] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);
  const [quoteTimer, setQuoteTimer] = useState(8);
  const [activeInput, setActiveInput] = useState('pay');
  const oneTimeAddress = '0x5c8dd25b28c8461ef210412b5b24f67dd40e918f';

  const progressSteps = [
    'Waiting for deposit',
    'Stables detected. Awaiting confirmations',
    'Confirmed. Executing swap',
    'Securing liquidity',
    'Swap locked in',
    'Preparing SOL transfer',
    'SOL sent. Awaiting confirmation',
    'Swap complete',
  ];

  const handleContinue = () => {
    // On mobile, show confirmation view; on desktop, show quote
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShowSwapConfirmation(true);
    } else {
      setShowQuote(true);
      setQuoteTimer(8);
    }
  };

  const handleSwap = () => {
    setShowSwapConfirmation(false);
    setShowQuote(true);
    setQuoteTimer(8);
  };

  const handleAcceptQuote = () => {
    setShowMethodSelection(true);
  };

  const handleOneTimeAddress = () => {
    setShowOneTimeAddress(true);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(oneTimeAddress);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleISent = () => {
    setShowSwapProgress(true);
    setCurrentStep(2);

    const stepIntervals = [2000, 2000, 2000, 1500, 1500, 1500, 1500];
    let stepIndex = 2;
    stepIntervals.forEach((delay, index) => {
      setTimeout(() => {
        if (stepIndex < progressSteps.length - 1) {
          setCurrentStep(stepIndex + 1);
          stepIndex++;
        }
      }, delay * (index + 1));
    });

    setTimeout(() => {
      setShowSwapComplete(true);
      setShowSwapProgress(false);
    }, 12000);
  };

  const formatTimestamp = () => {
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

  const handleCopyTxHash = (txHash) => {
    navigator.clipboard.writeText(txHash || 'abcd......1234');
  };

  useEffect(() => {
    if (showQuote && quoteTimer > 0) {
      const timer = setTimeout(() => {
        setQuoteTimer(quoteTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showQuote, quoteTimer]);

  const previewData = [
    { label: 'Destination', value: 'aaaaaaa....aaa' },
    { label: 'Rate', value: '1 USDC = 0.006757 SOL', highlight: true },
    { label: 'Fees', value: '0%', highlight: true },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        <header className='hidden md:block'>
          <Header title="Ghost Swap" subtitle="Swap your tokens anonymously" />
        </header>
        {/* Conditional Header */}
        {showSwapComplete ? (
          <header className="md:hidden py-[23px] px-[25px] border-b border-[#151515] flex items-center justify-between gap-[10px]">
            <h1 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[36px] tracking-[-0.5px] text-[#ffffff]">
              Swap Complete
            </h1>
            <button className="p-[6px] hover:bg-[#151515] rounded-[8px] transition-colors">
              <X width={18} height={18} color="#ffffff" />
            </button>

          </header>
        ) : (
          // First 3 Screens Header - Back arrow + Title
          <header className="md:hidden py-[23px] px-[25px] border-b border-[#151515] flex items-center gap-[10px]">
            <button className="p-[6px] hover:bg-[#151515] rounded-[8px] transition-colors">
              <ChevronLeftIcon width={18} height={18} color="#ffffff" />
            </button>
            <h1 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[36px] tracking-[-0.5px] text-[#ffffff]">
              Ghost Swap
            </h1>
          </header>
        )}
        <main className="flex justify-center h-full mb-5 md:mb-0">
          <div className="w-full flex flex-col gap-[24px]">
            {showSwapComplete ? (
              // Swap Complete View
              <div className="w-full max-w-[520px] mx-auto flex flex-col items-center gap-[24px] pt-[40px] ">
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
                  <div className="px-[16px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                      Amount
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                      1.25 ETH
                    </p>
                  </div>
                  <div className="px-[16px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                      Rate
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                      1 ETH = 1987.50
                    </p>
                  </div>
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
                  <div className="px-[16px] py-[12px] flex justify-between items-center">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                      Tx Hash
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                        {formatAddress('abcd......1234')}
                      </p>
                      <button
                        onClick={() => handleCopyTxHash('abcd......1234')}
                        className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 bg-[#222222] py-[8px] px-[9px] rounded-[7px] border border-[#808080] hover:bg-[#2a2a2a] transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                {/* View on Explorer Link */}
                <Link href="#" className="flex items-center gap-[4px] justify-center">
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
            ) : showSwapProgress ? (
              // Swap In-Progress View
              <div className="w-full max-w-[520px] mx-auto flex flex-col items-center gap-[24px] pt-[62px] ">
                <div className="flex flex-col items-center gap-[12px]">
                  <LogoIcon size={88} color="#A78BFA" />
                  <h2 className="font-['Tomato_Grotesk'] font-bold text-[28px] md:text-[32px] leading-[35px] md:leading-[40px] tracking-0 text-[#ffffff] text-center">
                    Swap In-Progress
                  </h2>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[24px] tracking-0 text-[#808080] text-center">
                    Follow along as your swap goes through our process.
                  </p>
                </div>

                <div className="w-full flex flex-col gap-[16px]">
                  {/* Progress Bar */}
                  <div className="flex gap-[4px]">
                    {progressSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`flex-1 h-[4px] rounded-full transition-colors ${index <= currentStep ? 'bg-[#B39BFD]' : 'bg-[#151515]'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Progress Steps List */}
                  <div className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] flex flex-col">
                    {progressSteps.map((step, index) => {
                      const isActive = index === currentStep;
                      const isCompleted = index < currentStep;
                      const isLast = index === progressSteps.length - 1;

                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-[12px] pt-[12px] pb-[12.5px] ps-[30px] ${!isLast ? 'border-b border-[#151515]' : ''
                            }`}
                        >
                          <div
                            className={`w-[8px] h-[8px] rounded-full transition-colors ${isActive
                                ? 'bg-[#B39BFD]'
                                : isCompleted
                                  ? 'bg-[#808080]'
                                  : 'bg-[#151515]'
                              }`}
                          />
                          <p
                            className={`font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 transition-colors ${isActive
                                ? 'text-[#B39BFD]'
                                : isCompleted
                                  ? 'text-[#808080]'
                                  : 'text-[#555555]'
                              }`}
                          >
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Link
                  href="/"
                  className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors text-center"
                >
                  <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                    Back to Home
                  </span>
                </Link>
              </div>
            ) : showOneTimeAddress ? (
              // One-Time Address View
              <div className="max-w-[520px] mx-auto flex flex-col items-center gap-[24px] mt-[78px] ">
                <div className="flex flex-col gap-3 items-center">
                  <LogoIcon size={88} color="#A78BFA" />
                  <h2 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[33px] tracking-0 text-[#ffffff] text-center">
                    Swap Via One-Time Address
                  </h2>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[18px] tracking-0 text-[#808080] text-center px-2">
                    Send funds from your wallet to this one-time address to complete your transaction.
                  </p>
                </div>

                <div className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[16px] flex flex-col gap-[12px]">
                  <p className="font-['Tomato_Grotesk'] font-normal text-[11px] leading-[16.5px] tracking-0 text-[#808080]">
                    One-Time Address
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[21px] tracking-0 text-[#ffffff] break-all">
                    {oneTimeAddress}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="bg-[#222222] rounded-full p-[12px] flex items-center justify-center gap-[4px] hover:border-[#B39BFD] transition-colors"
                  >
                    <ClipboardIcon width={20} height={20} color="#ffffff" />
                    <span className="font-['Tomato_Grotesk'] font-semibold text-[16px] leading-[24px] tracking-0 text-[#ffffff]">
                      Copy Address
                    </span>
                  </button>
                </div>

                <div className="w-full bg-[#b49bfd06] border border-[#b49bfd14] rounded-[12px] p-[10px] flex items-start gap-2">
                  <InfoIcon width={20} height={20} color="#A78BFA" />
                  <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18.6px] tracking-0 text-[#A78BFA] max-w-[314px]">
                    Only send requested currency to this address, any other funds sent may result in loss of funds.
                  </p>
                </div>

                <button
                  onClick={handleISent}
                  className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors"
                >
                  <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                    I Sent
                  </span>
                </button>
              </div>
            ) : showMethodSelection ? (
              // Method Selection View
              <MethodSelection
                title="Choose Method To Swap"
                subtitle="Choose the method you want to use to swap."
                logoColor="#A78BFA"
                borderColor="#B39BFD"
                iconBgColor="#a78bfa21"
                methods={[
                  {
                    icon: WalletIcon,
                    title: "Pay Via Wallet",
                    description: "Complete your swap by swapping directly from your wallet.",
                    onClick: () => {},
                  },
                  {
                    icon: ClockIcon,
                    title: "Use One-Time Address",
                    description: "Swap by sending to a one time address",
                    onClick: handleOneTimeAddress,
                  },
                ]}
              />
            ) : showSwapConfirmation ? (
              // Swap Confirmation View (Mobile)
              <div className="w-full max-w-[520px] mx-auto flex flex-col gap-[24px] mt-[40px] ">
                <div className="flex flex-col gap-[16px] relative">
                  <CurrencyCard
                    label="You Pay"
                    amount={payAmount}
                    currency={payCurrency}
                    usdValue="$2650.00"
                    balance={payCurrency.balance}
                    onAmountChange={() => { }}
                    onCurrencyClick={() => { }}
                    showBalance={true}
                    readOnly={true}
                  />
                  <div className="flex justify-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <button className="bg-[#B39BFD] rounded-[10px] p-[6px]">
                      <SwapIcon width={20} height={20} color="#000000" />
                    </button>
                  </div>
                  <CurrencyCard
                    label="You Receive"
                    amount={receiveAmount}
                    currency={receiveCurrency}
                    usdValue="$2650.00"
                    onAmountChange={() => { }}
                    onCurrencyClick={() => { }}
                    readOnly={true}
                  />
                </div>

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

                <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[16px] flex flex-col gap-[12px]">
                  <div className="flex justify-between items-center">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
                      You Pay
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
                      {payAmount} {payCurrency.symbol} ($2650.00)
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
                      1 ETH = 1987.50 USDC
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
                      Network Fee
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
                      $0.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
                      Slippage
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
                      0%
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSwap}
                  className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors"
                >
                  <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                    Swap
                  </span>
                </button>
              </div>
            ) : showQuote ? (
              // Swap Quote View
              <div className="w-full max-w-[520px] mx-auto flex flex-col gap-[24px] mt-[40px] ">
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

                    <div className="flex justify-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <button className="bg-[#B39BFD] rounded-[10px] p-[6px] hover:bg-[#9B8BED] transition-colors">
                        <ArrowDownIcon width={20} height={20} color="#000000" />
                      </button>
                    </div>

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

                <div className="flex flex-col gap-3">
                  <p className="font-['Tomato_Grotesk'] font-bold text-[14px] leading-[20px] tracking-0 text-[#808080]">
                    Swap Preview
                  </p>
                  <div className="flex flex-col gap-[12px] w-full">
                    <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] overflow-hidden">
                      {previewData.map((item, index) => {
                        const isLast = index === previewData.length - 1;
                        return (
                          <div
                            key={index}
                            className={`px-[10px] py-[12px] flex justify-between items-center ${!isLast ? 'border-b border-[#151515]' : ''
                              }`}
                          >
                            <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                              {item.label}
                            </p>
                            {item.value && (
                              <p
                                className={`font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 ${item.highlight ? 'text-[#B39BFD]' : 'text-[#ffffff]'
                                  }`}
                              >
                                {item.value}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAcceptQuote}
                  className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors"
                >
                  <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                    Accept Quote
                  </span>
                </button>
              </div>
            ) : (
              <SwapForm
                payAmount={payAmount}
                receiveAmount={receiveAmount}
                payCurrency={payCurrency}
                receiveCurrency={receiveCurrency}
                receiveAddress={receiveAddress}
                selectedDelay={selectedDelay}
                delayOptions={swapDelayOptions}
                onPayAmountChange={setPayAmount}
                onReceiveAmountChange={setReceiveAmount}
                onPayCurrencyClick={() => { }}
                onReceiveCurrencyClick={() => { }}
                onReceiveAddressChange={setReceiveAddress}
                onDelayChange={setSelectedDelay}
                onContinue={handleContinue}
                activeInput={activeInput}
                onActiveInputChange={setActiveInput}
              />
            )}
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
