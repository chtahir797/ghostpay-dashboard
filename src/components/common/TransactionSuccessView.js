import React from 'react';
import Link from 'next/link';
import LogoIcon from '@/icons/LogoIcon';
import AssetIcon from '@/components/common/dropdown/AssetIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

const TransactionSuccessView = ({
  title = "Sent Successfully",
  amount,
  asset,
  usdValue,
  logoColor = "#EA7A2A",
  buttonColor = "#FB923C",
  buttonHoverColor = "#EA7A2A",
  amountColor,
  statusColor,
  recipient,
  via,
  txHash = "abcd......1234",
  explorerLink = "#",
  onCopyTxHash,
  formatAddress,
  formatTimestamp,
  maxWidth = "520px",
}) => {
  const formatDate = formatTimestamp || (() => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, '0');
    return `${month} ${day}, ${year}, ${formattedHours}:${minutes} ${ampm}`;
  });

  const formatAddr = formatAddress || ((address) => {
    if (!address) return 'abod......1234';
    if (address.length <= 12) return address;
    return `${address.slice(0, 4)}......${address.slice(-4)}`;
  });

  const handleCopy = () => {
    if (onCopyTxHash) {
      onCopyTxHash(txHash);
    } else {
      navigator.clipboard.writeText(txHash);
    }
  };

  const finalAmountColor = amountColor || logoColor;
  const finalStatusColor = statusColor || logoColor;

  return (
    <div className="w-full mx-auto pt-[40px] flex flex-col gap-[24px] " style={{ maxWidth }}>
      {/* Logo */}
      <div className="flex justify-center">
        <LogoIcon width={82} height={82} color={logoColor} />
      </div>

      {/* Success Message + Date */}
      <div className="flex flex-col gap-[4px] items-center">
        <p className="font-['Tomato_Grotesk'] font-bold text-[26px] leading-[34.5px] tracking-[-0.5px] text-[#ffffff]">
          {title}
        </p>
        <p className="font-['Tomato_Grotesk'] font-bold text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
          {formatDate()}
        </p>
      </div>

      {/* Amount + Coin Name + Balance */}
      <div className="flex flex-col gap-[12px] items-center">
        <div className="flex items-baseline gap-[2px]">
          <p
            className="font-['Tomato_Grotesk'] font-bold text-[36px] md:text-[48px] leading-[34px] md:leading-[46px] tracking-[-2px]"
            style={{ color: finalAmountColor }}
          >
            {amount}
          </p>
          {asset && (
            <p className="font-['Tomato_Grotesk'] font-semibold text-[20px] md:text-[24px] leading-[18px] md:leading-[22px] tracking-0 text-[#808080]">
              {asset.symbol}
            </p>
          )}
        </div>
        {usdValue && (
          <p className="font-['Tomato_Grotesk'] font-normal text-[16px] leading-[21px] tracking-0 text-[#808080]">
            {usdValue}
          </p>
        )}
      </div>

      {/* Information Section */}
      <div className="flex flex-col gap-[12px] max-w-[480px] mx-auto w-full">
        <div className="bg-[#0B0B0B] border border-[#151515] rounded-[16px] overflow-hidden">
          {/* To Section */}
          {recipient && (
            <div className="px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
              <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                To
              </p>
              <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                {formatAddr(recipient)}
              </p>
            </div>
          )}

          {/* Via Section */}
          {via && (
            <div className="px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
              <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                Via
              </p>
              <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                {via}
              </p>
            </div>
          )}

          {/* Asset Section */}
          {asset && (
            <div className="px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
              <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
                Asset
              </p>
              <div className="flex items-center gap-[8px]">
                <AssetIcon icon={asset.icon} size={20} />
                <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                  {asset.name}
                </p>
              </div>
            </div>
          )}

          {/* Status Section */}
          <div className="px-[10px] py-[12px] flex justify-between items-center border-b border-[#151515]">
            <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
              Status
            </p>
            <div className="flex items-center gap-[8px]">
              <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: finalStatusColor }}></div>
              <p
                className="font-['Tomato_Grotesk'] font-semibold text-[13px] leading-[19.5px] tracking-0"
                style={{ color: finalStatusColor }}
              >
                Confirmed
              </p>
            </div>
          </div>

          {/* Tx Hash Section */}
          <div className="px-[10px] py-[12px] flex justify-between items-center">
            <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080]">
              Txn Hash
            </p>
            <div className="flex items-center gap-[8px]">
              <p className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#ffffff]">
                {formatAddr(txHash)}
              </p>
              <button
                onClick={handleCopy}
                className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 bg-[#222222] py-[8px] px-[9px] rounded-[7px] border border-[#808080] hover:bg-[#2a2a2a] transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* View on Explorer Link */}
        <Link href={explorerLink} className="flex items-center gap-[4px] justify-center">
          <span className="font-['Tomato_Grotesk'] font-normal text-[13px] leading-[19.5px] tracking-0 text-[#808080] hover:text-[#ffffff] transition-colors">
            View on Explorer
          </span>
          <ArrowRightIcon width={12} height={12} color="#808080" className="rotate-320" />
        </Link>
      </div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="w-full rounded-full py-[16px] px-[20px] transition-colors text-center"
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
          Back to Home
        </span>
      </Link>
    </div>
  );
};

export default TransactionSuccessView;

