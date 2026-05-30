import axios from "axios";

interface AxiosResponse {
  status: string;
}

const backendDomain = (import.meta.env.VITE_BACKEND_DOMAIN ?? "").replace(
  /\/+$/,
  "",
);
const baseUrl = (import.meta.env.VITE_BASE_URL ?? "").replace(/^\/+|\/+$/g, "");
const apiBaseUrl = `${backendDomain}/${baseUrl}`;

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("Error from axios interceptors:-", error);
    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${apiBaseUrl}/auth/get-refreshtoken`,
          {},
          {
            withCredentials: true,
          },
        );

        if (!((response.data as AxiosResponse).status === "OK")) {
          throw new Error("Failed to refresh token");
        }

        if (response.data?.data?.accessToken) {
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          api.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("accessToken");
        window.location.href = "/signin";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export { api };
