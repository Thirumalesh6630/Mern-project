var BASE_URL = "http://localhost:5000/api"

var ApiService = {
  getSnippets: (filters) => {
    var params = new URLSearchParams()
    if (filters.language) {
      params.append("language", filters.language)
    }
    if (filters.tag) {
      params.append("tag", filters.tag)
    }
    if (filters.isPublic) {
      params.append("isPublic", filters.isPublic)
    }
    if (filters.search) {
      params.append("search", filters.search)
    }
    if (filters.collection) {
      params.append("collection", filters.collection)
    }
    var url = BASE_URL + "/snippets"
    if (params.toString()) {
      url = url + "?" + params.toString()
    }
    return fetch(url).then((response) => response.json())
  },

  getSnippet: (id) => fetch(BASE_URL + "/snippets/" + id).then((response) => response.json()),

  createSnippet: (data) =>
    fetch(BASE_URL + "/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json()),

  updateSnippet: (id, data) =>
    fetch(BASE_URL + "/snippets/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json()),

  deleteSnippet: (id) =>
    fetch(BASE_URL + "/snippets/" + id, {
      method: "DELETE",
    }).then((response) => response.json()),

  forkSnippet: (id) =>
    fetch(BASE_URL + "/snippets/" + id + "/fork", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: "anonymous" }),
    }).then((response) => response.json()),

  getCollections: () => fetch(BASE_URL + "/collections").then((response) => response.json()),

  createCollection: (data) =>
    fetch(BASE_URL + "/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json()),

  deleteCollection: (id) =>
    fetch(BASE_URL + "/collections/" + id, {
      method: "DELETE",
    }).then((response) => response.json()),
}

export default ApiService
