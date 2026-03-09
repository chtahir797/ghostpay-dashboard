"use client";

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";
import SwapForm from "@/components/ghost-swap/SwapForm";
import SwapQuoteView from "@/components/ghost-swap/SwapQuoteView";
import SwapConfirmationView from "@/components/ghost-swap/SwapConfirmationView";
import MethodSelectionView from "@/components/ghost-swap/MethodSelectionView";
import OneTimeAddressView from "@/components/ghost-swap/OneTimeAddressView";
import SwapInProgressView from "@/components/ghost-swap/SwapInProgressView";
import SwapCompleteView from "@/components/ghost-swap/SwapCompleteView";

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
    // After swap confirmation, proceed to quote or complete
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

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        <Header title="Ghost Swap" subtitle="Swap your tokens anonymously" />
        <main className="p-[10px] flex justify-center h-full">
          <div className="w-full flex flex-col gap-[24px]">
            {showSwapComplete ? (
              <SwapCompleteView
                amount="1.25 ETH"
                rate="1 ETH = 1987.50"
                txHash="abcd......1234"
                date={formatTimestamp()}
                onCopyTxHash={handleCopyTxHash}
              />
            ) : showSwapProgress ? (
              <SwapInProgressView
                progressSteps={progressSteps}
                currentStep={currentStep}
              />
            ) : showOneTimeAddress ? (
              <OneTimeAddressView
                address={oneTimeAddress}
                onCopyAddress={handleCopyAddress}
                onISent={handleISent}
              />
            ) : showMethodSelection ? (
              <MethodSelectionView onOneTimeAddress={handleOneTimeAddress} />
            ) : showSwapConfirmation ? (
              <SwapConfirmationView
                payAmount={payAmount}
                payCurrency={payCurrency}
                payUsdValue="$2650.00"
                receiveAmount={receiveAmount}
                receiveCurrency={receiveCurrency}
                receiveUsdValue="$2650.00"
                receiveAddress={receiveAddress}
                rate="1 ETH = 1987.50 USDC"
                networkFee="$0.00"
                slippage="0%"
                onSwap={handleSwap}
              />
            ) : showQuote ? (
              <SwapQuoteView
                payAmount={payAmount}
                receiveAmount={receiveAmount}
                payCurrency={payCurrency}
                receiveCurrency={receiveCurrency}
                quoteTimer={quoteTimer}
                onAcceptQuote={handleAcceptQuote}
              />
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
                onPayCurrencyClick={() => {}}
                onReceiveCurrencyClick={() => {}}
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
