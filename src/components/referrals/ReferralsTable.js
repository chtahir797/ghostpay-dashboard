const ReferralsTable = ({ referrals, total }) => {
  return (
    <div className="bg-[#0D0D0D] border border-[#151515] rounded-[18px] flex flex-col gap-[14px] overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[8px] px-[16px] md:px-[22px] pt-[18px]">
        <h3 className="font-['Tomato_Grotesk'] font-semibold text-[16px] leading-[24px] tracking-0 text-[#ffffff]">
          Your Referrals
        </h3>
        {total !== undefined && (
          <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[21px] tracking-0 text-[#808080]">
            {total} total
          </p>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#151515]">
              <th className="text-left py-[9px] px-[12px] md:px-[22px]">
                <span className="font-['Tomato_Grotesk'] font-bold text-[12px] leading-[18px] tracking-0 text-[#808080] uppercase">
                  #
                </span>
              </th>
              <th className="text-left py-[9px] px-[12px] md:px-[22px]">
                <span className="font-['Tomato_Grotesk'] font-bold text-[12px] leading-[18px] tracking-0 text-[#808080] uppercase">
                  Wallet
                </span>
              </th>
              <th className="text-left py-[9px] px-[12px] md:px-[22px]">
                <span className="font-['Tomato_Grotesk'] font-bold text-[12px] leading-[18px] tracking-0 text-[#808080] uppercase">
                  Joined
                </span>
              </th>
              <th className="text-left py-[9px] px-[12px] md:px-[22px]">
                <span className="font-['Tomato_Grotesk'] font-bold text-[12px] leading-[18px] tracking-0 text-[#808080] uppercase">
                  Volume
                </span>
              </th>
              <th className="text-left py-[9px] px-[12px] md:px-[22px]">
                <span className="font-['Tomato_Grotesk'] font-bold text-[12px] leading-[18px] tracking-0 text-[#808080] uppercase">
                  Points
                </span>
              </th>
              <th className="text-left py-[9px] px-[12px] md:px-[22px]">
                <span className="font-['Tomato_Grotesk'] font-bold text-[12px] leading-[18px] tracking-0 text-[#808080] uppercase">
                  Status
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr key={referral.id} className="border-b border-[#151515] last:border-b-0">
                <td className="py-[16px] px-[12px] md:px-[22px]">
                  <span className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[18px] tracking-0 text-[#808080]">
                    #{referral.id}
                  </span>
                </td>
                <td className="py-[16px] px-[12px] md:px-[22px]">
                  <span className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                    {referral.wallet}
                  </span>
                </td>
                <td className="py-[16px] px-[12px] md:px-[22px]">
                  <span className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18px] tracking-0 text-[#808080]">
                    {referral.joined}
                  </span>
                </td>
                <td className="py-[16px] px-[12px] md:px-[22px]">
                  <span className="font-['Tomato_Grotesk'] font-medium text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                    {referral.volume}
                  </span>
                </td>
                <td className="py-[16px] px-[12px] md:px-[22px]">
                  <span className="font-['Tomato_Grotesk'] font-medium text-[13px] leading-[19.5px] tracking-0 text-[#8CFFEC]">
                    {referral.points}
                  </span>
                </td>
                <td className="py-[16px] px-[12px] md:px-[22px]">
                  <div
                    className={`w-fit rounded-[6px] px-[10px] py-[5px] font-['Tomato_Grotesk'] font-bold text-[11px] leading-[16.5px] tracking-0 ${
                      referral.status === "Active"
                        ? "bg-[#8cffec10] border border-[#8cffec18] text-[#8CFFEC]"
                        : "bg-[#0b0b0b04] border border-[#222222] text-[#808080]"
                    }`}
                  >
                    {referral.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-[12px] px-[16px] pb-[18px]">
        {referrals.map((referral) => (
          <div key={referral.id} className="bg-[#0B0B0B] border border-[#151515] rounded-[12px] p-[16px] flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <span className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[18px] tracking-0 text-[#808080]">
                #{referral.id}
              </span>
              <div
                className={`w-fit rounded-[6px] px-[10px] py-[5px] font-['Tomato_Grotesk'] font-bold text-[11px] leading-[16.5px] tracking-0 ${
                  referral.status === "Active"
                    ? "bg-[#8cffec10] border border-[#8cffec18] text-[#8CFFEC]"
                    : "bg-[#0b0b0b04] border border-[#222222] text-[#808080]"
                }`}
              >
                {referral.status}
              </div>
            </div>
            
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between items-center">
                <span className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#808080] uppercase">
                  Wallet
                </span>
                <span className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                  {referral.wallet}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#808080] uppercase">
                  Joined
                </span>
                <span className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18px] tracking-0 text-[#808080]">
                  {referral.joined}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#808080] uppercase">
                  Volume
                </span>
                <span className="font-['Tomato_Grotesk'] font-medium text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                  {referral.volume}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-['Tomato_Grotesk'] font-bold text-[10px] leading-[15px] tracking-0 text-[#808080] uppercase">
                  Points
                </span>
                <span className="font-['Tomato_Grotesk'] font-medium text-[13px] leading-[19.5px] tracking-0 text-[#8CFFEC]">
                  {referral.points}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralsTable;

