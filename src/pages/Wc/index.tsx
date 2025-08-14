import useConnectPair from "@/hooks/walletconnect/useConnectPair";
import { useWalletkitStore } from "@/store/walletkit";
import Connect from "./Connect";
import ErrorWapper from "./components/ErrorWapper";
import "./index.css";
import SendTransaction from "./SendTransaction";
import SignMessage from "./SignMessage";

const Wc = () => {
  const {
    approveProposal,
    signatureProposal,
    signatureTypeDataProposal,
    sendTransactionProposal,
    errorMessage
  } = useWalletkitStore();
  // console.log("🚀 ~ Wc ~ approveProposal:", approveProposal)
  useConnectPair();
  const isLoading =
    !approveProposal &&
    !signatureProposal &&
    !signatureTypeDataProposal &&
    !sendTransactionProposal;
  // console.log("🚀 ~ Wc ~ isLoading:", isLoading)
  if (isLoading && errorMessage === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-col">
      <ErrorWapper>
        {approveProposal && <Connect />}
        {signatureProposal && <SignMessage />}
        {sendTransactionProposal && <SendTransaction />}
      </ErrorWapper>
    </div>
  );
};

export default Wc;
