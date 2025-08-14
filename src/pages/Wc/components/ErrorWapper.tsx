import Button from "@mui/material/Button";
import type { PropsWithChildren } from "react";
import { useWalletkitStore } from "@/store/walletkit";

const ErrorWapper = ({ children }: PropsWithChildren) => {
  const { errorMessage, websiteInfo } = useWalletkitStore();
  const handleBack = () => {
    console.log("back", websiteInfo);
    window.location.href = websiteInfo?.url || "";
    window.close();
  };

  if (!errorMessage) {
    return children;
  }
  return (
    <div>
      <span>{errorMessage}</span>
      <Button onClick={handleBack}>Back</Button>
    </div>
  );
};

export default ErrorWapper;
