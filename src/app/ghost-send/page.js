"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";
import SendForm from "@/components/ghost-send/SendForm";
import LinkInput from "@/components/common/LinkInput";
import TransactionSuccessView from "@/components/common/TransactionSuccessView";
import { ChevronLeftIcon, X } from 'lucide-react';

const assets = [
  { name: 'Ethereum', symbol: 'ETH', balance: '1.4952', value: '$17.79', icon: 'eth', isPrimary: true },
  { name: 'Ethereum', symbol: 'ETH', balance: '0.006714', value: '$17.79', icon: 'eth' },
  { name: 'Solana', symbol: 'SOL', balance: '1.42', value: '$210.16', icon: 'sol' },
  { name: 'USDC', symbol: 'SOL', balance: '42.5', value: '$42.50', icon: 'usdc' },
  { name: 'USDT', symbol: 'SOL', balance: '15', value: '$15.00', icon: 'usdt' },
  { name: 'USD1', symbol: 'SOL', balance: '100', value: '$100.00', icon: 'usd1' },
];

export default function GhostPay() {
  const [showSendForm, setShowSendForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('1.25');
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets.find(a => a.isPrimary) || assets[0]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && recipient.trim()) {
      setShowSendForm(true);
    }
  };

  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRecipient(text);
      setShowSendForm(true);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      setShowSendForm(true);
    }
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setShowAssetDropdown(false);
  };

  const handleSend = () => {
    setShowSuccess(true);
  };

  const formatDate = () => {
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
    const formattedHours = hours.toString().padStart(2, '0');
    return `${month} ${day}, ${year}, ${formattedHours}:${minutes} ${ampm}`;
  };

  const handleCopyTxHash = (txHash) => {
    navigator.clipboard.writeText(txHash);
  };

  const formatAddress = (address) => {
    if (!address) return 'abod......1234';
    if (address.length <= 12) return address;
    return `${address.slice(0, 4)}......${address.slice(-4)}`;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        <header className='hidden md:block'>
        <Header title="Ghost Send" subtitle="Send your money privately" />
        </header>
        {/* Conditional Header */}
        {showSuccess ? (
          <header className="md:hidden py-[23px] px-[25px] border-b border-[#151515] flex items-center justify-between gap-[10px]">
            <h1 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[36px] tracking-[-0.5px] text-[#ffffff]">
              Send Complete
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
              Ghost Send
            </h1>
          </header>
        )}
        <main className="flex flex-col gap-[20px] px-[25px] pb-[100px] md:pb-0">
          {showSuccess ? (
            // Transaction Success View
            <TransactionSuccessView
              title="Sent Successfully"
              amount={amount}
              asset={selectedAsset}
              usdValue="$2424.61 USD"
              logoColor="#EA7A2A"
              buttonColor="#FB923C"
              buttonHoverColor="#EA7A2A"
              statusColor="#FB923C"
              recipient={recipient}
              txHash="abcd......1234"
              onCopyTxHash={handleCopyTxHash}
              formatAddress={formatAddress}
              formatTimestamp={formatDate}
            />
          ) : !showSendForm ? (
            <LinkInput
              label="Recipient"
              placeholder="Enter wallet address"
              pasteCardTitle="Paste from clipboard"
              pasteCardDescription="Paste Copied Wallet address"
              value={recipient}
              onChange={setRecipient}
              onKeyDown={handleKeyDown}
              onPasteClick={handlePasteClick}
              color="#FB923C"
              showLogo={false}
            />
          ) : (
            <SendForm
              recipient={recipient}
              amount={amount}
              usdValue="$2424.61 USD"
              selectedAsset={selectedAsset}
              assets={assets}
              showAssetDropdown={showAssetDropdown}
              onRecipientChange={setRecipient}
              onAmountChange={setAmount}
              onToggleAssetDropdown={() => setShowAssetDropdown(!showAssetDropdown)}
              onSelectAsset={handleAssetSelect}
              onSend={handleSend}
            />
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
