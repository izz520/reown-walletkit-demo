import { parseUri } from "@walletconnect/utils";
import { useSearchParams } from "react-router";

const useCheckWc = () => {
  const [searchParams] = useSearchParams();
  const uri = searchParams.get("uri");
  const connectInfo = uri ? parseUri(uri as string) : null;
  return {
    isConnect: !!connectInfo?.topic,
    connectInfo,
    uri
  };
};

export default useCheckWc;
