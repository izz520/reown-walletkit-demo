import Button from "@mui/material/Button";
import { account } from "@/contract/account";
import { supportedChains } from "@/contract/chain";
import useSignMessage from "@/hooks/walletconnect/useSignMessage";
import { useWalletkitStore } from "@/store/walletkit";
import BlockCard from "./components/BlockCard";
import Card from "./components/Card";
import SignSuccess from "./components/Status/SignSuccess";
import Website from "./components/Website";

const SignTypeDataMessage = () => {
  const { signatureProposal } = useWalletkitStore();
  const {
    signature,
    parsedMessage,
    confirmLoading,
    confirmSuccess,
    handleConfirm,
    handleReject
  } = useSignMessage();
  console.log("🚀 ~ SignMessage ~ signatureProposal:", signatureProposal);
  const chain =
    supportedChains[
      signatureProposal?.params?.chainId as keyof typeof supportedChains
    ];

  if (confirmSuccess) {
    return <SignSuccess hexMessage={signature} />;
  }
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="mx-auto w-full max-w-[416px]">
          <Website />
          <div className="my-6 flex flex-col gap-4">
            <BlockCard title="Blockchain(s)">
              <div className="flex items-center gap-1 ">
                <img src={chain?.icon} className="size-4" alt="" />
                <span className="font-normal text-secondary-grey text-sm">
                  {chain?.config?.name || "Unknown"}
                </span>
              </div>
            </BlockCard>
            <BlockCard title="Account" value={account.address} />
            <BlockCard title="Message" value={parsedMessage} />
          </div>
          <div className="flex flex-col gap-6">
            <Button loading={confirmLoading} onClick={handleConfirm}>
              Approve
            </Button>
            <Button onClick={handleReject}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignTypeDataMessage;
