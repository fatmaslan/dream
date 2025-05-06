import axios from "axios";

export const refreshAccessToken = async (): Promise<string | null> => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
      refresh,
    });
    const { access } = response.data;

    localStorage.setItem("access", access);
    return access;
  } catch (error) {
    console.error("Token yenileme başarısız:", error);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    return null;
  }
};