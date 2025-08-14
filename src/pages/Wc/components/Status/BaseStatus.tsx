import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import useBack from "@/hooks/walletconnect/useBack";
import Card from "../Card";

interface IBaseStatus {
  title: string;
  desc?: string;
  children?: React.ReactNode;
}
const BaseStatus = ({ title, desc, children }: IBaseStatus) => {
  const navigate = useNavigate();
  const { back } = useBack();

  return (
    <Card>
      <div className="mx-auto flex w-full max-w-[416px] flex-col gap-6 pt-6">
        <div className="flex flex-col items-center justify-center">
          {/* <img className="size-[96px]" src={SuccessIcon} /> */}
          <h4 className=" font-medium text-lg">{title}</h4>
          {children ? (
            children
          ) : (
            <p className="text-center font-[325] text-secondary-grey text-sm">
              {desc}
            </p>
          )}
        </div>
        <Button onClick={back}>Return to website</Button>
        <Button onClick={() => navigate("/dashboard")}>Stay in Wallet</Button>
      </div>
    </Card>
  );
};

export default BaseStatus;
