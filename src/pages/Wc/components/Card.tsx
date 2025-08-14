import type { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="card-bg mx-auto mt-[58px] w-full max-w-6xl py-12">
      {children}
    </div>
  );
};

export default Card;
