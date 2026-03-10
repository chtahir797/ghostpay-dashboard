"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";
import SendForm from "@/components/ghost-send/SendForm";
import AssetIcon from "@/components/common/dropdown/AssetIcon";
import LinkInput from "@/components/common/LinkInput";
import LogoIcon from "@/icons/LogoIcon";
import ArrowRightIcon from "@/icons/ArrowRightIcon";
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
        <main className=" flex flex-col gap-[20px]">
          {showSuccess ? (
            // Transaction Success View
            <div className="w-full max-w-[520px] mx-auto pt-[40px] flex flex-col gap-[24px] px-[25px] md:px-0">
              {/* Logo */}
              <div className="flex justify-center">
                <LogoIcon width={82} height={82} color='#EA7A2A'/>
              </div>

              {/* Success Message + Date */}
              <div className="flex flex-col gap-[4px] items-center">
                <p className="font-['Tomato_Grotesk'] font-bold text-[26px] leading-[34.5px] tracking-[-0.5px] text-[#ffffff]">
                  Sent Successfully
                </p>
                <p className="font-['Tomato_Grotesk'] font-bold text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                  {formatDate()}
                </p>
              </div>

              {/* Amount + Coin Name + Balance */}
              <div className="flex flex-col gap-[12px] items-center">
                <div className="flex items-baseline gap-[2px]">
                  <p className="font-['Tomato_Grotesk'] font-bold text-[36px] md:text-[48px] leading-[34px] md:leading-[46px] tracking-[-2px] text-[#ffffff]">
                    {amount}
                  </p>
                  {selectedAsset && (
                    <p className="font-['Tomato_Grotesk'] font-semibold text-[20px] md:text-[24px] leading-[18px] md:leading-[22px] tracking-0 text-[#808080]">
                      {selectedAsset.symbol}
                    </p>
                  )}
                </div>
                <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[21px] tracking-0 text-[#808080]">
                  $2424.61 USD
                </p>
              </div>

              {/* Information Section */}
              <div className="flex flex-col gap-[12px] max-w-[480px] mx-auto w-full">
                <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] overflow-hidden">
                  {/* To Section */}
                  {recipient && (
                    <div className="px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                      <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                        To
                      </p>
                      <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                        {formatAddress(recipient)}
                      </p>
                    </div>
                  )}

                  {/* Asset Section */}
                  {selectedAsset && (
                    <div className="px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                      <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                        Asset
                      </p>
                      <div className="flex items-center gap-[8px]">
                        <AssetIcon icon={selectedAsset.icon} size={20} />
                        <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                          {selectedAsset.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status Section */}
                  <div className="px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                      Status
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[8px] h-[8px] bg-[#FB923C] rounded-full"></div>
                      <p className="font-['Tomato_Grotesk'] font-semibold text-[13px] leading-[19.5px] tracking-0 text-[#FB923C]">
                        Confirmed
                      </p>
                    </div>
                  </div>

                  {/* Tx Hash Section */}
                  <div className="px-[10px] py-[12px] flex justify-between items-center">
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
                  <ArrowRightIcon width={12} height={12} color="#808080" className="rotate-320"/>
                </Link>
              </div>

              {/* Back to Home Button */}
              <Link href="/" className="w-full bg-[#FB923C] rounded-full py-[16px] px-[20px] hover:bg-[#EA7A2A] transition-colors text-center">
                <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                  Back to Home
                </span>
              </Link>
            </div>
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
