import axios from 'axios'

export default (token = null, content = "") => {
  if (token) {
    return axios.create({
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': content === "form" ?
          "multipart/form-data" : "application/x-www-form-urlencoded"
      }
    })
  }
  else {
    return axios.create({
      headers: {
        'Content-Type': content === "form" ?
          "multipart/form-data" : "application/x-www-form-urlencoded"
      }
    })
  }
}