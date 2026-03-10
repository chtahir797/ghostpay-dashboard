"use client";

import React, { useState } from 'react';
import DashboardLayout from "./DashboardLayout";
import Header from "../components/Header";
import WalletBalanceCard from "../components/home/WalletBalanceCard";
import AssetsList from "../components/home/AssetsList";
import ActivityList from "../components/home/ActivityList";
import SendIcon from "../icons/SendIcon";
import SwapIcon from "../icons/SwapIcon";
import BuyGhostIcon from "../icons/BuyGhostIcon";
import MobileHomeHeader from '@/components/home/MobileHomeHeader';

const assets = [
  { name: 'ETH', balance: '0.006714 ETH', price: '$17.79', change: '+2.4%', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035' },
  { name: 'SOL', balance: '1.42 SOL', price: '$210.16', change: '+5.1%', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=035' },
  { name: 'USDC', balance: '42.5 USDC', price: '$42.50', change: '0%', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=035' },
  { name: 'USDT', balance: '15 USDT', price: '$15.00', change: '0%', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=035' },
  { name: 'USD1', balance: '100 USD1', price: '$100.00', change: '0%', icon: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=035' },
];

const activities = [
  { type: 'Ghost Send', details: '0.006714 ETH', change: '-0.002 ETH', time: '2h ago', icon: <SendIcon width={20} height={20} color="#808080" /> },
  { type: 'Ghost Swap', details: 'SOL → ETH', change: '+.49 ETH', time: '1d ago', icon: <SwapIcon width={20} height={20} color="#808080" /> },
  { type: 'Buy $Ghost', details: '21,340 Ghost', change: '$42.50', time: '3d ago', icon: <BuyGhostIcon width={36} height={36} /> },
  { type: 'Ghost Send', details: 'vault.sol', change: '-15.00 USDT', time: '5d ago', icon: <SendIcon width={20} height={20} color="#808080" /> },
];

export default function Home() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const handleHideBalance = () => {
    setBalanceVisible(!balanceVisible);
  };

  const handleSeeAllAssets = () => {
    // Handle navigation to assets page
    console.log("Navigate to assets page");
  };

  const handleSeeAllActivity = () => {
    // Handle navigation to activity page
    console.log("Navigate to activity page");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        <div className='hidden md:block'>
          <Header title="Ghost Overview" subtitle="Welcome back, King Bob" />
        </div>
        
      {/* MobileHomeHeader */}
        <MobileHomeHeader />
        {/* Main Content */}
        <main className="md:p-[12px] p-[25px] flex flex-col gap-[20px]">
          {/* Wallet Balance Card */}
          <WalletBalanceCard
            balance={balanceVisible ? "$385.45" : "****"}
            change={balanceVisible ? "+$12.40" : null}
            changeLabel="today"
            onHideBalance={handleHideBalance}
          />

          {/* Assets and Activity Row */}
          <div className="flex flex-col md:flex-row gap-[20px] pt-[20px]">
            {/* Assets Section */}
            <AssetsList
              assets={assets}
              onSeeAll={handleSeeAllAssets}
            />

            {/* Activity Section */}
            <ActivityList
              activities={activities}
              onSeeAll={handleSeeAllActivity}
            />
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
