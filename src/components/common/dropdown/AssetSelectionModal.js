import React, { useState, useEffect } from 'react';
import AssetIcon from './AssetIcon';

const AssetSelectionModal = ({ isOpen, onClose, assets, selectedAsset, onSelectAsset }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allAssets = assets.filter(a => !a.isPrimary);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] md:hidden"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-opacity-50" />

      {/* Modal */}
      <div className={`absolute bottom-0 left-0 right-0 bg-[#0B0B0B] border-t border-[#151515] rounded-t-[24px] flex flex-col animate-slide-up transition-all duration-300 ease-out ${
        isExpanded ? 'h-[90vh] max-h-[90vh]' : 'max-h-[60vh]'
      }`}>
        {/* Handle - Clickable */}
        <button
          onClick={handleToggleExpand}
          className="flex justify-center pt-[12px] pb-[8px] flex-shrink-0 w-full active:bg-[#0f0f0f] transition-colors"
        >
          <div className="w-[40px] h-[4px] bg-[#808080] bg-opacity-30 rounded-full" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between px-[20px] pb-[16px] border-b border-[#151515] flex-shrink-0">
          <h3 className="font-['Tomato_Grotesk'] font-bold text-[18px] leading-[24px] tracking-0 text-[#ffffff]">
            Select Asset
          </h3>
          <button
            onClick={onClose}
            className="p-[6px] hover:bg-[#222222] rounded-[8px] transition-colors active:bg-[#1a1a1a]"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#808080"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Asset List - Scrollable */}
        <div className={`flex-1 overflow-y-auto overscroll-contain px-[20px] py-[16px] min-h-0 ${
          isExpanded ? 'max-h-[calc(90vh-100px)]' : 'max-h-[calc(60vh-100px)]'
        }`}>
          <div className="flex flex-col gap-[8px]">
            {allAssets.map((asset) => (
              <button
                key={`${asset.name}-${asset.symbol}`}
                onClick={() => {
                  onSelectAsset(asset);
                  onClose();
                }}
                className={`flex items-center justify-between p-[16px] rounded-[12px] transition-colors flex-shrink-0 ${
                  selectedAsset.name === asset.name
                    ? 'bg-[#151515] border border-[#222222]'
                    : 'bg-transparent active:bg-[#0f0f0f]'
                }`}
              >
                <div className="flex items-center gap-[12px]">
                  <AssetIcon icon={asset.icon} size={40} />
                  <div className="flex flex-col items-start gap-[4px]">
                    <p className="font-['Tomato_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-0 text-[#ffffff]">
                      {asset.name}
                    </p>
                    <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
                      {asset.symbol}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-[4px]">
                  <p className="font-['Tomato_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-0 text-[#ffffff]">
                    {asset.balance}
                  </p>
                  <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 text-[#808080]">
                    {asset.value}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetSelectionModal;

