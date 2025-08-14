// import { msg, Trans } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
// import { useUserInfo } from '@matchain/matchid-sdk-react/hooks';
// import { LeftContainer } from 'components/Container';
// import Topbar from 'components/Topbar';
// import { useDownMd } from 'hooks/useLayout';

import Button from "@mui/material/Button";
import { useMemo } from "react";
import { supportedChains } from "@/contract/chain";
import useSendTransaction from "@/hooks/walletconnect/useSendTransaction";
import { useWalletkitStore } from "@/store/walletkit";
import BlockCard from "./components/BlockCard";
import Card from "./components/Card";
import SendTransactionSuccess from "./components/Status/SendTransactionSuccess";
import Website from "./components/Website";

const SendTransaction = () => {
  const { sendTransactionProposal } = useWalletkitStore();
  const { confirmLoading, confirmSuccess, hash, handleConfirm, handleReject } =
    useSendTransaction();
  const txInfo = useMemo(() => {
    return sendTransactionProposal?.params?.request?.params[0];
  }, [sendTransactionProposal]);
  const chain = useMemo(() => {
    const chainId = sendTransactionProposal?.params?.chainId;
    if (!chainId) return null;
    return supportedChains[chainId as keyof typeof supportedChains];
  }, [sendTransactionProposal]);

  if (confirmSuccess) {
    return (
      <div>
        <h1>Transaction Success</h1>
        <p>Hash: {hash}</p>
      </div>
    );
  }
  if (confirmLoading) {
    return <SendTransactionSuccess hash={hash} />;
  }
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="mx-auto w-full max-w-[416px]">
          <Website />
          <div className="my-6 flex flex-col gap-3">
            <BlockCard title="Blockchain(s)">
              <div className="flex items-center gap-1 ">
                <img src={chain?.icon} className="size-4" alt="" />
                <span className="font-normal text-secondary-grey text-sm">
                  {chain?.config?.name || "Unknown"}
                </span>
              </div>
            </BlockCard>
            <BlockCard title="Transaction Info">
              <code className=" font-normal text-secondary-grey text-sm">
                {JSON.stringify(txInfo, null, 2)}
              </code>
            </BlockCard>
          </div>
          <div className="flex flex-col gap-6">
            <Button loading={confirmLoading} onClick={handleConfirm}>
              Confirm
            </Button>
            <Button onClick={handleReject}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SendTransaction;
