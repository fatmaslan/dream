"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type SuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const SuccessModal = ({ open, onOpenChange }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] text-center">
        <DialogHeader>
          <DialogTitle> Ürün Sepete Eklendi </DialogTitle>
        </DialogHeader>
        <p className="mt-2 text-gray-500">Sepetinizi kontrol etmeyi unutmayın!</p>
      </DialogContent>
    </Dialog>
  );
};
