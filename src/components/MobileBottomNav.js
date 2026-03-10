"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '../icons/HomeIcon';
import SendIcon from '../icons/SendIcon';
import PayIcon from '../icons/PayIcon';
import SwapIcon from '../icons/SwapIcon';
import RouteIcon from '../icons/RouteIcon';

const mobileNavItems = [
  { name: 'Home', icon: HomeIcon, href: '/' },
  { name: 'Send', icon: SendIcon, href: '/ghost-send' },
  { name: 'Pay', icon: PayIcon, href: '/ghost-pay' },
  { name: 'Swap', icon: SwapIcon, href: '/ghost-swap' },
  { name: 'Route', icon: RouteIcon, href: '/ghost-route' },
];

const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden w-full">
      {/* Navigation Bar */}
      <div className="bg-[#0B0B0B] border-t border-[#151515] rounded-t-[20px] px-[8px] pt-[12px] pb-safe">
        <div className="flex justify-around items-center">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href;
            const iconColor = isActive ? "#8CFFEC" : "#808080";
            const textColor = isActive ? "text-[#8CFFEC]" : "text-[#808080]";

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center gap-[4px] px-[8px] py-[8px] min-w-[60px] transition-colors active:opacity-70"
              >
                <item.icon
                  color={iconColor}
                  width={24}
                  height={24}
                />
                <span className={`font-['Tomato_Grotesk'] font-medium text-[11px] leading-[13px] tracking-0 ${textColor}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
        {/* Home Indicator */}
        <div className="flex justify-center mt-[8px] mb-[4px]">
          <div className="w-[36px] h-[4px] bg-[#ffffff] bg-opacity-30 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;

