"use client";

import { useState } from 'react';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";
import RecipientSearch from "@/components/ghost-pay/RecipientSearch";
import SendForm from "@/components/ghost-pay/SendForm";
import TransactionSuccess from "@/components/ghost-pay/TransactionSuccess";

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

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        <Header title="Ghost Send" subtitle="Send your money privately" />
        <main className="p-[10px] flex flex-col gap-[20px]">
          {showSuccess ? (
            <TransactionSuccess
              amount={amount}
              asset={selectedAsset}
              usdValue="$2424.61 USD"
              recipient={recipient}
              txHash="abcd......1234"
              date={formatDate()}
              onCopyTxHash={handleCopyTxHash}
            />
          ) : !showSendForm ? (
            <RecipientSearch
              recipient={recipient}
              onRecipientChange={setRecipient}
              onKeyDown={handleKeyDown}
              onPasteClick={handlePasteClick}
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
