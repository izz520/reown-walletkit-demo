import BlockCard from "../BlockCard";
import BaseStatus from "./BaseStatus";

interface ISendTransactionSuccess {
  hash: string | null;
}
const SendTransactionSuccess = ({ hash }: ISendTransactionSuccess) => {
  return (
    <BaseStatus
      title="Transaction Signing Successful"
      desc="Transaction signing successful"
    >
      <div className="flex flex-col gap-2">
        <span className="font-normal text-secondary-grey text-sm">
          Transaction signing successful
        </span>
        <BlockCard title="Transaction Hash" value={hash || ""} />
      </div>
    </BaseStatus>
  );
};

export default SendTransactionSuccess;
