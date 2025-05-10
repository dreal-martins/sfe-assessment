import { useTranslation } from "react-i18next";
import { Modal } from "../..";
import { IUserFormData } from "../../../../interfaces";
import TextField from "../../../textfield";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  modalConfig: any;
  onConfirm: () => void;
  formData: IUserFormData;
  setFormData: React.Dispatch<React.SetStateAction<IUserFormData>>;
  isFormComplete: () => string;
}

export default function CreateUserModal({
  isOpen,
  closeModal,
  modalConfig,
  formData,
  setFormData,
  onConfirm,
  isFormComplete,
}: Props) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={modalConfig.title}
      onConfirm={onConfirm}
      disabled={!isFormComplete()}
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
          label={t("username")}
          placeholder={t("enterUsername")}
          required
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <TextField
          label={t("email")}
          placeholder={t("enterEmail")}
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg">Address</h1>
          <TextField
            label={t("street")}
            placeholder={t("enterStreet")}
            required
            value={formData.address.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, street: e.target.value },
              })
            }
          />
          <TextField
            label={t("suite")}
            placeholder={t("enterSuite")}
            required
            value={formData.address.suite}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, suite: e.target.value },
              })
            }
          />
          <TextField
            label={t("city")}
            placeholder={t("enterCity")}
            required
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, city: e.target.value },
              })
            }
          />
          <TextField
            label={t("zipcode")}
            placeholder={t("enterZipcode")}
            required
            value={formData.address.zipcode}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, zipcode: e.target.value },
              })
            }
          />
          <div className="">
            <TextField
              label="Lat"
              placeholder={t("enterLat")}
              required
              value={formData.address.geo.lat}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    geo: { ...formData.address.geo, lat: e.target.value },
                  },
                })
              }
            />
            <TextField
              label="Lng"
              placeholder={t("enterLng")}
              required
              value={formData.address.geo.lng}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    geo: { ...formData.address.geo, lng: e.target.value },
                  },
                })
              }
            />
          </div>
          <TextField
            label={t("phone")}
            placeholder={t("enterPhone")}
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <TextField
            label={t("website")}
            placeholder={t("enterWebsite")}
            required
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg">Company</h1>
          <TextField
            label={t("name")}
            placeholder={t("enterName")}
            required
            value={formData.company.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, name: e.target.value },
              })
            }
          />
          <TextField
            label={t("catchphrase")}
            placeholder={t("enterCatchPhrase")}
            required
            value={formData.company.catchPhrase}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, catchPhrase: e.target.value },
              })
            }
          />
          <TextField
            label={t("business")}
            placeholder={t("enterBusiness")}
            required
            value={formData.company.bs}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, bs: e.target.value },
              })
            }
          />
        </div>
      </div>
    </Modal>
  );
}
