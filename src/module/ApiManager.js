// const localURL = "http://localhost:5002"
const remoteSearchURL = `https://api.themoviedb.org/3/search/multi?api_key=71beceaec7947e27f4fa92aadc09db8c&language=en-US&include_adult=false&query=`
const remoteURL = "http://localhost:5002"
const apiKey = "71beceaec7947e27f4fa92aadc09db8"
const localtoremoteSearchURL = `https://api.themoviedb.org/3/tv/`

export default Object.create(null, {

  getRemoteSearch: {
    value: (item) => {
      return fetch(`${localtoremoteSearchURL}${item}?api_key=${apiKey}&language=en-US`)
        .then(result => result.json())
    }
  },

  get: {
    value: (resource, id) => {
      return fetch(`${remoteSearchURL}/${resource}/${id}`)
        .then(result => result.json())
    }
  },

  getAllAscend: {
    value: (resource) => {
      return fetch(`${remoteSearchURL}/${resource}?_sort=date&_order=asc`)
        .then(result => result.json())
    }
  },

  getUnfinishedTasks: {
    value: (resource) => {
      return fetch(`${remoteSearchURL}/${resource}?isChecked=false&_sort=date&_order=asc`)
        .then(result => result.json())
    }
  },

  getAll: {
    value: (resource) => {
      return fetch(`${remoteSearchURL}/${resource}`)
        .then(result => result.json())
    }
  },

  getAllByUser: {
    value: (resource, credentials) => {
      return fetch(`${remoteSearchURL}/${resource}?userId=${credentials}`)
        .then(result => result.json())
    }
  },

  delete: {
    value: (resource, id) => {
      return fetch(`${remoteSearchURL}/${resource}/${id}`, {
        method: "DELETE"
      }).then(result => result.json())
    }
  },

  add: {
    value: function(resource, newObject) {
      return fetch(`${remoteURL}/${resource}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newObject)
      }).then(e => e.json())
        .then(() => this.all(resource))
    }
  },

  edit: {
    value: (resource, id, item) => {
      return fetch(`${remoteURL}/${resource}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      })
        .then(result => result.json())
    }
  },
  searchNP: {
    value: function (username, password) {
      return fetch(
        `${remoteURL}/users?username=${username}&password=${password}`
      ).then(e => e.json())
    }
  },
  searchUsername: {
    value: function (username) {
      return fetch(`${remoteURL}/users?username=${username}`).then(e =>
        e.json()
      )
    }
  }

})