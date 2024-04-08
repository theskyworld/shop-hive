import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { UNKNOWN_ERROR } from "../../assets/ts/constants";
export default function useRequest<D>(config: Partial<AxiosRequestConfig>) {
  const [data, setData] = useState<D | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function request() {
    // 清空之前请求的状态和数据
    setData(null);
    setError("");
    setIsLoading(true);
    // 发送请求
    return axios
      .request<D>(config)
      .then((res) => {
        setData(res.data);
        return res.data;
      })
      .catch((err) => {
        setError(err.message || UNKNOWN_ERROR);
        throw new Error(err.message || UNKNOWN_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return { data, error, isLoading, request };
}
