"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";
import SearchIcon from "@/icons/SearchIcon";
import ClipboardIcon from "@/icons/ClipboardIcon";
import ArrowDownIcon from "@/icons/ArrowDownIcon";
import ArrowRightIcon from "@/icons/ArrowRightIcon";

const assets = [
  { name: 'Ethereum', symbol: 'ETH', balance: '1.4952', value: '$17.79', icon: 'eth', isPrimary: true },
  { name: 'Ethereum', symbol: 'ETH', balance: '0.006714', value: '$17.79', icon: 'eth' },
  { name: 'Solana', symbol: 'SOL', balance: '1.42', value: '$210.16', icon: 'sol' },
  { name: 'USDC', symbol: 'SOL', balance: '42.5', value: '$42.50', icon: 'usdc' },
  { name: 'USDT', symbol: 'SOL', balance: '15', value: '$15.00', icon: 'usdt' },
  { name: 'USD1', symbol: 'SOL', balance: '100', value: '$100.00', icon: 'usd1' },
];

export default function GhostSend() {
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

  const formatAddress = (address) => {
    if (!address) return 'abod......1234';
    if (address.length <= 12) return address;
    return `${address.slice(0, 4)}......${address.slice(-4)}`;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        <Header title={showSuccess ? "Ghost Send" : "Send"} subtitle={showSuccess ? "Send your money privately" : "money privately"} />
        <main className="p-[10px] flex flex-col gap-[20px]">
          {showSuccess ? (
            /* Success Component */
            <div className="w-[520px] mx-auto pt-[40px] flex flex-col gap-[24px]">
              {/* Logo */}
              <div className="flex justify-center">
                <Image src="/Logo.png" alt="Ghost Logo" width={82} height={82} />
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
                  <p className="font-['Tomato_Grotesk'] font-bold text-[48px] leading-[46px] tracking-[-2px] text-[#ffffff]">
                    {amount}
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-semibold text-[24px] leading-[22px] tracking-0 text-[#808080]">
                    {selectedAsset.symbol}
                  </p>
                </div>
                <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[21px] tracking-0 text-[#808080]">
                  $2424.61 USD
                </p>
              </div>

              {/* Information Section */}
              <div className="flex flex-col gap-[12px] max-w-[480px] mx-auto w-full">
                <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] overflow-hidden">
                  {/* To Section */}
                  <div className=" px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                      To
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                      {formatAddress(recipient)}
                    </p>
                  </div>

                  {/* Asset Section */}
                  <div className="px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                    <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                      Asset
                    </p>
                    <div className="flex items-center gap-[8px]">
                      <div className={`w-[20px] h-[20px] rounded-[6px] flex items-center justify-center ${
                        selectedAsset.icon === 'eth' ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]' :
                        selectedAsset.icon === 'sol' ? 'bg-gradient-to-br from-[#9945FF] to-[#14F195]' :
                        selectedAsset.icon === 'usdc' ? 'bg-[#2775CA]' :
                        selectedAsset.icon === 'usdt' ? 'bg-[#26A17B]' :
                        'bg-gradient-to-br from-[#FFD700] to-[#FFA500]'
                      }`}>
                        {selectedAsset.icon === 'eth' && (
                          <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2L3 7L10 12L17 7L10 2Z" fill="white" opacity="0.9"/>
                            <path d="M3 7L10 12L10 18L3 13V7Z" fill="white" opacity="0.6"/>
                            <path d="M17 7L10 12L10 18L17 13V7Z" fill="white" opacity="0.8"/>
                          </svg>
                        )}
                        {selectedAsset.icon === 'sol' && (
                          <span className="text-white font-bold text-[10px]">S</span>
                        )}
                        {selectedAsset.icon === 'usdc' && (
                          <span className="text-white font-bold text-[10px]">$</span>
                        )}
                        {selectedAsset.icon === 'usdt' && (
                          <span className="text-white font-bold text-[10px]">T</span>
                        )}
                        {selectedAsset.icon === 'usd1' && (
                          <span className="text-white font-bold text-[10px]">1</span>
                        )}
                      </div>
                      <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                        {selectedAsset.name}
                      </p>
                    </div>
                  </div>

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
                        abcd......1234
                      </p>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('abcd......1234');
                        }}
                        className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 bg-[#222222] py-[8px] px-[9px] rounded-[7px] border-[1px] border-[#808080]  transition-colors"
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
            /* Recipient Search Section */
            <div className="w-[520px] mx-auto pt-[40px] flex flex-col gap-[20px]">
              {/* Recipient Text */}
              <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[15px] tracking-0 text-[#808080]">
                Recipient
              </p>

              {/* Search Input */}
              <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] py-[20px] px-[16px] mb-[20px] hover:border-[#222] transition-colors">
                <div className="flex items-center gap-[8px]">
                  <SearchIcon width={20} height={20} color="#808080" />
                  <input
                    type="text"
                    placeholder="Enter wallet address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none font-['Tomato_Grotesk'] font-semibold text-[16px] tracking-0 text-[#808080] placeholder:text-[#808080]"
                  />
                </div>
              </div>

              {/* Paste Card */}
              <div 
                className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] py-[20px] px-[16px] cursor-pointer hover:border-[#222] transition-colors"
                onClick={handlePasteClick}
              >
                <div className="flex items-center gap-[12px]">
                  <ClipboardIcon width={32} height={32} color="#FB923C" />
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[21px] tracking-0 text-[#ffffff]">
                      Paste from clipboard
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[11px] leading-[16.5px] tracking-0 text-[#555555]">
                      Paste Copied Wallet address
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Send Form Section */
            <div className="w-[520px] mx-auto pt-[40px] flex flex-col gap-[20px]">
              {/* Recipient Field */}
              <div className="flex flex-col gap-[10px]">
                <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[15px] tracking-0 text-[#808080]">
                  Recipient
                </p>
                <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] py-[17px] px-[12px]">
                  <div className="flex items-center gap-[5.5px]">
                    <span className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[16px] tracking-0 text-[#808080]">TO</span>
                    <input
                      type="text"
                      value={recipient || "Taint McBalls"}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="flex-1 bg-[#222222] border-none outline-none py-[7px] px-[8px] rounded-[8px] font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[12px] tracking-0 text-[#ffffff]"
                    />
                  </div>
                </div>
              </div>

              {/* Amount Field */}
              <div className="flex flex-col gap-[10px]">
                <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[15px] tracking-0 text-[#808080]">
                  Amount
                </p>
                <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[20px]">
                  <div className="flex items-center justify-between mb-[12px]">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-transparent border-none outline-none font-['Tomato_Grotesk'] font-extrabold text-[64px] leading-[80px] tracking-0 text-[#ffffff] w-full"
                    />
                    <button className="bg-[#222222] px-[12px] py-[6px] rounded-full transition-colors">
                      <span className="font-['Tomato_Grotesk'] font-semibold text-[10px] leading-[16px] tracking-0 text-[#ffffff]">USDC</span>
                  
                    </button>
                  </div>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[18px] tracking-0 text-[#808080]">
                    $2424.61 USD
                  </p>
                </div>
              </div>

              {/* Asset Balance Card */}
              <div className="flex flex-col gap-[8px] relative">
                <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <div className={`w-[32px] h-[32px] rounded-[10px] flex items-center justify-center ${
                        selectedAsset.icon === 'eth' ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]' :
                        selectedAsset.icon === 'sol' ? 'bg-gradient-to-br from-[#9945FF] to-[#14F195]' :
                        selectedAsset.icon === 'usdc' ? 'bg-[#2775CA]' :
                        selectedAsset.icon === 'usdt' ? 'bg-[#26A17B]' :
                        'bg-gradient-to-br from-[#FFD700] to-[#FFA500]'
                      }`}>
                        {selectedAsset.icon === 'eth' && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2L3 7L10 12L17 7L10 2Z" fill="white" opacity="0.9"/>
                            <path d="M3 7L10 12L10 18L3 13V7Z" fill="white" opacity="0.6"/>
                            <path d="M17 7L10 12L10 18L17 13V7Z" fill="white" opacity="0.8"/>
                          </svg>
                        )}
                        {selectedAsset.icon === 'sol' && (
                          <span className="text-white font-bold text-[14px]">S</span>
                        )}
                        {selectedAsset.icon === 'usdc' && (
                          <span className="text-white font-bold text-[14px]">$</span>
                        )}
                        {selectedAsset.icon === 'usdt' && (
                          <span className="text-white font-bold text-[14px]">T</span>
                        )}
                        {selectedAsset.icon === 'usd1' && (
                          <span className="text-white font-bold text-[14px]">1</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
                          {selectedAsset.name}
                        </p>
                        <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[16px] tracking-0 text-[#808080]">
                          {selectedAsset.balance} {selectedAsset.symbol}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowAssetDropdown(!showAssetDropdown)}
                      className="flex items-center gap-[4px]"
                    >
                      <span className="bg-[#222222] px-[12px] py-[6px] rounded-full font-['Tomato_Grotesk'] font-semibold text-[10px] leading-[16px] tracking-0 text-[#ffffff]">Use Max</span>
                      <ArrowDownIcon width={12} height={12} color="#808080" />
                    </button>
                  </div>
            
                </div>

                {/* Asset List - Appears below card */}
                {showAssetDropdown && (
                  <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[12px] flex flex-col gap-[4px] absolute w-[-webkit-fill-available] top-[120%]">
                    {assets.filter(a => !a.isPrimary).map((asset) => (
                      <button
                        key={asset.name}
                        onClick={() => handleAssetSelect(asset)}
                        className={`flex items-center justify-between p-[12px] rounded-[12px] hover:bg-[#050606] transition-colors ${
                          selectedAsset.name === asset.name ? 'bg-[#050606]' : ''
                        }`}
                      >
                        <div className="flex items-center gap-[12px]">
                          <div className={`w-[32px] h-[32px] rounded-[10px] flex items-center justify-center ${
                            asset.icon === 'eth' ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]' :
                            asset.icon === 'sol' ? 'bg-gradient-to-br from-[#9945FF] to-[#14F195]' :
                            asset.icon === 'usdc' ? 'bg-[#2775CA]' :
                            asset.icon === 'usdt' ? 'bg-[#26A17B]' :
                            'bg-gradient-to-br from-[#FFD700] to-[#FFA500]'
                          }`}>
                            {asset.icon === 'eth' && (
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2L3 7L10 12L17 7L10 2Z" fill="white" opacity="0.9"/>
                                <path d="M3 7L10 12L10 18L3 13V7Z" fill="white" opacity="0.6"/>
                                <path d="M17 7L10 12L10 18L17 13V7Z" fill="white" opacity="0.8"/>
                              </svg>
                            )}
                            {asset.icon === 'sol' && (
                              <span className="text-white font-bold text-[14px]">S</span>
                            )}
                            {asset.icon === 'usdc' && (
                              <span className="text-white font-bold text-[14px]">$</span>
                            )}
                            {asset.icon === 'usdt' && (
                              <span className="text-white font-bold text-[14px]">T</span>
                            )}
                            {asset.icon === 'usd1' && (
                              <span className="text-white font-bold text-[14px]">1</span>
                            )}
                          </div>
                          <div className="flex flex-col items-start gap-[2px]">
                            <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
                              {asset.name}
                            </p>
                            <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[16px] tracking-0 text-[#555555]">
                              {asset.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-[2px]">
                          <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
                            {asset.balance}
                          </p>
                          <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[16px] tracking-0 text-[#555555]">
                            {asset.value}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Send Button */}
              <button 
                onClick={handleSend}
                className="w-full bg-[#FB923C] rounded-full py-[16px] px-[20px] hover:bg-[#EA7A2A] transition-colors"
              >
                <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                  Send
                </span>
              </button>
            </div>
          )}
        </main>
      </div>
    </DashboardLayout>
  );
}
