"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '../icons/HomeIcon';
import SendIcon from '../icons/SendIcon';
import PayIcon from '../icons/PayIcon';
import SwapIcon from '../icons/SwapIcon';
import RouteIcon from '../icons/RouteIcon';
import ReferralsIcon from '../icons/ReferralsIcon';

const navItems = [
  { name: 'Home', icon: HomeIcon, href: '/' },
  { name: 'Ghost Send', icon: SendIcon, href: '/ghost-send' },
  { name: 'Ghost Pay', icon: PayIcon, href: '/ghost-pay' },
  { name: 'Ghost Swap', icon: SwapIcon, href: '/ghost-swap' },
  { name: 'Ghost Route', icon: RouteIcon, href: '/ghost-route' },
  { name: 'Referrals', icon: ReferralsIcon, href: '/referrals' },
];

const Aside = () => {
  const pathname = usePathname();

  return (
    <aside className="min-w-[260px] w-[260px] h-screen bg-[#0B0B0B] flex flex-col border-r border-[#111]">
      <div className="ps-[24px] pt-[33px] pb-[43.5px] flex items-center gap-[8px]">
        <Image src="/Logo.png" alt="Ghost Logo" width={32} height={32} />
        <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[25.5px] tracking-0 text-[#ffffff]">
          Ghost
        </span>
      </div>

      <div className="flex-grow">
        <p className="ps-[28px] pb-[10px] font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#808080] uppercase">
          Navigation
        </p>
        <nav className="flex flex-col">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isGhostSend = item.name === 'Ghost Send';
            const isGhostSwap = item.name === 'Ghost Swap';
            const isGhostRoute = item.name === 'Ghost Route';
            const isReferrals = item.name === 'Referrals';
            const activeBgColor = isGhostSend && isActive ? 'bg-[#FB923C]' : isGhostSwap && isActive ? 'bg-[#B39BFD]' : isGhostRoute && isActive ? 'bg-[#8CFFEC]' : isReferrals && isActive ? 'bg-[#8CFFEC]' : isActive ? 'bg-[#8CFFEC]' : '';
            return (
              <div key={item.name} className="px-[17px]">
                <Link
                  href={item.href}
                  className={`flex items-center gap-[12px] py-[11px] ps-[13px] rounded-[12px] cursor-pointer transition-all duration-200 ${activeBgColor || 'hover:bg-[#111]'
                    }`}
                >
                  <item.icon
                    color={isActive ? "#000000" : "#808080"}
                    width={20}
                    height={20}
                  />
                  <span className={`font-['Tomato_Grotesk'] font-bold text-[14px] leading-[20px] tracking-0 ${isActive ? 'text-[#000000]' : 'text-[#808080]'
                    }`}>
                    {item.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="px-[16px] pb-[24px]">
        <div className="bg-[#050505] rounded-[14px]  border border-[#151515]">
          <div className=" overflow-hidden">
            <div className="py-[15px] ps-[15px] flex items-center gap-[12px]">
              <div className="w-[32px] h-[32px] bg-gradient-to-b from-[#6366F1] to-[#A855F7] rounded-[8px] py-[2px]"></div>
              <div className="flex flex-col">
                <p className="font-['Tomato_Grotesk'] font-bold text-[13px] leading-[19.5px] tracking-0 text-[#ffffff] m-0">
                  King Bob
                </p>
                <p className="font-['Tomato_Grotesk'] font-bold text-[11px] leading-[16.5px] tracking-0 text-[#444444] m-0">
                  1234........abcd
                </p>
              </div>
            </div>
          </div>
          <div className=" ps-[15px] pt-[10px] pb-[14px] flex items-center gap-[6px]">
            <span className="w-[6px] h-[6px] bg-[#10B981] rounded-full"></span>
            <span className="font-['Tomato_Grotesk'] font-bold text-[11px] leading-[16.5px] tracking-0 text-[#555555]">
              Connected
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Aside;