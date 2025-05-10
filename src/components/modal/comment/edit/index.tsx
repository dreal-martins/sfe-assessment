import { useTranslation } from "react-i18next";
import { Modal } from "../..";
import { IComment } from "../../../../interfaces";
import TextAreaField from "../../../textarea";
import TextField from "../../../textfield";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  modalConfig: any;
  commentInfo: IComment;
  onConfirm: () => void;
  formData: IComment;
  setFormData: React.Dispatch<React.SetStateAction<IComment>>;
}

export default function EditCommentModal({
  isOpen,
  closeModal,
  modalConfig,
  formData,
  setFormData,
  onConfirm,
}: Props) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={modalConfig.title}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col gap-2 min-h-full">
        <TextField
          label={t("name")}
          placeholder={t("enterName")}
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label={t("email")}
          placeholder={t("enterEmail")}
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextAreaField
          label={t("body")}
          placeholder={t("enterBody")}
          required
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />
      </div>
    </Modal>
  );
}
