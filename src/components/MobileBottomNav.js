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
            const isHome = item.name === 'Home';
            const isSend = item.name === 'Send';
            const isPay = item.name === 'Pay';
            const isSwap = item.name === 'Swap';
            const isRoute = item.name === 'Route';
            
            // Match desktop aside colors
            let iconColor = "#808080";
            let textColor = "text-[#808080]";
            
            if (isActive) {
              if (isSend) {
                iconColor = "#FB923C";
                textColor = "text-[#FB923C]";
              } else if (isPay) {
                iconColor = "#59FF96";
                textColor = "text-[#59FF96]";
              } else if (isSwap) {
                iconColor = "#B39BFD";
                textColor = "text-[#B39BFD]";
              } else if (isRoute) {
                iconColor = "#FB3C3C";
                textColor = "text-[#FB3C3C]";
              } else if (isHome) {
                iconColor = "#8CFFEC";
                textColor = "text-[#8CFFEC]";
              }
            }

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

