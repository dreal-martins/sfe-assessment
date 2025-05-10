import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal, useUsers } from "../../../hooks";
import Loader from "../../../components/loader";
import Button from "../../../components/button";
import { IUsers } from "../../../interfaces";
import EditUserModal from "../../../components/modal/users/edit";
import { useTranslation } from "react-i18next";

const UserDetails: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    userDetails,
    isUserLoading,
    updatedUser,
    updatingUser,
    handleUpdateUser,
  } = useUsers();
  const [formData, setFormData] = useState<IUsers>(userDetails);

  const { isOpen, closeModal, modalConfig, openModal } = useModal();

  const { name, username, email, address, phone, website, company } =
    userDetails;

  if (isUserLoading || updatingUser) {
    return <Loader />;
  }

  return (
    <div className="h-full bg-dark dark:bg-light dark:text-[#667185] text-white overflow-y-scroll">
      <header className="bg-dark dark:bg-light dark:text-[#667185] text-white py-6">
        <div className="w-full flex items-center gap-4 justify-between px-4">
          <div>
            <h1 className="text-3xl font-bold">
              {updatedUser ? updatedUser.name : name}
            </h1>
            <p className="text-lg">
              @{updatedUser ? updatedUser.username : username}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              label={t("edit")}
              variant="primary"
              onClick={() =>
                openModal({
                  title: "editUser",
                })
              }
            />
            <Button
              label={t("back")}
              variant="secondary"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            {t("contact")} {t("information")}
          </h2>
          <p>
            {t("email")}:{" "}
            <a
              href={`mailto:${updatedUser ? updatedUser.email : email}`}
              className="text-blue-600 underline"
            >
              {updatedUser ? updatedUser.email : email}
            </a>
          </p>
          <p>
            {t("phone")}: {phone}
          </p>
          <p>
            {t("website")}:{" "}
            <a
              href={`http://${updatedUser ? updatedUser.website : website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {updatedUser ? updatedUser.website : website}
            </a>
          </p>
        </section>

        {/* Address */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Address</h2>
          <p>
            {t("street")}:{" "}
            {updatedUser ? updatedUser.address.street : address.street}
          </p>
          <p>
            {t("suite")}:{" "}
            {updatedUser ? updatedUser.address.suite : address.suite}
          </p>
          <p>
            {" "}
            {t("city")}: {updatedUser ? updatedUser.address.city : address.city}
          </p>
          <p>
            {t("zipcode")}:{" "}
            {updatedUser ? updatedUser.address.zipcode : address.zipcode}
          </p>
          <p>
            {t("coordinates")}:{" "}
            {updatedUser ? updatedUser.address.geo.lat : address.geo.lat},{" "}
            {updatedUser ? updatedUser.address.geo.lng : address.geo.lng}
          </p>
        </section>

        {/* Company Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            {t("company")} {t("information")}
          </h2>
          <p>
            {t("name")}: {updatedUser ? updatedUser.company.name : company.name}
          </p>
          <p>
            {t("catchphrase")}:{" "}
            {updatedUser
              ? updatedUser.company.catchPhrase
              : company.catchPhrase}
          </p>
          <p>
            {" "}
            {t("business")}: {updatedUser ? updatedUser.company.bs : company.bs}
          </p>
        </section>
      </main>

      <footer className="bg-dark dark:bg-gray-200 py-4">
        <div className="max-w-4xl px-4 text-center">
          <p>
            &copy; 2025 {t("users")} {t("informationPage")}
          </p>
        </div>
      </footer>

      {modalConfig && (
        <EditUserModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalConfig={modalConfig}
          userInfo={userDetails}
          formData={formData}
          setFormData={setFormData}
          onConfirm={() => {
            handleUpdateUser(formData);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default UserDetails;
