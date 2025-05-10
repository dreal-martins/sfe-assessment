import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IComment } from "../interfaces";
import { toast } from "sonner";
import { useDebounce } from "./useDebounce";

export interface IFormData {
  name: string;
  email: string;
  body: string;
  postId: number;
  id: number;
}

export function useComments() {
  let num = 1;
  const params = useParams();
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    body: "",
    postId: num + 1,
    id: num + 1,
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
        queryFn: () => fetchComments(currentPage + 1),
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
        queryFn: () => fetchComments(currentPage - 1),
      });
    }
  }, [currentPage, totalPages, itemsPerPage, debouncedSearch, queryClient]);

  const fetchComments = async (
    page: number
  ): Promise<{ data: IComment[]; totalCount: number }> => {
    const url = new URL(`${baseUrl}/comments`);
    url.searchParams.append("_page", page.toString());
    url.searchParams.append("_limit", itemsPerPage.toString());

    if (debouncedSearch) {
      url.searchParams.append("name_like", debouncedSearch);
    }

    const res = await fetch(url.toString());
    const totalCount = res.headers.get("X-Total-Count");
    const data = await res.json();

    return {
      data,
      totalCount: totalCount ? parseInt(totalCount, 10) : 0,
    };
  };

  const createComment = async (newComment: IComment) => {
    const res = await fetch(`${baseUrl}/comments`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res) {
      toast.success("Comment created");
    }
    return res.json();
  };

  const getCommentById = async (id: number): Promise<IComment> => {
    const res = await fetch(`${baseUrl}/comments/${id}`);
    return res.json();
  };

  const updateComment = async (updatedComment: IComment) => {
    const res = await fetch(`${baseUrl}/comments/${updatedComment.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedComment),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res) {
      toast.success("Comment updated");
    }
    return res.json();
  };

  const deleteComment = async (id: number) => {
    const res = await fetch(`${baseUrl}/comments/${id}`, { method: "DELETE" });
    if (res) {
      toast.success("Comment deleted");
    }
    return res.json();
  };

  const {
    data: responseData,
    isLoading,
    isFetching,
    isSuccess,
    refetch: refetchComment,
  } = useSuspenseQuery<{ data: IComment[]; totalCount: number }>({
    queryKey: ["comments", currentPage, itemsPerPage, debouncedSearch],
    queryFn: () => fetchComments(currentPage),
  });

  const data = responseData?.data || [];

  useEffect(() => {
    if (responseData?.totalCount) {
      const pages = Math.ceil(responseData.totalCount / itemsPerPage);
      setTotalPages(pages);
    }
  }, [responseData?.totalCount, itemsPerPage]);

  const { mutate: addComment, isPending: addingComment } =
    useMutation<IComment>({
      mutationFn: async () => {
        return await createComment(formData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments"] });

        setCurrentPage(1);

        setFormData({
          name: "",
          email: "",
          body: "",
          postId: 1,
          id: 1,
        });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.error ||
          error.message ||
          "Failed to Add Comment.";
        alert(errorMessage);
      },
    });

  const { data: commentDetails, isLoading: isCommentLoading } =
    useSuspenseQuery<IComment>({
      queryKey: ["comment", params.id],
      queryFn: () => getCommentById(Number(params.id)),
    });

  const {
    mutate: updateCommentById,
    isPending: updatingComment,
    data: updatedComment,
  } = useMutation({
    mutationFn: async (updatedComment: IComment) => {
      return await updateComment(updatedComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const {
    mutate: removeComment,
    isPending: removingComment,
    data: removedComment,
  } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteComment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleAddComment = () => {
    addComment();
  };

  const handleUpdateComment = (updatedComment: IComment) => {
    updateCommentById(updatedComment);
  };

  const handleDeleteComment = (id: number) => {
    removeComment(id);
  };

  return {
    isSuccess,
    refetchComment,
    data,
    isLoading,
    isFetching,
    currentPage,
    totalPages,
    itemsPerPage,
    formData,
    addingComment,
    commentDetails,
    isCommentLoading,
    updatingComment,
    updatedComment,
    searchQuery,
    setSearchQuery,
    handleUpdateComment,
    removingComment,
    handleDeleteComment,
    removedComment,
    setFormData,
    addComment,
    handleAddComment,
    handleNext,
    handlePrev,
    setCurrentPage,
    setItemsPerPage,
  };
}
