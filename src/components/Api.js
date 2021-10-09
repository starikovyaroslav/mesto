export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: {
        authorization: 'd7e22a8b-edd0-4655-a36c-592649df720b'
      }
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: {
        authorization: 'd7e22a8b-edd0-4655-a36c-592649df720b'
      }
    })
      .then(this._checkResponse)
  }

  setUserInfo(data) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'd7e22a8b-edd0-4655-a36c-592649df720b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse)
  }

  addCard(data) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: {
        authorization: 'd7e22a8b-edd0-4655-a36c-592649df720b',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(this._url + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: {
        authorization: 'd7e22a8b-edd0-4655-a36c-592649df720b',
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  like(id) {
    return fetch(this._url + '/cards/likes/' + id, {
      method: 'PUT',
      headers: {
        authorization: 'd7e22a8b-edd0-4655-a36c-592649df720b',
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(this._url + '/cards/likes/' + id, {
      method: 'DELETE',
      headers: {
        authorization: 'd7e22a8b-edd0-4655-a36c-592649df720b',
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
}
