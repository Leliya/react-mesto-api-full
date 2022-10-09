export const BASE_URL = "https://api.leliya.mesto.nomoredomains.icu/";

function checkResponse(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
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
  }).then(checkResponse);
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
  }).then(checkResponse);
};

export const signout = () => {
  return fetch(`${BASE_URL}signout`, {
    method: "GET",
    credentials: "include",
  }).then(checkResponse);
};

export const getContent = () => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {

    if (!res.ok) {
      if (res.status === 401) {
        return Promise.reject("Пользователь не авторизован");
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json()
  })
  //.then(checkResponse);


};
