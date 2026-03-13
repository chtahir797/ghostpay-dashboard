import React from 'react';
import LogoIcon from '@/icons/LogoIcon';

const MethodSelection = ({
  title,
  subtitle,
  logoColor = "#A78BFA",
  borderColor = "#B39BFD",
  iconBgColor,
  methods = [],
}) => {
  // Calculate icon background color with opacity if not provided
  const getIconBgColor = () => {
    if (iconBgColor) return iconBgColor;
    // Convert hex to rgba with 21 opacity (0.13)
    const hex = logoColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.13)`;
  };

  return (
    <div className="w-full max-w-[654px] mx-auto h-full flex flex-col items-center justify-center gap-[32px] pt-[40px]">
      <div className="flex flex-col items-center gap-[12px]">
        <LogoIcon size={88} color={logoColor} />
        <h2 className="font-['Tomato_Grotesk'] font-bold text-[28px] md:text-[32px] leading-[33px] tracking-0 text-[#ffffff] text-center">
          {title}
        </h2>
        <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[18px] tracking-0 text-[#808080] text-center">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {methods.map((method, index) => {
          const IconComponent = method.icon;
          return (
            <button
              key={index}
              onClick={method.onClick}
              className="flex-1 bg-[#0B0B0B] border border-[#151515] rounded-[20px] p-[21px] md:py-[20px] flex flex-col md:items-center transition-colors"
              style={{
                '--border-color': borderColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = borderColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#151515';
              }}
            >
              <div className="md:max-w-[193px] max-w-full flex flex-row md:flex-col items-start md:items-center gap-3">

                <div
                  className="p-[12px] border rounded-[8px]"
                  style={{
                    backgroundColor: getIconBgColor(),
                    borderColor: logoColor,
                  }}
                >
                  <IconComponent size={28} color="#ffffff" />
                </div>

                <div className="flex flex-col md:items-center items-start gap-2">
                  <h3 className="font-['Tomato_Grotesk'] font-bold text-[16px] leading-[16px] tracking-0 text-[#ffffff] md:text-center text-left">
                    {method.title}
                  </h3>
                  <p className="md:w-[215px] font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18px] tracking-0 text-[#808080] md:text-center text-left">
                    {method.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MethodSelection;

