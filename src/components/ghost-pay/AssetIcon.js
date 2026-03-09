import React from 'react';

const AssetIcon = ({ icon, size = 20 }) => {
  const getIconBg = (iconType) => {
    switch (iconType) {
      case 'eth':
        return 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]';
      case 'sol':
        return 'bg-gradient-to-br from-[#9945FF] to-[#14F195]';
      case 'usdc':
        return 'bg-[#2775CA]';
      case 'usdt':
        return 'bg-[#26A17B]';
      default:
        return 'bg-gradient-to-br from-[#FFD700] to-[#FFA500]';
    }
  };

  const renderIcon = () => {
    switch (icon) {
      case 'eth':
        return (
          <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2L3 7L10 12L17 7L10 2Z" fill="white" opacity="0.9"/>
            <path d="M3 7L10 12L10 18L3 13V7Z" fill="white" opacity="0.6"/>
            <path d="M17 7L10 12L10 18L17 13V7Z" fill="white" opacity="0.8"/>
          </svg>
        );
      case 'sol':
        return <span className="text-white font-bold text-[14px]">S</span>;
      case 'usdc':
        return <span className="text-white font-bold text-[14px]">$</span>;
      case 'usdt':
        return <span className="text-white font-bold text-[14px]">T</span>;
      case 'usd1':
        return <span className="text-white font-bold text-[14px]">1</span>;
      default:
        return null;
    }
  };

  return (
    <div className={`${getIconBg(icon)} rounded-[6px] md:rounded-[10px] flex items-center justify-center`} style={{ width: size, height: size }}>
      {renderIcon()}
    </div>
  );
};

export default AssetIcon;

