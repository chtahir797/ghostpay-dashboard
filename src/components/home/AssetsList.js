import React from 'react';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

const AssetsList = ({ assets, onSeeAll }) => {
  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-[#59FF96]';
    if (change.startsWith('-')) return 'text-[#FB3C3C]';
    return 'text-[#808080]';
  };

  return (
    <div className="flex-1 flex flex-col gap-[15px]">
      <div className="flex justify-between items-center">
        <h3 className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[22px] tracking-0 text-[#ffffff]">
          Assets
        </h3>
        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="flex items-center gap-[4px] cursor-pointer hover:opacity-70 transition-opacity"
          >
            <span className="font-['Tomato_Grotesk'] font-medium text-[12px] leading-[18px] tracking-0 text-[#808080]">
              See all
            </span>
            <ArrowRightIcon width={12} height={12} color="#808080" />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-[6px]">
        {assets.map((asset) => (
          <div
            key={asset.name}
            className="bg-[#0B0B0B] border border-[#151515] rounded-[12px] p-[15px] flex justify-between items-center hover:bg-[#0D0D0D] transition-colors"
          >
            <div className="flex items-center gap-[8px]">
              <div className="w-[36px] h-[36px] bg-[#151515] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                {asset.icon ? (
                  <img
                    src={asset.icon}
                    alt={asset.name}
                    className="w-[20px] h-[20px] object-contain opacity-80"
                  />
                ) : (
                  <div className="w-[20px] h-[20px] bg-[#808080] rounded-full"></div>
                )}
              </div>
              <div className="flex flex-col gap-[4px] min-w-0">
                <span className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] text-white truncate">
                  {asset.name}
                </span>
                <span className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[16px] text-[#808080] truncate">
                  {asset.balance}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-[4px] flex-shrink-0 ml-2">
              <span className="font-['Tomato_Grotesk'] font-semibold text-[14px] leading-[20px] text-white">
                {asset.price}
              </span>
              <span className={`font-['Tomato_Grotesk'] font-normal text-[12px] leading-[16px] ${getChangeColor(asset.change)}`}>
                {asset.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsList;

