import React from "react";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  errorCode: 400 | 404;
  errorMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, errorMessage }) => {
  const navigate = useNavigate();

  const defaultMessages: Record<number, string> = {
    400: "Bad Request. Something went wrong.",
    404: "Page Not Found. The page you're looking for doesn't exist.",
  };

  const message = errorMessage || defaultMessages[errorCode];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-extrabold text-[#ffb616]">{errorCode}</h1>
      <p className="text-2xl font-semibold mt-4">{message}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 text-white font-medium rounded-md"
        style={{ backgroundColor: "#ffb616" }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
