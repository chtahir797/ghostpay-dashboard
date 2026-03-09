import { LinkIcon } from 'lucide-react';

const YourPointsCard = ({ points, badge, activeReferrals, stats }) => {
  return (
    <div className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[16px] py-[20px] px-[20px] md:px-[30px] flex flex-col gap-[16px] relative">
      <div className="flex justify-between items-center">
        <h3 className="font-['Tomato_Grotesk'] font-medium text-[14px] leading-[15px] tracking-0 text-[#808080]">
          Your Points
        </h3>
        {badge && (
          <div className="bg-[#8cffec20] border border-[#8cffec] rounded-[8px] p-[8px] font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#8CFFEC]">
            {badge}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[16px]">
        <h2 className="font-['Tomato_Grotesk'] font-extrabold text-[36px] md:text-[48px] leading-[36px] md:leading-[48px] tracking-[-2px] text-[#ffffff]">
          {points}
        </h2>
        {activeReferrals && (
          <div className="flex items-center gap-[6px]">
            <div className="p-[3px] bg-[#8cffec20] rounded-[4px]">
              <LinkIcon width={8} height={8} color="#8CFFEC" className="rotate-90" />
            </div>
            <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18px] tracking-0 text-[#8CFFEC]">
              {activeReferrals}
            </p>
          </div>
        )}
      </div>

      {stats && stats.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-[12px]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex-1 bg-[#00000030] border border-[#ffffff04] rounded-[10px] py-[13px] px-[15px] flex flex-col gap-[4px]"
            >
              <p className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#808080]">
                {stat.label}
              </p>
              <p className="font-['Tomato_Grotesk'] font-medium text-[15px] leading-[22.5px] tracking-0 text-[#ffffff]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourPointsCard;

