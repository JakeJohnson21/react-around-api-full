class Api {
  constructor() {
    this._baseUrl = "http://www.aroundJake.students.nomoredomainssbs.ru/";
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
  //__________________________________________________________________________
  //
  getInitialCards(token) {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: `Bearer" ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  getProfileInfo(token) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: `Bearer" ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  updateProfile({ user }, token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer" ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  updateProfilePicture({ user }, token) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer" ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: user.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  postNewCard({ newCard }, token) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer" ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer" ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  changeLikeCardStatus(cardId, isLiked, token) {
    return isLiked ? this.addLike(cardId) : this.removeLike(cardId);
  }
  addLike(cardId, token) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer" ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  removeLike(cardId, token) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer" ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  getUserInfo() {
    return fetch(`${this._baseUrl}users`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "4661177c-aa9a-4f93-9cdc-32dae0d4e0e3",
    "Content-Type": "application/json",
  },
});

export default api;
