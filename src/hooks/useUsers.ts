import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IUserFormData, IUsers } from "../interfaces";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "./useDebounce";
import { useTranslation } from "react-i18next";

export function useUsers() {
  const params = useParams();
  const { t } = useTranslation();

  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<IUserFormData>({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (currentPage < totalPages) {
      const nextPageKey = [
        "comments",
        currentPage + 1,
        itemsPerPage,
        debouncedSearch,
      ];
      queryClient.ensureQueryData({
        queryKey: nextPageKey,
        queryFn: () => fetchUsers(currentPage + 1),
      });
    }

    if (currentPage > 1) {
      const prevPageKey = [
        "comments",
        currentPage - 1,
        itemsPerPage,
        debouncedSearch,
      ];
      queryClient.ensureQueryData({
        queryKey: prevPageKey,
        queryFn: () => fetchUsers(currentPage - 1),
      });
    }
  }, [currentPage, totalPages, itemsPerPage, debouncedSearch, queryClient]);

  const fetchUsers = async (
    page: number
  ): Promise<{ data: IUsers[]; totalCount: number }> => {
    const url = new URL(`${baseUrl}/users`);
    url.searchParams.append("_page", page.toString());
    url.searchParams.append("_limit", itemsPerPage.toString());

    if (debouncedSearch) {
      url.searchParams.append("username_like", debouncedSearch);
    }

    const res = await fetch(url.toString());
    const totalCount = res.headers.get("X-Total-Count");
    const data = await res.json();

    return {
      data,
      totalCount: totalCount ? parseInt(totalCount, 10) : 0,
    };
  };

  const createUser = async (newUser: IUserFormData) => {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res) {
      toast.success(t("userCreated"));
    }
    return res.json();
  };

  const getUserById = async (id: number): Promise<IUsers> => {
    const res = await fetch(`${baseUrl}/users/${id}`);
    return res.json();
  };

  const updateUser = async (updatedUser: IUsers) => {
    const res = await fetch(`${baseUrl}/users/${updatedUser.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res) {
      toast.success(t("userUpdated"));
    }
    return res.json();
  };

  const isFormComplete = () => {
    return (
      formData.name &&
      formData.username &&
      formData.email &&
      formData.address.street &&
      formData.address.suite &&
      formData.address.city &&
      formData.address.zipcode &&
      formData.address.geo.lat &&
      formData.address.geo.lng &&
      formData.phone &&
      formData.website &&
      formData.company.name &&
      formData.company.catchPhrase &&
      formData.company.bs
    );
  };

  const {
    data: responseData,
    isLoading,
    isFetching,
    isSuccess,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["users", currentPage, itemsPerPage, debouncedSearch],
    queryFn: () => fetchUsers(currentPage),
  });
  const data = responseData?.data || [];

  useEffect(() => {
    if (responseData?.totalCount) {
      const pages = Math.ceil(responseData.totalCount / itemsPerPage);
      setTotalPages(pages);
    }
  }, [responseData?.totalCount, itemsPerPage]);

  const { data: userDetails, isLoading: isUserLoading } =
    useSuspenseQuery<IUsers>({
      queryKey: ["user", params.id],
      queryFn: () => getUserById(Number(params.id)),
    });

  const { mutate: addUser, isPending: addingUser } = useMutation<IUsers>({
    mutationFn: async () => {
      return await createUser(formData);
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData<IUsers[]>(
        ["users", currentPage, itemsPerPage],
        (oldUsers) => [newUser, ...(oldUsers || [])]
      );

      setFormData({
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      });
    },

    onError: () => {
      toast.error("Can't create a user. Try again later.");
    },
  });

  const {
    mutate: updateUserById,
    isPending: updatingUser,
    data: updatedUser,
  } = useMutation({
    mutationFn: async (updatedUser: IUsers) => {
      return await updateUser(updatedUser);
    },
    onSuccess: (updatedUser: IUsers) => {
      return updatedUser;
    },
  });

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleUpdateUser = (updatedUser: IUsers) => {
    updateUserById(updatedUser);
  };

  return {
    isSuccess,
    refetchUser,
    isFetching,
    fetchData: data,
    isLoading,
    currentPage,
    totalPages,
    itemsPerPage,
    formData,
    addingUser,
    userDetails,
    isUserLoading,
    updatingUser,
    updatedUser,
    searchQuery,
    fetchUsers,
    setSearchQuery,
    handleUpdateUser,
    setFormData,
    addUser,
    handleNext,
    handlePrev,
    setCurrentPage,
    setItemsPerPage,
    isFormComplete,
  };
}
