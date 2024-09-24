import { toast } from "react-toastify";

export const login = async (data: { email: string; password: string }) => {
  const queryParams = new URLSearchParams({
    email: data.email,
    password: data.password,
  }).toString();

  const response = await fetch(`/api/user?${queryParams}`, {
    method: "GET", // Change to GET
    headers: {
      "Content-Type": "application/json", // This header can be omitted for GET requests
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    toast.error(errorData.error);
    throw new Error(errorData.error || "Login failed");
  }

  const result = await response.json();
  return result;
};
