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
  })
    .then(checkResponse)
    // .then((data) => {
    //   if (data.token) {
    //     localStorage.setItem("jwt", data.token);
    //     return data;
    //   } else {
    //     return;
    //   }
    // });
};

export const signout = () => {
  return fetch(`${BASE_URL}signout`, {
    method: "GET",
    credentials: "include",
  }).then(checkResponse);
};

//export const getContent = (token) => {
export const getContent = () => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
  //    Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if(res.status===401){
      return Promise.reject("Пользователь не авторизован");
    }
    if(!res.ok){
      return Promise.rejectPromise.reject(`Ошибка: ${res.status}`);
    }
    return res.json()
  })
};
