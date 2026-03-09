import { Copy } from 'lucide-react';
import RefreshIcon from '@/icons/RefreshIcon';

const ReferralCodeCard = ({
  code,
  onCopy,
  onGenerateNew,
  showGenerateButton = false,
  variant = 'default', // 'default' or 'compact'
  status,
}) => {
  if (variant === 'compact') {
    return (
      <div className="bg-[#0B0B0B] border border-[#151515] rounded-[14px] py-[14px] px-[20px] flex flex-col sm:flex-row justify-between gap-[16px]">
        <div className="flex flex-col gap-[5px]">
          <h3 className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-[1.2px] text-[#808080]">
            Your Referral Code
          </h3>
          <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
            {code}
          </p>
        </div>
        {status && (
          <div className="bg-[#10b98110] border border-[#8cffec18] rounded-[8px] flex justify-center items-center px-[12px] font-['Tomato_Grotesk'] font-bold text-[12px] leading-[18px] tracking-0 text-[#8CFFEC]">
            {status}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[17px] p-[18px] flex flex-col gap-[12px]">
      <h3 className="font-['Tomato_Grotesk'] font-bold text-[14px] leading-[15px] tracking-0 text-[#808080]">
        Your Referral Code
      </h3>
      <div className="flex items-center gap-[12px]">
        <div className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[12px] px-[12px] md:px-[16px] py-[16px] md:py-[20px] overflow-x-auto">
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] md:text-[16px] leading-[22px] tracking-0 text-[#8CFFEC] whitespace-nowrap">
            {code}
          </p>
        </div>
        <button
          onClick={() => onCopy && onCopy(code)}
          className="p-[12px] md:p-[15px] bg-[#0B0B0B] border border-[#151515] rounded-[8px] hover:bg-[#1a1a1a] transition-colors cursor-pointer flex-shrink-0"
        >
          <Copy width={18} height={18} color="#808080" />
        </button>
      </div>
      {showGenerateButton && (
        <button
          onClick={onGenerateNew}
          className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[11px] py-[12px] flex items-center justify-center gap-[8px] hover:bg-[#1a1a1a] transition-colors"
        >
          <RefreshIcon width={16} height={16} color="#ffffff" />
          <span className="font-['Tomato_Grotesk'] font-medium text-[14px] leading-[21px] tracking-0 text-[#ffffff]">
            Generate New Code
          </span>
        </button>
      )}
    </div>
  );
};

export default ReferralCodeCard;

