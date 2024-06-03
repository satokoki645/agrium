import React, { useState } from "react";
import { Typography } from "@mui/material";
import screenIDs from "@my/screenIDs";
import { useCancelRequest } from "@my/action-hooks/yotei";

/** 予定キャンセル確認ダイアログの型定義 */
type YoteiCancelConfirmDialogProps = {
  /** 開閉状態 */
  isOpen: boolean;
  /** キャンセル画面の開閉 */
  setIsOpen: (isOpen: boolean) => void;
  /** 詳細画面の開閉 */
  setIsConfirmOpen: (isOpen: boolean) => void;
  /** 日付 */
  targetDay: string;
};

const YoteiCancelConfirmDialog: React.FC<YoteiCancelConfirmDialogProps> = ({
  isOpen,
  setIsOpen,
  setIsConfirmOpen,
  targetDay,
}) => {
  const [cancelReason, setCancelReason] = useState("");

  const handleCancelRequest = useCancelRequest({
    screenId: screenIDs.S2020_01,
  });

  return (
    <Dialog open={isOpen} onClose={() => setIsConfirmOpen(false)}>
      <DialogContent screenId={screenIDs.S2020_01}>
        <Typography variant="body2">
          {targetDay}のサービスをキャンセルしますか？
        </Typography>
        <Typography variant="body2" color="error">
          （キャンセル料が発生する場合がありますので、ご注意ください）
        </Typography>
        <TextField
          label="キャンセル理由"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="昨晩より発熱が続いているため。"
        />
      </DialogContent>
      <DialogActions>
        <Button
          id="cancel-register-btn"
          onClick={() => {
            setIsOpen(false);
            setIsConfirmOpen(false);
            handleCancelRequest(cancelReason);
          }}
          color="primary"
        >
          キャンセル内容を了承しキャンセルを申し込む。
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default YoteiCancelConfirmDialog;
