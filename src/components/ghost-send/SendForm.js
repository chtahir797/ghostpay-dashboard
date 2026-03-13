import React, { useState } from 'react';
import AssetSelector from '../common/dropdown/AssetSelector';
import AssetIcon from '../common/dropdown/AssetIcon';
import AssetSelectionModal from '../common/dropdown/AssetSelectionModal';
import ArrowDownIcon from '@/icons/ArrowDownIcon';

const SendForm = ({
  recipient,
  amount,
  usdValue,
  selectedAsset,
  assets,
  showAssetDropdown,
  onRecipientChange,
  onAmountChange,
  onToggleAssetDropdown,
  onSelectAsset,
  onSend,
}) => {
  const [showAssetModal, setShowAssetModal] = useState(false);

  const handleAssetModalOpen = () => {
    setShowAssetModal(true);
  };

  const handleAssetModalClose = () => {
    setShowAssetModal(false);
  };

  const handleAssetSelect = (asset) => {
    onSelectAsset(asset);
    handleAssetModalClose();
  };

  return (
    <>
      <div className="w-full max-w-[520px] mx-auto pt-[40px] flex flex-col gap-[20px]">
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
                onChange={(e) => onRecipientChange(e.target.value)}
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
                onChange={(e) => onAmountChange(e.target.value)}
                className="bg-transparent border-none outline-none font-['Tomato_Grotesk'] font-extrabold text-[48px] md:text-[64px] leading-[60px] md:leading-[80px] tracking-0 text-[#ffffff] w-full"
              />
              <button className="bg-[#222222] px-[12px] py-[6px] rounded-full transition-colors">
                <span className="font-['Tomato_Grotesk'] font-semibold text-[10px] leading-[16px] tracking-0 text-[#ffffff]">USDC</span>
              </button>
            </div>
            {usdValue && (
              <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[18px] tracking-0 text-[#808080]">
                {usdValue}
              </p>
            )}
          </div>
        </div>

        {/* Asset Balance Card - Desktop */}
        <div className="hidden md:block">
          <AssetSelector
            selectedAsset={selectedAsset}
            assets={assets}
            showDropdown={showAssetDropdown}
            onToggleDropdown={onToggleAssetDropdown}
            onSelectAsset={onSelectAsset}
          />
        </div>

        {/* Asset Balance Card - Mobile */}
        <div className="md:hidden">
          <AssetSelector
            selectedAsset={selectedAsset}
            assets={assets}
            showDropdown={showAssetDropdown}
            onToggleDropdown={handleAssetModalOpen}
            onSelectAsset={onSelectAsset}
          />
        </div>

        {/* Send Button - Desktop */}
        <button
          onClick={onSend}
          className="hidden md:block w-full bg-[#FB923C] rounded-full py-[16px] px-[20px] hover:bg-[#EA7A2A] transition-colors"
        >
          <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
            Send
          </span>
        </button>
      </div>

      {/* Send Button - Mobile Fixed - 24px above navigation bar */}
      <div className="md:hidden fixed bottom-[104px] left-0 right-0 px-[25px] z-40">
        <button
          onClick={onSend}
          className="w-full h-[60px] bg-[#FB923C] rounded-full hover:bg-[#EA7A2A] transition-colors flex items-center justify-center"
        >
          <span className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[24px] tracking-0 text-[#000000]">
            Send
          </span>
        </button>
      </div>

      {/* Asset Selection Modal - Mobile Only */}
      <AssetSelectionModal
        isOpen={showAssetModal}
        onClose={handleAssetModalClose}
        assets={assets}
        selectedAsset={selectedAsset}
        onSelectAsset={handleAssetSelect}
      />
    </>
  );
};

export default SendForm;

