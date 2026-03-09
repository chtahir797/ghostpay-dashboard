"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/Header";
import DashboardLayout from "../DashboardLayout";



export default function GhostRoute() {


  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#000000]">
        <Header title={"Ghost Route"} subtitle={"Route your money privately"} />
        <main className="p-[10px] flex flex-col gap-[20px]">
          <div className="w-[520px] mx-auto pt-[40px] flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[4px]">
              <p className="font-['Tomato_Grotesk'] font-bold text-[26px] leading-[34.5px] tracking-[-0.5px] text-[#ffffff]">
                Route your money privately
              </p>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
