import qs from "qs";
import * as SecureStore from "expo-secure-store";
import { API_BACKEND } from "@/constants/config";

export const BASE_URL = `${API_BACKEND}/api/v1`;

interface ApiCallOptions {
  method?: string;
  isAuth?: boolean;
  body?: object | null;
  queryParam?: object | null;
  next?: object | null;
  formData?: FormData | null;
  headers?: any;
  recieveResponse?: boolean;
}

export const apiCall = async (
  path: string,
  {
    method = "GET",
    isAuth = true,
    body = null,
    queryParam = null,
    formData = null,
    next = null,
    headers = {},
    recieveResponse = true,
  }: ApiCallOptions = {}
) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");

  let requestUrl = `${BASE_URL}${path}/`;

  const req: any = {
    method: method,
  };

  if ((method === "POST" || method === "PATCH") && body) {
    req["body"] = JSON.stringify(body);
    if (headers["Content-Type"]) {
    } else {
      headers["Content-Type"] = "application/json";
    }
  }
  if ((method === "POST" || method === "PATCH") && formData) {
    req["body"] = formData;
    headers["accept"] = "application/json";
  }
  if (method === "DELETE") {
    headers["accept"] = "application/json";
  }

  if (queryParam) {
    const encodedQueryString = qs.stringify(queryParam, {
      encodeValuesOnly: true,
      encode: false,
    });
    requestUrl += `?${encodedQueryString}`;
  }

  if (isAuth) {
    headers["Authorization"] = `Token ${accessToken}`;
  }

  req["headers"] = headers;

  if (next) {
    req["next"] = next;
  }

  let res;
  try {
    res = await fetch(requestUrl, req);
  } catch {
    return false;
  }

  if (method === "GET" || recieveResponse) {
    return await res.json();
  } else return res.ok;
};

export const verifyQR = async (data: { id: string }) => {
  const res = await apiCall("/qrverify/scan", {
    method: "POST",
    body: data,
    recieveResponse: true,
  });
  return res;
};
