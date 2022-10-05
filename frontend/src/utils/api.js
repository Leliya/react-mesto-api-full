class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    //this._authorization = options.headers.authorization;
  }

  _checkResponse(response) {
    console.log(response.body)
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка: ${response.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      // headers: {
      //   authorization: this._authorization,
      // },
    }).then(this._checkResponse);
  }

  setUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        //authorization: this._authorization,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      }),
    }).then(this._checkResponse);
  }

  setAvatar(input) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        //authorization: this._authorization,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        avatar: input.avatar,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      // headers: {
      //   authorization: this._authorization,
      // },
    }).then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        // authorization: this._authorization,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        // authorization: this._authorization,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then(this._checkResponse);
  }

  changeLikeCard(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      credentials: 'include',
      headers: {
        //authorization: this._authorization,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "http://api.leliya.mesto.nomoredomains.icu",
  headers: {
   // authorization: "3d4f8c04-3648-430b-a07d-7834b6267814",
    "Content-Type": "application/json",
  },
});

export default api;
