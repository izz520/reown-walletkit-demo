import { useWalletkitStore } from "@/store/walletkit";

const Website = () => {
  const { websiteInfo } = useWalletkitStore();
  if (!websiteInfo) return null;
  return (
    <div className="flex items-center gap-2">
      <img
        className="size-[50px] rounded-md"
        src={websiteInfo?.icons[0]}
        alt=""
      />
      <div className="flex flex-col gap-1">
        <span className="text-lg">{websiteInfo?.name}</span>
        <span className="text-secondary-grey text-xs">{websiteInfo?.url}</span>
      </div>
    </div>
  );
};

export default Website;
