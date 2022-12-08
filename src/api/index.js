import axios from "./axios";
import store from "@/store";
import { PLATFORM_API_BASE_URL } from "@/config/channel";
import { BearerToken } from "@/utils";
import i18n, { defaultLocale } from "@/locales";

// const baseURL = "https://stg-wsapi.coverspick.com";
const baseURL = PLATFORM_API_BASE_URL;

export function get(url, payload) {
  const token = BearerToken(store.state.auth.token ?? null);
  const locale = i18n.global.locale.value ?? defaultLocale;
  const options = {
    method: "get",
    baseURL,
    url,
    params: payload,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
      lang: locale,
      Authorization: token,
    },
  };

  return axios(options);
}

export function post(url, payload) {
  const token = BearerToken(store.state.auth.token ?? null);

  const locale = i18n.global.locale.value ?? defaultLocale;
  const options = {
    method: "post",
    baseURL,
    url,
    data: payload,
    headers: {
      lang: locale,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
      Authorization: token,
    },
  };

  return axios(options);
}
export function $post(url, payload) {
  const locale = i18n.global.locale.value ?? defaultLocale;

  const options = {
    method: "post",
    baseURL,
    url,
    data: payload,
    headers: {
      lang: locale,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  };

  return axios(options);
}

export function $get(url, payload) {
  const locale = i18n.global.locale.value ?? defaultLocale;
  const options = {
    method: "get",
    baseURL,
    url,
    params: payload,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
      lang: locale,
    },
  };

  return axios(options);
}

export function postFile(url, payload) {
  const token = BearerToken(store.state.auth.token ?? null);

  const locale = i18n.global.locale.value ?? defaultLocale;
  const options = {
    method: "post",
    baseURL,
    url,
    data: payload,
    headers: {
      lang: locale,
      "Content-Type": "multipart/form-data; charset=utf-8", // This is different from general post
      "Cache-Control": "no-cache",
      Authorization: token,
    },
  };
  return axios(options);
}
