import React from 'react';
import Link from 'next/link';
import HideIcon from '@/icons/HideIcon';
import ArrowUpIcon from '@/icons/ArrowUpIcon';
import SendIcon from '@/icons/SendIcon';
import ReceiveIcon from '@/icons/ReceiveIcon';
import SwapIcon from '@/icons/SwapIcon';
import GhostIcon from '@/icons/GhostIcon';

const WalletBalanceCard = ({ balance, change, changeLabel = "today", onHideBalance }) => {
  const actionButtons = [
    { icon: SendIcon, label: 'Send', href: '/ghost-send' },
    { icon: ReceiveIcon, label: 'Receive', href: '#' },
    { icon: SwapIcon, label: 'Swap', href: '/ghost-swap', rotate: true },
    { icon: GhostIcon, label: 'Buy Ghost', href: '#' },
  ];

  return (
    <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[20px] flex flex-col gap-[20px]">
      <div className="flex justify-between items-center">
        <span className="font-['Tomato_Grotesk'] font-bold text-[14px] leading-[14px] tracking-0 text-[#808080]">
          Wallet Balance
        </span>
        <button
          onClick={onHideBalance}
          className="p-[6.5px] bg-[#ffffff05] rounded-md cursor-pointer border border-[#ffffff07] hover:bg-[#ffffff10] transition-colors"
        >
          <HideIcon width={16} height={16} color="#444" />
        </button>
      </div>

      <div className="flex flex-col">
        <h2 className="font-['Tomato_Grotesk'] font-bold text-[32px] md:text-[38px] leading-[32px] md:leading-[38px] tracking-0 text-[#ffffff] mb-[12px]">
          {balance}
        </h2>
        {change && (
          <div className="flex items-center gap-[4px]">
            <div className="bg-[#59ff9621] p-[3px] rounded-[4px] flex items-center justify-center">
              <ArrowUpIcon width={8} height={8} color="#59FF96" />
            </div>
            <p className="font-['Tomato_Grotesk'] text-[12px] leading-[18px] tracking-0">
              <span className="font-bold text-[#59FF96]">{change}</span>
              {changeLabel && (
                <span className="text-[#808080] ml-[4px]">{changeLabel}</span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-[12px] md:gap-[12px] overflow-x-auto pb-2 md:pb-0">
        {actionButtons.map((button, index) => {
          const ButtonIcon = button.icon;
          const buttonContent = (
            <>
              <ButtonIcon
                width={20}
                height={20}
                color="#808080"
                className={button.rotate ? "rotate-90" : ""}
              />
              <span className="font-['Tomato_Grotesk'] font-medium text-[12px] leading-[14px] text-[#808080]">
                {button.label}
              </span>
            </>
          );

          return button.href === '#' ? (
            <button
              key={index}
              className="w-[70px] h-[56px] md:w-[120px] md:h-[40px] bg-[#151515] rounded-[10px] flex flex-col md:flex-row items-center justify-center gap-[4px] group hover:bg-[#222] transition-colors flex-shrink-0"
            >
              {buttonContent}
            </button>
          ) : (
            <Link
              key={index}
              href={button.href}
              className="w-[70px] h-[56px] md:w-[120px] md:h-[40px] bg-[#151515] rounded-[10px] flex flex-col md:flex-row items-center justify-center gap-[4px] group hover:bg-[#222] transition-colors flex-shrink-0"
            >
              {buttonContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WalletBalanceCard;

