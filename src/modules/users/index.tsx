import UsersTable from "../../components/table/users";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { useUsers } from "../../hooks/useUsers";
import TextField from "../../components/textfield";
import Button from "../../components/button";
import { useEffect, useState } from "react";
import { sortTableData } from "../../utils";
import { IUsers } from "../../interfaces";
import { CiCirclePlus } from "react-icons/ci";
import { useModal } from "../../hooks";
import CreateUserModal from "../../components/modal/users/create";
import Chart from "../../components/charts";
import { useTranslation } from "react-i18next";

export default function Users() {
  const {
    fetchData,
    currentPage,
    itemsPerPage,
    totalPages,
    setItemsPerPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    isFetching,
    isSuccess,
    refetchUser,
    formData: userFormData,
    setFormData: setUserFormData,
    addUser,
    addingUser,
    isFormComplete,
  } = useUsers();
  const {
    closeModal: createUserCloseModal,
    isOpen: createUserIsOpen,
    modalConfig: createUserConfig,
    openModal: createUserOpenModal,
  } = useModal();

  const [sortedData, setSortedData] = useState<IUsers[]>(fetchData);
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess && fetchData) {
      setSortedData(fetchData);
    }
  }, [fetchData, isSuccess]);

  const handleSortByName = () => {
    if (fetchData) {
      const sorted = sortTableData<IUsers>(fetchData, "name");
      setSortedData(sorted);
      refetchUser();
    }
  };

  const handleNewEntry = () => {
    createUserOpenModal({
      title: t("addUser"),
    });
  };

  if (isFetching || addingUser) {
    return <Loader />;
  }

  return (
    <div className="min-h-full flex flex-col gap-12">
      <Chart dataKey={"users"} />
      <section className="bg-dark dark:bg-light rounded-xl shadow p-4 w-full flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold capitalize dark:text-[#667185] text-white">
            {t("users")} {t("table")}
          </h2>

          <Button
            label={t("addUser")}
            size="small"
            onClick={handleNewEntry}
            icon={<CiCirclePlus size={18} />}
            iconPosition="left"
          />
        </div>

        <div className="flex  flex-col md:flex-row gap-4 justify-between items-start md:py-3">
          <div className="w-full md:w-[70%]">
            <TextField
              placeholder={t("searchUser")}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery || ""}
            />
          </div>
          <div className="md:w-[15%]">
            <Button
              label={t("sortByName")}
              className="w-full hidden md:flex  text-sm md:text-base bg-[#ffb616] text-white hover:bg-[#8c640c] p-[8px_16px] font-medium rounded-lg focus:outline-none"
              onClick={handleSortByName}
            />
          </div>
        </div>
        <div className="h-[90%] border-b border-[#eee] py-2 overflow-y-scroll">
          <UsersTable data={sortedData.length > 0 ? sortedData : fetchData} />
        </div>
        {sortedData.length > 0 && (
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
        )}

        {createUserConfig && (
          <CreateUserModal
            isOpen={createUserIsOpen}
            closeModal={createUserCloseModal}
            modalConfig={createUserConfig}
            formData={userFormData}
            setFormData={setUserFormData}
            onConfirm={addUser}
            isFormComplete={isFormComplete}
          />
        )}
      </section>
    </div>
  );
}
