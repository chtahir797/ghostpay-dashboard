"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";
import AssetSelector from '@/components/common/dropdown/AssetSelector';
import AssetSelectionModal from '@/components/common/dropdown/AssetSelectionModal';
import AssetIcon from '@/components/common/dropdown/AssetIcon';
import ArrowDownIcon from '@/icons/ArrowDownIcon';
import { ArrowRightIcon, ChevronLeftIcon, Delete, DeleteIcon, Info, PlusIcon, Trash, X } from 'lucide-react';
import TrashIcon from '@/icons/TrashIcon';
import LogoIcon from '@/icons/LogoIcon';

const assets = [
  { name: 'Ethereum', symbol: 'ETH', balance: '1.4952', value: '$17.79', icon: 'eth', isPrimary: true },
  { name: 'Ethereum', symbol: 'ETH', balance: '0.006714', value: '$17.79', icon: 'eth' },
  { name: 'Solana', symbol: 'SOL', balance: '1.42', value: '$210.16', icon: 'sol' },
  { name: 'USDC', symbol: 'USDC', balance: '42.5', value: '$42.50', icon: 'usdc' },
  { name: 'USDT', symbol: 'USDT', balance: '15', value: '$15.00', icon: 'usdt' },
  { name: 'USD1', symbol: 'USD1', balance: '100', value: '$100.00', icon: 'usd1' },
];

export default function GhostRoute() {
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets.find(a => a.isPrimary) || assets[0]);
  const [wallets, setWallets] = useState([
    { id: 1, address: '', amount: '0.00', currency: 'USDC' }
  ]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const maxWallets = 5;

  const handleAssetModalOpen = () => {
    setShowAssetDropdown(true);
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setShowAssetDropdown(false);
  };

  const handleAssetModalClose = () => {
    setShowAssetDropdown(false);
  };

  const handleAddWallet = () => {
    if (wallets.length < maxWallets) {
      setWallets([...wallets, {
        id: Date.now(),
        address: '',
        amount: '0.00',
        currency: 'USDC'
      }]);
    }
  };

  const handleRemoveWallet = (id) => {
    setWallets(wallets.filter(wallet => wallet.id !== id));
  };

  const handleWalletChange = (id, field, value) => {
    setWallets(wallets.map(wallet =>
      wallet.id === id ? { ...wallet, [field]: value } : wallet
    ));
  };

  const calculateTotal = () => {
    const total = wallets.reduce((sum, wallet) => {
      return sum + parseFloat(wallet.amount || 0);
    }, 0);
    return total.toFixed(2);
  };

  const totalUsd = calculateTotal();

  const handleRouteFunds = () => {
    if (!showConfirm) {
      setShowConfirm(true);
    } else {
      // Handle actual routing logic here
      setIsComplete(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header title="Ghost Route" subtitle="Route your money privately" />
        </div>

        {/* Conditional Mobile Header */}
        {isComplete ? (
          <header className="md:hidden py-[23px] px-[25px] border-b border-[#151515] flex items-center justify-between gap-[10px]">
            <h1 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[36px] tracking-[-0.5px] text-[#ffffff]">
              Ghost Route Complete
            </h1>
            <button className="p-[6px] hover:bg-[#151515] rounded-[8px] transition-colors">
              <X width={18} height={18} color="#ffffff" />
            </button>
          </header>
        ) : (
          <header className="md:hidden py-[23px] px-[25px] border-b border-[#151515] flex items-center gap-[10px]">
            <button className="p-[6px] hover:bg-[#151515] rounded-[8px] transition-colors">
              <ChevronLeftIcon width={18} height={18} color="#ffffff" />
            </button>
            <h1 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[36px] tracking-[-0.5px] text-[#ffffff]">
              Ghost Route
            </h1>
          </header>
        )}

        <main className="md:p-[20px] p-[25px] pb-[160px] md:pb-[20px] w-full md:max-w-[520px] mx-auto flex flex-col gap-[20px]">
          {/* Desktop View */}
          {!isComplete && (
            <div className="hidden md:flex pt-[40px] flex-col gap-[24px]">
              {/* Source Asset Selector */}
              <div className="flex flex-col gap-[8px]">
                <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[15px] tracking-0 text-[#808080]">
                  Source Asset
                </p>
                <AssetSelector
                  selectedAsset={selectedAsset}
                  assets={assets}
                  showDropdown={showAssetDropdown}
                  onToggleDropdown={() => setShowAssetDropdown(!showAssetDropdown)}
                  onSelectAsset={handleAssetSelect}
                />
              </div>

              {/* Wallet Cards */}
              <div className="flex flex-col gap-[16px]">
                {wallets.map((wallet, index) => (
                  <div key={wallet.id} className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] px-[20px] py-[20px] flex flex-col gap-[16px]">
                    {/* Wallet Header */}
                    <div className="flex items-center justify-between">
                      <p className="font-['Tomato_Grotesk'] font-medium text-[14px] leading-[15px] tracking-0 text-[#FB3C3C]">
                        Wallet {index + 1}
                      </p>
                      {wallets.length > 1 && (
                        <button
                          onClick={() => handleRemoveWallet(wallet.id)}
                          className="p-[4px] hover:bg-[#151515] rounded-[4px] transition-colors"
                        >
                          <TrashIcon width={18} height={18} color="#FB3C3C" />
                        </button>
                      )}
                    </div>

                    {/* Address Input */}
                    <div className="flex flex-col gap-[8px]">
                      <p className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[15px] tracking-0 text-[#808080]">
                        Wallet Address
                      </p>
                      <input
                        type="text"
                        placeholder="0x..."
                        value={wallet.address}
                        onChange={(e) => handleWalletChange(wallet.id, 'address', e.target.value)}
                        className="bg-[#000000] border border-[#151515] rounded-[10px] px-[16px] py-[12px] font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff] placeholder:text-[#808080] outline-none focus:border-[#333333] transition-colors"
                      />
                    </div>

                    {/* Amount Input */}
                    <div className="flex flex-col gap-[8px]">
                      <p className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[15px] tracking-0 text-[#808080]">
                        Amount
                      </p>
                      <div className="flex items-center gap-[12px]">
                        <input
                          type="text"
                          placeholder="0.00"
                          value={wallet.amount}
                          onChange={(e) => handleWalletChange(wallet.id, 'amount', e.target.value)}
                          className="flex-1 bg-[#000000] border border-[#151515] rounded-[10px] px-[16px] py-[12px] font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#ffffff] placeholder:text-[#808080] outline-none focus:border-[#333333] transition-colors"
                        />
                        <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] tracking-0 text-[#808080]">
                          {wallet.currency}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Wallet Button */}
                {wallets.length < maxWallets && (
                  <button
                    onClick={handleAddWallet}
                    className="bg-transparent border border-dashed border-[#fb3c3c25] rounded-[16px] p-[20px] flex items-center justify-center gap-[8px] hover:bg-[#FB3C3C10] transition-colors"
                  >
                    <PlusIcon width={20} height={20} color="#FB3C3C" />
                    <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] tracking-0 text-[#FB3C3C]">
                      Add Wallet ({wallets.length}/{maxWallets})
                    </p>
                  </button>
                )}

                {/* Total Card */}
                <div className={`${showConfirm ? 'bg-[#0B0B0B] border-[#151515]' : 'bg-[#fb3c3f06] border-[#fb3c3f14]'} border rounded-[16px] p-[16px] flex justify-between items-center transition-colors`}>
                  <p className="font-['Tomato_Grotesk'] font-bold text-[18px] leading-[24px] tracking-0 text-[#ffffff]">
                    Total
                  </p>
                  <div className="flex flex-col items-end gap-[4px]">
                    <p className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[22px] tracking-0 text-[#ffffff]">
                      {totalUsd} USDC
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
                      ${totalUsd} USD
                    </p>
                  </div>
                </div>

                {/* Info Div - Show when confirm is clicked */}
                {showConfirm && (
                  <div className="w-full bg-[#fb3c3f04] border border-[#fb3c3f14] rounded-[12px] p-[12px] flex gap-[12px] items-start">
                    <Info width={20} height={20} color="#FB3C3C" />
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#FB3C3C]">
                      This action is irreversible. Funds will be routed and sent to all wallets simultaneously.
                    </p>
                  </div>
                )}

                {/* Route Funds Button */}
                <button
                  onClick={handleRouteFunds}
                  className="w-full bg-[#FB3C3C] rounded-full py-[16px] px-[20px] hover:bg-[#EA2A2A] transition-colors"
                >
                  <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                    {showConfirm ? 'Confirm & Route' : 'Route Funds'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Desktop Complete View */}
          {isComplete && (
            <div className="hidden md:flex pt-[40px] flex-col items-center gap-[24px]">
              {/* Logo and Description */}
              <div className="flex flex-col items-center gap-[12px] pb-[24px]">
                <LogoIcon size={82} color="#FB3C3C" />
                <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080] text-center">
                  Split to {wallets.length} wallet{wallets.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex flex-col items-center gap-[8px]">
                <p className="flex gap-1 items-baseline font-['Tomato_Grotesk']">
                  <span className="text-[#ffffff] font-bold text-[48px] leading-[56px] tracking-[0px]">11</span>
                  <span className="text-[#808080] font-bold text-[24px] leading-[28px] tracking-[-2px]">USDC</span>
                </p>
                <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080] text-center pt-[4px]">
                  $11 USDC
                </p>
              </div>

              {/* Transaction Details Table */}
              <div className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] overflow-hidden">
                <div className="px-[16px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                    Wallet
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                    0xxxxxxxxxx1234
                  </p>
                </div>
                <div className="px-[16px] py-[12px] flex justify-between items-center">
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                    Amount
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                    11.00 USDC
                  </p>
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
                className="w-full bg-[#FB3C3C] rounded-full py-[16px] px-[20px] hover:bg-[#EA2A2A] transition-colors text-center"
              >
                <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                  Back to Home
                </span>
              </Link>
            </div>
          )}

          {/* Mobile View */}
          {isComplete ? (
            // Mobile Completion View
            <div className="md:hidden w-full mx-auto flex flex-col items-center gap-[24px] pt-[40px]">
              {/* Logo and Description */}
              <div className="flex flex-col items-center gap-[12px] pb-[24px]">
                <LogoIcon size={82} color="#FB3C3F" />
                <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080] text-center">
                  Split to {wallets.length} wallet{wallets.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className='flex flex-col items-center gap-[8px]'>
                <p className="flex gap-1 items-baseline font-['Tomato_Grotesk']"><span className='text-[#ffffff] font-bold text-[46px] leading-[96px] tracking-[0px]'>11</span> <span className=' text-[#808080] font-bold text-[22px] leading-[22px] tracking-[-2px]'>USDC</span></p>
                <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080] text-center pt-[4px]">
                  $11 USDC
                </p>
              </div>

              {/* Transaction Details Table */}
              <div className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] overflow-hidden">
                <div className="px-[16px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                    Wallet
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                    0xxxxxxxxxx1234
                  </p>
                </div>
                <div className="px-[16px] py-[12px] flex justify-between items-center border-b border-[#151515]">
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                    Amount
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                    11.00 USDC
                  </p>
                </div>


              </div>

              {/* View on Explorer Link */}
              <Link href="#" className="flex items-center gap-[4px] justify-center">
                <span className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080] hover:text-[#ffffff] transition-colors">
                  View on Explorer
                </span>
                <ArrowRightIcon width={12} height={12} color="#808080" className="rotate-320" />
              </Link>
            </div>
          ) : (
            // Mobile Form View
            <div className="md:hidden flex flex-col gap-[20px] w-full">
              <div className="">
                <AssetSelector
                  selectedAsset={selectedAsset}
                  assets={assets}
                  showDropdown={false}
                  onToggleDropdown={handleAssetModalOpen}
                  onSelectAsset={handleAssetSelect}
                />
              </div>
              {/* Wallet Cards */}
              {wallets.map((wallet, index) => (
                <div key={wallet.id} className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] px-[17px] py-[15px] flex flex-col gap-[12px]">
                  {/* Wallet Header */}
                  <div className="flex items-center justify-between">
                    <p className="font-['Tomato_Grotesk'] font-medium text-[14px] leading-[15px] tracking-0 text-[#FB3C3F]">
                      Wallet {index + 1}
                    </p>
                    {wallets.length > 1 && (
                      <button
                        onClick={() => handleRemoveWallet(wallet.id)}
                        className="p-[4px] hover:bg-[#151515] rounded-[4px] transition-colors"
                      >
                        <TrashIcon width={18} height={18} color="#FB3C3F" />
                      </button>
                    )}
                  </div>

                  {/* Address Input */}
                  <input
                    type="text"
                    placeholder="Wallet address (0x...)"
                    value={wallet.address}
                    onChange={(e) => handleWalletChange(wallet.id, 'address', e.target.value)}
                    className="bg-[#000000] border border-[#151515] rounded-[10px] px-[12px] py-[15px] font-['Tomato_Grotesk'] font-normal text-[13px] leading-[17px] tracking-0 text-[#ffffff] placeholder:text-[#808080] outline-none focus:border-[#333333] transition-colors"
                  />

                  {/* Amount Input */}
                  <div className="flex items-center gap-[8px]">
                    <input
                      type="text"
                      placeholder="0.00"
                      value={wallet.amount}
                      onChange={(e) => handleWalletChange(wallet.id, 'amount', e.target.value)}
                      className="flex-1 bg-[#000000] border border-[#151515] rounded-[10px] px-[12px] py-[15px] font-['Tomato_Grotesk'] font-normal text-[13px] leading-[17px] tracking-0 text-[#ffffff] placeholder:text-[#808080] outline-none focus:border-[#333333] transition-colors"
                    />

                    <p className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[18px] tracking-0 text-[#808080]">
                      {wallet.currency}
                    </p>

                  </div>
                </div>
              ))}

              {/* Add Wallet Button */}
              {wallets.length < maxWallets && (
                <button
                  onClick={handleAddWallet}
                  className="bg-transparent border border-dashed border-[#fb3c3c25] rounded-[16px] p-[16px] flex items-center justify-center gap-[8px] hover:bg-[#FB3C3C10] transition-colors"
                >
                  <div className="w-[20px] h-[20px] flex items-center justify-center">
                    <PlusIcon width={20} height={20} color="#FB3C3C" />
                  </div>
                  <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] tracking-0 text-[#FB3C3C]">
                    Add Wallet ({wallets.length}/{maxWallets})
                  </p>
                </button>
              )}

              {/* Total Card */}
              <div className={`${showConfirm ? 'bg-[#0B0B0B] border-[#151515]' : 'bg-[#fb3c3f06] border-[#fb3c3f14]'} border rounded-[12px] p-[10px] flex justify-between items-center transition-colors`}>
                <p className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[18.6px] tracking-0 text-[#ffffff]">
                  Total
                </p>
                <div className="flex flex-col gap-[4px]">
                  <p className="font-['Tomato_Grotesk'] font-bold text-[12px] leading-[18px] tracking-0 text-[#ffffff]">
                    {totalUsd} USDC
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18px] tracking-0 text-[#808080] opacity-70">
                    ${totalUsd} USD
                  </p>
                </div>
              </div>

              {/* Info Div - Show when confirm is clicked */}
              {showConfirm && (
                <div className="w-full bg-[#fb3c3f04] border border-[#fb3c3f14] rounded-[12px] p-[10px] flex gap-2 items-start">
                  <div>
                    <Info width={16} height={16} color="#FB3C3F" />
                  </div>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18px] tracking-0 text-[#FB3C3F]">
                    This action is irreversible. Funds will be routed and sent to all wallets simultaneously.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Route Funds Button - Fixed at bottom above navigation */}
        <div className="md:hidden fixed bottom-[90px] left-0 right-0 px-[25px] pb-[20px] z-40">
          {isComplete ? (
            <Link
              href="/"
              className="w-full h-[60px] bg-[#FB3C3F] rounded-full hover:bg-[#EA2A2A] transition-colors flex items-center justify-center"
            >
              <span className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[24px] tracking-0 text-[#000000]">
                Back to Home
              </span>
            </Link>
          ) : (
            <button
              onClick={handleRouteFunds}
              className="w-full h-[60px] bg-[#FB3C3F] rounded-full hover:bg-[#EA2A2A] transition-colors flex items-center justify-center"
            >
              <span className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[24px] tracking-0 text-[#000000]">
                {showConfirm ? 'Confirm & Route' : 'Route Funds'}
              </span>
            </button>
          )}
        </div>

      </div>
      <AssetSelectionModal
        isOpen={showAssetDropdown}
        onClose={handleAssetModalClose}
        assets={assets}
        selectedAsset={selectedAsset}
        onSelectAsset={handleAssetSelect}
      />
    </DashboardLayout>
  );
}
