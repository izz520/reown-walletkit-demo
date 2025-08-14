import { useWalletkitStore } from "@/store/walletkit";

// import useSignMessage from './useSignMessage'

const useSignTypeDataMessage = () => {
  const { signatureTypeDataProposal } = useWalletkitStore();
  // const { parsedMessage, confirmLoading, confirmSuccess, handleConfirm, handleReject } = useSignMessage()
  console.log(
    "🚀 ~ SignMessage ~ signatureProposal:",
    signatureTypeDataProposal
  );
};

export default useSignTypeDataMessage;
