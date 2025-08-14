import classNames from "classnames";
import type { PropsWithChildren } from "react";

interface BlockCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value?: string;
  rightComp?: React.ReactNode;
}
const BlockCard = ({
  title,
  value,
  children,
  rightComp,
  className = ""
}: PropsWithChildren<BlockCardProps>) => {
  return (
    <div
      className={classNames(
        "space-y-1 rounded-2xl bg-light-grey px-4 py-3.5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-[#0A0A0A] text-base">{title}</span>
        {rightComp}
      </div>
      {children ? (
        children
      ) : (
        <div className="flex items-center gap-1 ">
          <span className="break-all font-normal text-secondary-grey text-xs md:text-sm">
            {value}
          </span>
        </div>
      )}
    </div>
  );
};

export default BlockCard;
