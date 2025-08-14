import Button from "@mui/material/Button";
import { useMemo } from "react";
import { account } from "@/contract/account";
import { supportedChainId, supportedChains } from "@/contract/chain";
import useConnect from "@/hooks/walletconnect/useConnect";
// import { useDownMd } from 'hooks/useLayout';
// import { LeftContainer } from 'components/Container';
// import { msg, Trans } from '@lingui/macro';
// import Topbar from 'components/Topbar';
// import { useLingui } from '@lingui/react';
// import { foramtAddress } from 'utils';
// import CheckIcon from 'assets/images/check.svg'
// import { Button } from '@matchain/matchid-sdk-react/components';
import Card from "./components/Card";
import ConnectSuccess from "./components/Status/ConnectSuccess";
// import { useUserInfo } from '@matchain/matchid-sdk-react/hooks';
import Website from "./components/Website";

const Connect = () => {
  // const { address } = useAccount();
  const { confirmLoading, connectSuccess, handleConfirm, handleReject } =
    useConnect();

  const chainInfos = useMemo(() => {
    return supportedChainId.map((chainId) => {
      const chain = supportedChains[chainId as keyof typeof supportedChains];
      return {
        id: chainId,
        name: chain.config.name || "Unknown",
        icon: chain.icon
      };
    });
  }, [supportedChainId]);

  if (connectSuccess) {
    return <ConnectSuccess />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="mx-auto flex w-full max-w-[416px] flex-col gap-6 px-8">
          <Website />
          {/* 用户钱包信息 */}
          <div className="wallet-card rounded-2xl bg-light-grey p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-md">
                  <span className="font-semibold text-white">M</span>
                </div>
                <div className="flex flex-col">
                  <h4>{account.address}</h4>
                  <p className="text-secondary-grey text-sm">
                    {account.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 链信息 */}
          <div className="space-y-3">
            <h4 className="font-normal text-secondary-grey text-sm">Chains</h4>
            <div className="flex flex-row items-center gap-2.5">
              {chainInfos.map((chain) => (
                <div className="flex items-center gap-1" key={chain.id}>
                  <img
                    src={chain.icon}
                    className="size-5 rounded-full"
                    alt=""
                  />
                  {/* <span className='text-base text-secondary-grey font-medium'>{chain.name}</span> */}
                </div>
              ))}
            </div>
          </div>

          {/* DApp 权限 */}
          <div className="space-y-2.5">
            <h4 className="font-medium text-sm">DApp permissions</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                {/* <img src={CheckIcon} className="mt-[3px] size-4" /> */}
                <span className="font-[325] text-sm">
                  View wallet balance and transaction history
                </span>
              </div>
              <div className="flex items-start gap-2">
                {/* <img src={CheckIcon} className="mt-[3px] size-4" /> */}
                <span className="font-[325] text-sm">
                  Send transaction signature requests
                </span>
              </div>
              <div className="flex items-start gap-2">
                {/* <img src={CheckIcon} className="mt-[3px] size-4" /> */}
                <span className="font-[325] text-sm">
                  No asset transfers occur without your confirmation.
                </span>
              </div>
            </div>
          </div>

          {/* 按钮 */}
          <div className="flex flex-col gap-3 pt-6">
            <Button loading={confirmLoading} onClick={handleConfirm}>
              Connect wallet
            </Button>
            <Button onClick={handleReject}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Connect;
