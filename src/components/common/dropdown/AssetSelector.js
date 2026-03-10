import React from 'react';
import AssetIcon from './AssetIcon';
import ArrowDownIcon from '@/icons/ArrowDownIcon';

const AssetSelector = ({ 
  selectedAsset, 
  assets, 
  showDropdown, 
  onToggleDropdown, 
  onSelectAsset,
  onUseMax 
}) => {
  const filteredAssets = assets.filter(a => !a.isPrimary);

  return (
    <div className="flex flex-col gap-[8px] relative">
      <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[12px]">
        <div className="flex items-center justify-between">
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
          <button 
            onClick={onToggleDropdown}
            className="flex items-center gap-[4px]"
          >
            <span className="bg-[#222222] px-[12px] py-[6px] rounded-full font-['Tomato_Grotesk'] font-semibold text-[10px] leading-[16px] tracking-0 text-[#ffffff]">
              Use Max
            </span>
            <ArrowDownIcon width={12} height={12} color="#808080" />
          </button>
        </div>
      </div>

      {/* Asset List - Appears below card */}
      {showDropdown && (
        <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[12px] flex flex-col gap-[4px] absolute w-full top-[100%] mt-[8px] z-10">
          {filteredAssets.map((asset) => (
            <button
              key={`${asset.name}-${asset.symbol}`}
              onClick={() => onSelectAsset(asset)}
              className={`flex items-center justify-between p-[12px] rounded-[12px] hover:bg-[#050606] transition-colors ${
                selectedAsset.name === asset.name ? 'bg-[#050606]' : ''
              }`}
            >
              <div className="flex items-center gap-[12px]">
                <AssetIcon icon={asset.icon} size={32} />
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
  );
};

export default AssetSelector;

