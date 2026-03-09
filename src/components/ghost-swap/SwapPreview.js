import React from 'react';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

const SwapPreview = ({ previewData, showDots = false }) => {
  const items = previewData || [];

  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] overflow-hidden">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div
              key={index}
              className={`px-[10px] py-[12px] flex justify-between items-center ${
                !isLast ? 'border-b border-[#151515]' : ''
              }`}
            >
              <div className="flex items-center gap-[8px]">
                {showDots && (
                  <div className="w-[8px] h-[8px] rounded-full bg-[#808080]" />
                )}
                <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                  {item.label}
                </p>
              </div>
              {item.value && (
                <div className="flex items-center gap-[4px]">
                  <p
                    className={`font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 ${
                      item.highlight ? 'text-[#B39BFD]' : 'text-[#ffffff]'
                    }`}
                  >
                    {item.value}
                  </p>
                  {item.link && (
                    <ArrowRightIcon width={16} height={16} color="#ffffff" className="rotate-320" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SwapPreview;

