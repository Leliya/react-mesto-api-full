import { BASE_URL } from "./const";

let obj

function getResponse(res) {
  obj = { ok: res.ok, status: res.status }
  return res.json()
}

function checkResponse(res) {
  if (obj.ok === false) {
    if (obj.status === 401) {
      return Promise.reject(res.message);
    }
    return Promise.reject(res.message);
  }
  obj = {}
  return res
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponse)
    .then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponse)
    .then(checkResponse);
};

export const signout = () => {
  return fetch(`${BASE_URL}signout`, {
    method: "GET",
    credentials: "include",
  })
    .then(getResponse).then(checkResponse);
};

export const getContent = () => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse)
    .then(checkResponse);
};
