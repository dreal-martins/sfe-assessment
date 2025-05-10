import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import CommentsTable from "../../components/table/comments";
import TextField from "../../components/textfield";
import { useComments } from "../../hooks/useComments";
import { IComment } from "../../interfaces";
import { sortTableData } from "../../utils";
import Button from "../../components/button";
import { CiCirclePlus } from "react-icons/ci";
import { useModal } from "../../hooks";
import CreateCommentModal from "../../components/modal/comment/create";
import Chart from "../../components/charts";
import { useTranslation } from "react-i18next";

export default function Comments() {
  const {
    data,
    isFetching,
    currentPage,
    itemsPerPage,
    totalPages,
    setItemsPerPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    refetchComment,
    isSuccess,
    formData: commentFormData,
    setFormData: setCommentFormData,
    handleAddComment,
    addingComment,
  } = useComments();

  const {
    closeModal: createCommentCloseModal,
    isOpen: createCommentIsOpen,
    modalConfig: createCommentConfig,
    openModal: createCommentOpenModal,
  } = useModal();

  const [sortedData, setSortedData] = useState<IComment[]>(data);
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess && data) {
      setSortedData(data);
    }
  }, [data, isSuccess]);

  const handleSortByEmail = () => {
    const sorted = sortTableData<IComment>(sortedData, "email");
    setSortedData(sorted);
    refetchComment();
  };

  const handleNewEntry = () => {
    createCommentOpenModal({
      title: t("addComment"),
    });
  };

  if (isFetching || addingComment) {
    return <Loader />;
  }

  return (
    <div className="min-h-full flex flex-col gap-12">
      <Chart dataKey={"comments"} />

      <section className="bg-dark dark:bg-light rounded-xl shadow p-4 w-full flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3">
          <h2 className="text-lg font-semibold capitalize dark:text-[#667185] text-white ">
            {t("comment")} {t("table")}
          </h2>

          <Button
            label={t("addComment")}
            size="small"
            onClick={handleNewEntry}
            icon={<CiCirclePlus size={18} />}
            iconPosition="left"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:py-3">
          <div className="w-full md:w-[70%]">
            <TextField
              placeholder={t("searchComment")}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery || ""}
            />
          </div>
          <div className="md:w-[15%]">
            <Button
              label={t("sortByEmail")}
              className="w-full hidden md:flex text-sm md:text-base bg-[#ffb616] text-white hover:bg-[#8c640c] p-[8px_16px] font-medium rounded-lg focus:outline-none"
              onClick={handleSortByEmail}
            />
          </div>
        </div>

        <div className="h-[90%] py-2 overflow-y-scroll">
          <CommentsTable data={sortedData.length > 0 ? sortedData : data} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onRowsPerPageChange={(rows) => {
            setItemsPerPage(rows);
            setCurrentPage(1);
          }}
        />

        {createCommentConfig && (
          <CreateCommentModal
            isOpen={createCommentIsOpen}
            closeModal={createCommentCloseModal}
            modalConfig={createCommentConfig}
            formData={commentFormData}
            setFormData={setCommentFormData}
            onConfirm={handleAddComment}
          />
        )}
      </section>
    </div>
  );
}
