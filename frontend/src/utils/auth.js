import { BaseUrl } from "./config";

export const BASE_URL = BaseUrl;
const processResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Error: ${res.status}`);
};
const authFetch = ({ url, method, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(processResponse);
};

export const register = (email, password) =>
  authFetch({
    url: "/signup",
    method: "POST",
    data: { email, password },
  });

export const login = (email, password) =>
  authFetch({
    url: "/signin",
    method: "POST",
    data: { email, password },
  }).then((data) => {
    localStorage.setItem("jwt", data.jwt);
    localStorage.setItem("email", email);
    return data;
  });

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(processResponse)
    .then((data) => data);
};
