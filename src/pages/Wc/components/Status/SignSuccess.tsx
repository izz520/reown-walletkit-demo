import BlockCard from "../BlockCard";
import BaseStatus from "./BaseStatus";

// import useCopyClipboard from '@/hooks/useCopyClipboard'
// import { useDownMd } from 'hooks/useLayout'
interface ISignSuccess {
  hexMessage: string;
}
const SignSuccess = ({ hexMessage }: ISignSuccess) => {
  return (
    <BaseStatus title="Signature successful" desc="Request a signature">
      <BlockCard title="Signature Hash" value={hexMessage} className="mt-4" />
    </BaseStatus>
  );
};

export default SignSuccess;
