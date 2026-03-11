import React from 'react';
import LogoIcon from '@/icons/LogoIcon';
import ClipboardIcon from '@/icons/ClipboardIcon';
import InfoIcon from '@/icons/InfoIcon';

const OneTimeAddressView = ({
  title = "Swap Via One-Time Address",
  subtitle = "Send funds from your wallet to this one-time address to complete your transaction.",
  address,
  logoColor = "#A78BFA",
  buttonColor = "#B39BFD",
  buttonHoverColor = "#9B8BED",
  buttonText = "I Sent",
  onCopy,
  onConfirm,
  infoText = "Only send requested currency to this address, any other funds sent may result in loss of funds.",
  infoBgColor,
  infoBorderColor,
  copyButtonHoverColor,
  maxWidth = "520px",
}) => {
  // Calculate info box colors if not provided
  const getInfoBgColor = () => {
    if (infoBgColor) return infoBgColor;
    // Convert hex to rgba with low opacity
    const hex = logoColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.024)`;
  };

  const getInfoBorderColor = () => {
    if (infoBorderColor) return infoBorderColor;
    // Convert hex to rgba with low opacity
    const hex = logoColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 0.078)`;
  };

  const getCopyButtonHoverColor = () => {
    if (copyButtonHoverColor) return copyButtonHoverColor;
    return buttonColor;
  };

  return (
    <div className="mx-auto flex flex-col items-center gap-[24px] mt-[78px] pb-[20px]" style={{ maxWidth }}>
      <div className="flex flex-col gap-3 items-center">
        <LogoIcon size={88} color={logoColor} />
        <h2 className="font-['Tomato_Grotesk'] font-bold text-[24px] leading-[33px] tracking-0 text-[#ffffff] text-center">
          {title}
        </h2>
        <p className="font-['Tomato_Grotesk'] font-normal text-[14px] leading-[18px] tracking-0 text-[#808080] text-center px-2">
          {subtitle}
        </p>
      </div>

      <div className="w-full bg-[#0B0B0B] border border-[#151515] rounded-[16px] p-[16px] flex flex-col gap-[12px]">
        <p className="font-['Tomato_Grotesk'] font-normal text-[11px] leading-[16.5px] tracking-0 text-[#808080]">
          One-Time Address
        </p>
        <p className="font-['Tomato_Grotesk'] font-semibold text-[12px] leading-[21px] tracking-0 text-[#ffffff] break-all">
          {address}
        </p>
        <button
          onClick={onCopy}
          className="bg-[#222222] rounded-full p-[12px] flex items-center justify-center gap-[4px] transition-colors"
          style={{
            '--hover-border-color': getCopyButtonHoverColor(),
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = getCopyButtonHoverColor();
            e.currentTarget.style.borderWidth = '1px';
            e.currentTarget.style.borderStyle = 'solid';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.borderWidth = '0px';
          }}
        >
          <ClipboardIcon width={20} height={20} color="#ffffff" />
          <span className="font-['Tomato_Grotesk'] font-semibold text-[16px] leading-[24px] tracking-0 text-[#ffffff]">
            Copy Address
          </span>
        </button>
      </div>

      <div
        className="w-full border rounded-[12px] p-[10px] flex items-start gap-2"
        style={{
          backgroundColor: getInfoBgColor(),
          borderColor: getInfoBorderColor(),
        }}
      >
        <InfoIcon width={20} height={20} color={logoColor} />
        <p
          className="font-['Tomato_Grotesk'] font-normal text-[12px] leading-[18.6px] tracking-0 max-w-[314px]"
          style={{ color: logoColor }}
        >
          {infoText}
        </p>
      </div>

      <button
        onClick={onConfirm}
        className="w-full rounded-full py-[16px] px-[20px] transition-colors"
        style={{
          backgroundColor: buttonColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = buttonHoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = buttonColor;
        }}
      >
        <span className="font-['Tomato_Grotesk'] font-bold text-[20px] leading-[24px] tracking-0 text-[#000000]">
          {buttonText}
        </span>
      </button>
    </div>
  );
};

export default OneTimeAddressView;

