import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface BaseModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
}

export default function BaseModal({
  title,
  open,
  onClose,
  onConfirm,
  onReject,
  children
}: React.PropsWithChildren<BaseModalProps>) {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition
      }}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onReject}>Disagree</Button>
        <Button onClick={onConfirm}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
