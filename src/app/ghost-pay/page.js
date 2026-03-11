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
import LogoIcon from '@/icons/LogoIcon';
import CopyIcon from '@/icons/CopyIcon';
import AssetSelector from '@/components/common/dropdown/AssetSelector';
import AssetSelectionModal from '@/components/common/dropdown/AssetSelectionModal';
import AssetIcon from '@/components/common/dropdown/AssetIcon';
import LinkInput from '@/components/common/LinkInput';
import NumericKeypad from '@/components/common/NumericKeypad';
import { CornerDownLeft, LinkIcon, ChevronLeftIcon, Check, Share2, MessageSquare, QrCode, MoreVertical, X } from 'lucide-react';
import ChatBubbleIcon from '@/icons/ChatBubbleIcon';
import MiniQRCodeIcon from '@/icons/MiniQRCodeIcon';
import MethodSelection from '@/components/common/MethodSelection';
import OneTimeAddressView from '@/components/common/OneTimeAddressView';
import TransactionSuccessView from '@/components/common/TransactionSuccessView';
import ClockIcon from '@/icons/ClockIcon';
import WalletIcon from '@/icons/WalletIcon';

const assets = [
  { name: 'Ethereum', symbol: 'ETH', balance: '1.4952', value: '$17.79', icon: 'eth', isPrimary: true },
  { name: 'Ethereum', symbol: 'ETH', balance: '0.006714', value: '$17.79', icon: 'eth' },
  { name: 'Solana', symbol: 'SOL', balance: '1.42', value: '$210.16', icon: 'sol' },
  { name: 'USDC', symbol: 'USDC', balance: '42.5', value: '$42.50', icon: 'usdc' },
  { name: 'USDT', symbol: 'USDT', balance: '15', value: '$15.00', icon: 'usdt' },
  { name: 'USD1', symbol: 'USD1', balance: '100', value: '$100.00', icon: 'usd1' },
];

export default function GhostPay() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showLinkCreated, setShowLinkCreated] = useState(false);
  const [showEnterLink, setShowEnterLink] = useState(false);
  const [showMethodSelection, setShowMethodSelection] = useState(false);
  const [showOneTimeAddress, setShowOneTimeAddress] = useState(false);
  const [showPaymentComplete, setShowPaymentComplete] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [ghostPayLink, setGhostPayLink] = useState('');
  const oneTimeAddress = '0x5c8dd25b28c8461ef210412b5b24f67dd40e918f';
  const [amount, setAmount] = useState('1.25');
  const [memo, setMemo] = useState('');
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets.find(a => a.isPrimary) || assets[0]);
  const [createdLink, setCreatedLink] = useState('ghostpay.io/ghostpay/1234567890abcdef');

  const handleCreateLinkClick = () => {
    setShowCreateForm(true);
  };

  const handleEnterLinkClick = () => {
    setShowEnterLink(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && ghostPayLink.trim()) {
      // Show method selection when Enter is pressed
      setShowMethodSelection(true);
    }
  };

  const handlePayViaWallet = () => {
    // Handle pay via wallet
    console.log('Pay via wallet');
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
    // Show payment complete screen
    setShowPaymentComplete(true);
    setShowOneTimeAddress(false);
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
    const formattedHours = hours.toString().padStart(2, '0');
    return `${month} ${day}, ${year}, ${formattedHours}:${minutes} ${ampm}`;
  };

  const formatAddress = (address) => {
    if (!address) return 'abcd......1234';
    if (address.length <= 12) return address;
    return `${address.slice(0, 4)}......${address.slice(-4)}`;
  };

  const handleCopyTxHash = (txHash) => {
    navigator.clipboard.writeText(txHash || 'abcd......1234');
  };

  const handleKeypadKeyPress = (value) => {
    if (amount === '0' || amount === '') {
      setAmount(value);
    } else {
      setAmount(amount + value);
    }
  };

  const handleKeypadBackspace = () => {
    if (amount.length > 0) {
      setAmount(amount.slice(0, -1));
    }
  };

  const handleKeypadDecimal = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.');
    }
  };

  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setGhostPayLink(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setShowAssetDropdown(false);
    setShowAssetModal(false);
  };

  const handleAssetModalOpen = () => {
    setShowAssetModal(true);
  };

  const handleCreateLink = () => {
    // Generate a random link ID
    const linkId = Math.random().toString(36).substring(2, 15).toUpperCase();
    setCreatedLink(`ghost.money/pay/${linkId}`);
    setShowLinkCreated(true);
  };

  const handleCreateAnother = () => {
    setShowLinkCreated(false);
    setShowCreateForm(true);
    setAmount('1.25');
    setMemo('');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(createdLink);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ghost Pay Link',
          text: `Pay ${amount} ${selectedAsset.symbol}`,
          url: `https://${createdLink}`,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      handleCopyLink();
    }
  };

  const calculateUSDValue = () => {
    const amountNum = parseFloat(amount) || 0;
    const priceNum = parseFloat(selectedAsset.value.replace('$', '')) || 0;
    return (amountNum * priceNum).toFixed(2);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header title="Ghost Pay" subtitle="Create links to get paid and pay via link" />
        </div>

        {/* Mobile Header */}
        {showPaymentComplete ? (
          <header className="md:hidden py-[23px] px-[25px] border-b border-[#151515] flex items-center justify-between gap-[10px]">
            <h1 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[36px] tracking-[-0.5px] text-[#ffffff]">
              Payment Complete
            </h1>
            <button
              onClick={() => setShowPaymentComplete(false)}
              className="p-[6px] hover:bg-[#151515] rounded-[8px] transition-colors"
            >
              <X width={18} height={18} color="#ffffff" />
            </button>
          </header>
        ) : showLinkCreated ? (
          <header className="md:hidden py-[23px] px-[25px] border-b border-[#151515] flex items-center gap-[10px]">
            <button
              onClick={() => setShowLinkCreated(false)}
              className="p-[6px] hover:bg-[#151515] rounded-[8px] transition-colors"
            >
              <ChevronLeftIcon width={18} height={18} color="#ffffff" />
            </button>
            <h1 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[36px] tracking-[-0.5px] text-[#ffffff]">
              Ghost Pay
            </h1>
          </header>
        ) : showCreateForm || showEnterLink || showMethodSelection || showOneTimeAddress ? (
          <header className="md:hidden py-[23px] px-[25px] border-b border-[#151515] flex items-center gap-[10px]">
            <button
              onClick={() => {
                setShowCreateForm(false);
                setShowEnterLink(false);
                setShowMethodSelection(false);
                setShowOneTimeAddress(false);
              }}
              className="p-[6px] hover:bg-[#151515] rounded-[8px] transition-colors"
            >
              <ChevronLeftIcon width={18} height={18} color="#ffffff" />
            </button>
            <h1 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[36px] tracking-[-0.5px] text-[#ffffff]">
              Ghost Pay
            </h1>
          </header>
        ) : null}

        <main className="flex flex-col gap-[20px] px-[25px]">
          {showPaymentComplete ? (
            // Payment Complete View
            <TransactionSuccessView
              title="Payment Complete"
              amount={amount}
              asset={selectedAsset}
              usdValue={`$${calculateUSDValue()} USD`}
              logoColor="#59FF96"
              buttonColor="#59FF96"
              buttonHoverColor="#4DE885"
              amountColor="#59FF96"
              statusColor="#59FF96"
              via="One-Time Address"
              txHash="abcd......1234"
              onCopyTxHash={handleCopyTxHash}
              formatAddress={formatAddress}
              formatTimestamp={formatTimestamp}
              maxWidth="352px"
            />
          ) : showOneTimeAddress ? (
            // One-Time Address View
            <OneTimeAddressView
              title="Send Via One-Time Address"
              subtitle="Send funds from your wallet to this one-time address to complete your transaction."
              address={oneTimeAddress}
              logoColor="#59FF96"
              buttonColor="#59FF96"
              buttonHoverColor="#4DE885"
              buttonText="I Sent"
              onCopy={handleCopyAddress}
              onConfirm={handleISent}
              copyButtonHoverColor="#59FF96"
              maxWidth="352px"
            />
          ) : showMethodSelection ? (
            // Method Selection Screen
            <MethodSelection
              title="Choose Method To Pay"
              subtitle="Choose the method you want to use to pay."
              logoColor="#59FF96"
              borderColor="#59FF96"
              methods={[
                {
                  icon: WalletIcon,
                  title: "Pay Via Wallet",
                  description: "Complete your payment by paying directly from your wallet.",
                  onClick: handlePayViaWallet,
                },
                {
                  icon: ClockIcon,
                  title: "Use One-Time Address",
                  description: "Pay by sending to a one time address",
                  onClick: handleOneTimeAddress,
                },
              ]}
            />
          ) : showEnterLink ? (
            // Enter Ghost Pay Link Screen
            <LinkInput
              label="Recipient"
              placeholder="Enter Ghost Pay link"
              pasteCardTitle="Paste from clipboard"
              pasteCardDescription="Paste copied Ghost Pay link"
              value={ghostPayLink}
              onChange={setGhostPayLink}
              onKeyDown={handleKeyDown}
              onPasteClick={handlePasteClick}
              color="#59FF96"
              showLogo={true}
            />
          ) : showLinkCreated ? (
            // Link Created Success Screen
            <div className="w-full max-w-[579px] mx-auto flex flex-col gap-[38px] pt-[40px] pb-[40px]">
              {/* Ghost Logo and Message */}
              <div className="flex flex-col items-center gap-[24px]">
                <LogoIcon size={82} color="#59FF96" />
                <div className="flex flex-col items-center gap-[4px]">
                  <h2 className="font-['Tomato_Grotesk'] font-bold text-[32px] leading-[34.5px] tracking-[-0.5px] text-[#ffffff]">
                    Payment Link Created
                  </h2>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[19.5px] tracking-0 text-[#808080]">
                    Share with anyone and get paid.
                  </p>
                </div>
                {/* Amount Display */}
                <div className="flex flex-col items-center gap-[12px]">
                  <div className="flex items-baseline gap-[4px]">
                    <span className="font-['Tomato_Grotesk'] font-bold text-[48px] leading-[46px] tracking-[-2px] text-[#ffffff]">
                      {amount}
                    </span>
                    <span className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[32px] tracking-0 text-[#ffffff]">
                      {selectedAsset.symbol}
                    </span>
                  </div>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[21px] tracking-0 text-[#808080]">
                    ${calculateUSDValue()} USD
                  </p>
                </div>
              </div>

              <div className='flex flex-col gap-[12px]'>


                {/* Payment Link Card */}
                <div className="bg-[#0B0B0B] border border-[#151515] rounded-[17px] px-[18px] py-[11px] flex flex-col gap-[12px]">
                  <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                    Payment Link
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[22px] tracking-0 text-[#ffffff] whitespace-nowrap">
                    {createdLink}
                  </p>
                  <button
                    onClick={handleCopyLink}
                    className="bg-[#222222] border border-[#151515] rounded-[11px] py-[14px] hover:bg-[#1a1a1a] transition-colors shrink-0 flex items-center justify-center gap-[4px]"
                  >
                    <CopyIcon width={16} height={16} stroke="#808080" />
                    <span className="font-['Tomato_Grotesk'] font-semibold text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                      Copy Link
                    </span>
                  </button>
                </div>

                {/* Share Options */}
                <div className="flex items-center justify-center gap-[8px]">
                  <button className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[12px] py-[12px] hover:bg-[#151515] transition-colors flex flex-col items-center gap-[4px]">
                    <ChatBubbleIcon width={24} height={24} color="#ffffff" />
                    <span className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#808080]">
                      Message
                    </span>
                  </button>
                  <button className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[12px] py-[12px] hover:bg-[#151515] transition-colors flex flex-col items-center gap-[4px]">
                    <MiniQRCodeIcon width={24} height={24} color="#fff" />
                    <span className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#808080]">
                      QR Code
                    </span>
                  </button>
                  <button className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[12px] py-[12px] hover:bg-[#151515] transition-colors flex flex-col items-center gap-[4px]">
                    <MoreVertical width={24} height={24} color="#808080" />
                    <span className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-white">
                      More
                    </span>
                  </button>
                </div>

                {/* Create Another Button */}
                <button
                  onClick={handleCreateAnother}
                  className="w-full bg-[#0B0B0B] border border-[#151515] rounded-full py-[18px] hover:bg-[#151515] transition-colors"
                >
                  <span className="font-['Tomato_Grotesk'] font-bold text-[14px] leading-[21px] tracking-0 text-[#ffffff]">
                    Create Another
                  </span>
                </button>
              </div>
            </div>
          ) : showCreateForm ? (
            // Create Link Form
            <div className="w-full max-w-[520px] mx-auto flex flex-col gap-[24px] pt-[40px] pb-[40px]">
              {/* Amount Section */}
              <div className="flex flex-col gap-[8px]">
                <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[15px] tracking-0 text-[#808080]">
                  Amount
                </p>
                <div 
                  className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[20px] flex flex-col gap-[8px]"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                      setShowKeypad(true);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onFocus={() => {
                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                          setShowKeypad(true);
                        }
                      }}
                      readOnly={typeof window !== 'undefined' && window.innerWidth < 768}
                      className="w-full font-['Tomato_Grotesk'] font-bold text-[48px] md:text-[60px] leading-[48px] md:leading-[60px] tracking-0 text-[#ffffff] bg-transparent border-none outline-none flex-1 cursor-pointer md:cursor-text"
                      placeholder="0.00"
                    />
                    <button className="bg-[#222222] rounded-[18px] px-[12px] py-[6px] hover:border-[#151515] transition-colors font-['Tomato_Grotesk'] font-semibold text-[10px] leading-[16px] tracking-0 text-[#ffffff]">
                      {selectedAsset.symbol}
                    </button>
                  </div>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[21px] tracking-0 text-[#808080]">
                    ${calculateUSDValue()} USD
                  </p>
                </div>
              </div>

              {/* Currency Selection */}
              <div className="flex flex-col gap-[8px]">
                {/* Desktop: AssetSelector */}
                <div className="hidden md:block">
                  <AssetSelector
                    selectedAsset={selectedAsset}
                    assets={assets}
                    showDropdown={showAssetDropdown}
                    onToggleDropdown={() => setShowAssetDropdown(!showAssetDropdown)}
                    onSelectAsset={handleAssetSelect}
                  />
                </div>

                {/* Mobile: Asset Selection Button */}
                <div className="md:hidden">
                  <button
                    onClick={handleAssetModalOpen}
                    className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[12px] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-[12px]">
                      <AssetIcon icon={selectedAsset.icon} size={32} />
                      <div className="flex flex-col gap-[2px]">
                        <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] tracking-0 text-[#ffffff]">
                          {selectedAsset.name}
                        </p>
                        <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[16px] tracking-0 text-[#808080]">
                          {selectedAsset.balance} {selectedAsset.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <span className="bg-[#222222] px-[12px] py-[6px] rounded-full font-['Tomato_Grotesk'] font-semibold text-[10px] leading-[16px] tracking-0 text-[#ffffff]">
                        Use Max
                      </span>
                      <ArrowDownIcon width={12} height={12} color="#808080" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Mobile Asset Selection Modal */}
              <AssetSelectionModal
                isOpen={showAssetModal}
                onClose={() => setShowAssetModal(false)}
                assets={assets}
                selectedAsset={selectedAsset}
                onSelectAsset={handleAssetSelect}
              />

              {/* Memo Section */}
              <div className="flex flex-col gap-[8px]">
                <p className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[15px] tracking-0 text-[#808080]">
                  Memo
                </p>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="Enter memo (optional)"
                  className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] px-[16px] py-[16px] font-['Tomato_Grotesk'] font-normal text-[16px] leading-[24px] tracking-0 text-[#ffffff] placeholder:text-[#808080] outline-none focus:border-[#222] transition-colors"
                />
              </div>

              {/* Mobile Numeric Keypad */}
              {showKeypad && (
                <div className="md:hidden">
                  <NumericKeypad
                    onKeyPress={handleKeypadKeyPress}
                    onBackspace={handleKeypadBackspace}
                    onDecimal={handleKeypadDecimal}
                  />
                </div>
              )}

              {/* Create Link Button */}
              <button
                onClick={handleCreateLink}
                className="w-full bg-[#59FF96] rounded-full py-[16px] px-[20px] hover:bg-[#4FE885] transition-colors"
              >
                <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
                  Generate Link
                </span>
              </button>
            </div>
          ) : (
            // Initial Screen


            <MethodSelection
              title=" Ghost Pay"
              subtitle="Request crypto payments with a shareable link. Pay with /qr, wallet, or a one-time stealth address."
              logoColor="#59FF96"
              borderColor="#59FF96"
              methods={[
                {
                  icon: LinkIcon,
                  title: "Create a Ghost Pay Link",
                  description: "Set an amount and share a link to request payment from anyone.",
                  onClick: handleCreateLinkClick,
                },
                {
                  icon: CornerDownLeft,
                  title: "Enter Ghost Pay Link",
                  description: "Scan QR, pay from wallet, or generate a one-time stealth address.",
                  onClick: handleEnterLinkClick,
                },
              ]}
            />
          )}
        </main>
      </div>

    </DashboardLayout>
  );
}
