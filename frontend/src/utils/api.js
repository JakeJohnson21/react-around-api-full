class Api {
  constructor({ address }) {
    this._address = address;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  //__________________________________________________________________________
  //
  getAppInfo(token) {
    return Promise.all([
      this.getInitialCards(token),
      this.getProfileInfo(token),
    ]);
  }
  //__________________________________________________________________________
  //
  getInitialCards(token) {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  getProfileInfo(token) {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  updateProfile({ name, about }, token) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  updateProfilePicture({ avatar }, token) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  postNewCard({ name, link }, token) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  deleteCard(cardId, token) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }
  //__________________________________________________________________________
  //
  // changeLikeCardStatus(cardId, isLiked) {
  //   return isLiked ? this.addLike(cardId) : this.removeLike(cardId);
  // }
  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._getResponseData(res));
  }

  // addLike(cardId) {
  //   return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
  //     method: "PUT",
  //     headers: this._headers,
  //   }).then((res) => this._getResponseData(res));
  // }
  // //__________________________________________________________________________
  // //
  // removeLike(cardId) {
  //   return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then((res) => this._getResponseData(res));
  // }
  //__________________________________________________________________________
  //
  getUserInfo(token) {
    return fetch(`${this._address}/users`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  address: process.env.REACT_APP_BASE_URL,
});

export default api;
