import InfoIcon from '@/icons/InfoIcon';

const InformationBanner = ({ message }) => {
  return (
    <div className="bg-[#8cffec20] bg-opacity-10 border border-[#8CFFEC] border-opacity-20 rounded-[16px] py-[15px] px-[16px] md:px-[18px] flex items-start gap-[12px]">
      <div className="flex-shrink-0 pt-[2px]">
        <InfoIcon width={16} height={16} color="#8CFFEC" />
      </div>
      <p className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[19.2px] tracking-0 text-[#8CFFEC] flex-1">
        {message}
      </p>
    </div>
  );
};

export default InformationBanner;

