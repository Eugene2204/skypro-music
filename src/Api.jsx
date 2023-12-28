export async function getAllTracks() {
    return fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/', {
        method: 'GET',
    }).then((response) => {
        return response.json()
    })
}

export async function getFavTracks() {
    return fetch(
        'https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    )
}
export async function setLike(id) {
    return fetch(
        `https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    ).then((response) => {
        if (response.status === 401) {
            refreshToken()
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    localStorage.setItem('accessToken', response.access)
                })
                .then(() => {
                    setLike(id)
                })
        } else if (response.status !== 200) {
            console.log('Произошла ошибка')
        }
    })
}

export async function removeLike(id) {
    return fetch(
        `https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    ).then((response) => {
        if (response.status === 401) {
            refreshToken()
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    localStorage.setItem('accessToken', response.access)
                })
                .then(() => {
                    removeLike(id)
                })
        } else if (response.status !== 200) {
            console.log('Произошла ошибка')
        }
    })
}

export async function getTrack(id) {
    return fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${id}`, {
        method: 'GET',
    })
}
export async function getToken({ email, password }) {
    return fetch('https://skypro-music-api.skyeng.tech/user/token/', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'content-type': 'application/json',
        },
    })
}
export async function refreshToken() {
    return fetch('https://skypro-music-api.skyeng.tech/user/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: localStorage.getItem('refreshToken'),
        }),
        headers: {
            'content-type': 'application/json',
        },
    })
}
export async function login({ email, password }) {
    return fetch('https://skypro-music-api.skyeng.tech/user/login/', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            'content-type': 'application/json',
        },
    })
}
export async function register({ email, password }) {
    return fetch('https://skypro-music-api.skyeng.tech/user/signup/', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            username: email,
        }),
        headers: {
            'content-type': 'application/json',
        },
    })
}