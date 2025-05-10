import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { useComments, useModal } from "../../../hooks";
import Loader from "../../../components/loader";
import EditCommentModal from "../../../components/modal/comment/edit";
import { IComment } from "../../../interfaces";
import { useTranslation } from "react-i18next";

const CommentDetails: React.FC = () => {
  const navigate = useNavigate();
  const {
    commentDetails,
    isCommentLoading,
    updatingComment,
    updatedComment,
    handleUpdateComment,
  } = useComments();
  const { isOpen, closeModal, modalConfig, openModal } = useModal();
  const [formData, setFormData] = useState<IComment>(commentDetails);
  const { t } = useTranslation();

  const { id, name, email, body, postId } = commentDetails;

  if (isCommentLoading || updatingComment) {
    return <Loader />;
  }

  return (
    <div className="h-full bg-dark dark:bg-light dark:text-[#667185] text-white  overflow-y-scroll">
      <header className=" bg-dark dark:bg-light dark:text-[#667185] text-white py-6">
        <div className="w-full flex flex-col md:flex-row md:items-center gap-4 md:justify-between px-4">
          <div>
            <h1 className="text-3xl font-bold">
              {t("comments")} {t("details")}
            </h1>
            <p className="text-lg">
              {t("comments")} ID: {postId}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              label={t("edit")}
              variant="primary"
              onClick={() =>
                openModal({
                  title: "editComment",
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
            {t("comments")} {t("metadata")}
          </h2>
          <p>ID: {id}</p>

          <p>
            {" "}
            {t("comments")} ID: {updatedComment ? updatedComment.id : postId}
          </p>
          <p>
            {t("author")} {t("email")}:{" "}
            <a
              href={`mailto:${updatedComment ? updatedComment.email : email}`}
              className="text-blue-600 underline"
            >
              {updatedComment ? updatedComment.email : email}
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            {t("comments")} {t("content")}
          </h2>
          <h3 className="text-xl font-medium mb-2">
            {updatedComment ? updatedComment.name : name}
          </h3>
          <p className="whitespace-pre-line">
            {updatedComment ? updatedComment.body : body}
          </p>
        </section>
      </main>

      <footer className="bg-dark dark:bg-gray-200 py-4">
        <div className="max-w-4xl px-4 text-center">
          <p>
            &copy; 2025 {t("comments")} {t("detailsPage")}
          </p>
        </div>
      </footer>

      {modalConfig && (
        <EditCommentModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalConfig={modalConfig}
          commentInfo={commentDetails}
          formData={formData}
          setFormData={setFormData}
          onConfirm={() => {
            handleUpdateComment(formData);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default CommentDetails;
