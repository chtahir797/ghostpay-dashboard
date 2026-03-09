import React from 'react';
import Link from 'next/link';
import LogoIcon from '@/icons/LogoIcon';

const SwapInProgressView = ({ progressSteps, currentStep }) => {
  return (
    <div className="w-full max-w-[520px] mx-auto flex flex-col items-center gap-[24px] pt-[62px] px-4 md:px-0">
      {/* Heading, Logo and Description */}
      <div className="flex flex-col items-center gap-[12px]">
        <LogoIcon size={88} color="#A78BFA" />
        <h2 className="font-['Tomato_Grotesk'] font-bold text-[28px] md:text-[32px] leading-[35px] md:leading-[40px] tracking-0 text-[#ffffff] text-center">
          Swap In-Progress
        </h2>
        <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[24px] tracking-0 text-[#808080] text-center">
          Follow along as your swap goes through our process.
        </p>
      </div>

      {/* Progress Bar and Steps */}
      <div className="w-full flex flex-col gap-[16px]">
        {/* Progress Bar */}
        <div className="flex gap-[4px]">
          {progressSteps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-[4px] rounded-full transition-colors ${
                index <= currentStep ? 'bg-[#B39BFD]' : 'bg-[#151515]'
              }`}
            />
          ))}
        </div>

        {/* Progress Steps List */}
        <div className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] flex flex-col">
          {progressSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isLast = index === progressSteps.length - 1;

            return (
              <div
                key={index}
                className={`flex items-center gap-[12px] pt-[12px] pb-[12.5px] ps-[30px] ${
                  !isLast ? 'border-b border-[#151515]' : ''
                }`}
              >
                {/* Bullet Point */}
                <div
                  className={`w-[8px] h-[8px] rounded-full transition-colors ${
                    isActive
                      ? 'bg-[#B39BFD]'
                      : isCompleted
                      ? 'bg-[#808080]'
                      : 'bg-[#151515]'
                  }`}
                />
                {/* Step Text */}
                <p
                  className={`font-['Tomato_Grotesk'] font-normal text-[14px] leading-[20px] tracking-0 transition-colors ${
                    isActive
                      ? 'text-[#B39BFD]'
                      : isCompleted
                      ? 'text-[#808080]'
                      : 'text-[#555555]'
                  }`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="w-full bg-[#B39BFD] rounded-full py-[16px] px-[20px] hover:bg-[#9B8BED] transition-colors text-center"
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
          Back to Home
        </span>
      </Link>
    </div>
  );
};

export default SwapInProgressView;

