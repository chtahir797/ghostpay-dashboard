"use client";

import { useState } from 'react';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";
import YourPointsCard from "@/components/referrals/YourPointsCard";
import ReferralCodeCard from "@/components/referrals/ReferralCodeCard";
import ReferralsTable from "@/components/referrals/ReferralsTable";
import InformationBanner from "@/components/referrals/InformationBanner";

const referrals = [
  { id: 1, wallet: "4a2B...8F3c", joined: "Feb 28", volume: "$4,210", points: "+420", status: "Active" },
  { id: 2, wallet: "9d1E...22Ab", joined: "Feb 25", volume: "$1,870", points: "+187", status: "Active" },
  { id: 3, wallet: "7c3F...D9e1", joined: "Feb 20", volume: "$920", points: "+92", status: "Active" },
  { id: 4, wallet: "Ab12...56Cd", joined: "Feb 14", volume: "$0", points: "+0", status: "Inactive" },
  { id: 5, wallet: "1f8A...Bc44", joined: "Feb 10", volume: "$3,100", points: "+310", status: "Active" },
];

export default function Referrals() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNew = () => {
    // Handle generate new code logic here
    console.log("Generate new code");
  };

  const pointsStats = [
    { label: "Total Volume", value: "$10,100" },
    { label: "This Week", value: "+$2,430" },
    { label: "Earned", value: "$50.45" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        <Header title="Referrals" subtitle="Invite friends and earn points on their volume." />
        <main className="md:p-[12px] p-[25px] flex flex-col gap-[20px]">
          {/* Top Cards Row */}
          <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[24px]">
            {/* Your Points Card */}
            <YourPointsCard
              points="1,009"
              badge="Top 5%"
              activeReferrals="4 active referrals generating volume"
              stats={pointsStats}
            />

            {/* Referral Code Cards */}
            <div className="flex flex-col gap-[17px] w-full lg:w-auto lg:flex-1">
              {/* Main Referral Code Card */}
              <ReferralCodeCard
                code="ghost.money/pay/R75FPA8B"
                onCopy={handleCopy}
                onGenerateNew={handleGenerateNew}
                showGenerateButton={true}
              />

              {/* Compact Referral Code Card */}
              <ReferralCodeCard
                code="D3aD...B33f"
                variant="compact"
                status="Active"
              />
            </div>
          </div>

          {/* Your Referrals Table */}
          <ReferralsTable referrals={referrals} total={5} />

          {/* Information Banner */}
          <InformationBanner message="Share your referral code to earn points on every swap your referrals make. Points accumulate based on their trading volume, the more they trade, the more you earn." />
        </main>
      </div>
    </DashboardLayout>
  );
}
