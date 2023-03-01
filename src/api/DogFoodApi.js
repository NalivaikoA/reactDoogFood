/* eslint-disable class-methods-use-this */
class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
  }

  getAuthorizationHeader(token) {
    return `Bearer ${token}`
  }

  async checkToken(token) {
    if (!token) throw new Error('Отсутствует токен')
  }

  async signIn(values) {
    const res = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (res.status === 401) {
      throw new Error('Неверные логин или пароль')
    }
    if (res.status === 404) {
      throw new Error('Пользователь с указанным email не найден')
    }
    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }

    return res.json()
  }

  async signUp(values) {
    const res = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (res.status >= 300) {
      throw new Error(`Ошибка, код ${res.status}`)
    }

    return res.json()
  }

  async addProduct(values, token) {
    this.checkToken(token)

    const res = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (res.status >= 300) {
      throw new Error(
        `Произошла ошибка при добавлении товара, код ${res.status}`,
      )
    }
    return res.json()
  }

  async deleteProduct(productId, token) {
    this.checkToken(token)

    const res = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })
    if (res.status >= 300) {
      throw new Error(
        `${res.status}: Произошла ошибка при удалении товара, код ${res.statusText}.`,
      )
    }
    return res.json()
  }

  async editProduct(productId, data, token) {
    this.checkToken(token)

    const res = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status >= 300) {
      throw new Error(
        `${res.status}: Произошла ошибка при редактировании товара, код ${res.statusText}.`,
      )
    }
    return res.json()
  }

  async addReview(values, id, token) {
    this.checkToken(token)

    const res = await fetch(`${this.baseUrl}/products/review/${id}`, {
      method: 'POST',
      headers: {
        authorization: this.getAuthorizationHeader(token),
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (res.status >= 300) {
      throw new Error(
        `Произошла ошибка при добавлении отзыва, код ${res.status}`,
      )
    }
    return res.json()
  }

  async deleteReview(reviewId, productId, token) {
    this.checkToken(token)

    const res = await fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })

    if (res.status >= 300) {
      throw new Error(
        `Произошла ошибка при добавлении отзыва, код ${res.status}`,
      )
    }
    return res.json()
  }

  async getAllProducts(search, token) {
    this.checkToken(token)

    const res = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })

    if (res.status === 401) {
      throw new Error('Ошибка авторизации')
    }

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении списка продуктов.
        Проверьте отправляемые данные. Status: ${res.status}`)
    }

    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении списка продуктов.
          Попробуйте сделать запрос позже. Status: ${res.status}`)
    }

    return res.json()
  }

  async getProductsByIds(ids, token) {
    this.checkToken(token)
    return Promise.all(
      ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
        headers: {
          authorization: this.getAuthorizationHeader(token),
        },
      }).then((res) => res.json())),
    )
  }

  async getProductById(id, token) {
    this.checkToken(token)

    const res = await fetch(`${this.baseURL}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })

    if (res.status >= 300) {
      throw new Error(`Произошла ошибка, код ${res.status}`)
    }

    return res.json()
  }

  async getProfileInfoByToken(token) {
    this.checkToken(token)

    const res = await fetch(`${this.baseUrl}/v2/sm9/users/me`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      },
    })

    if (res.status === 401) {
      throw new Error('Ошибка авторизации')
    }

    if (res.status >= 400 && res.status < 500) {
      throw new Error(`Произошла ошибка при получении информации о пользователе.
        Проверьте отправляемые данные. Status: ${res.status}`)
    }

    if (res.status >= 500) {
      throw new Error(`Произошла ошибка при получении информации о пользователе.
          Попробуйте сделать запрос позже. Status: ${res.status}`)
    }

    return res.json()
  }
}

export const dogFoodApi = new DogFoodApi({
  baseUrl: 'https://api.react-learning.ru',
})
