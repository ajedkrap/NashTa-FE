import http from "../../helper/http"
import qs from 'querystring'

const { REACT_APP_URL } = process.env

export const getEvents = (param = null) => {
  const params = `${qs.stringify(param)}`
  const url = `${REACT_APP_URL}event?${params}`
  return {
    type: 'GET_EVENTS',
    payload: http().get(url)
      .then(res => res)
      .catch(error => {
        if (error) {
          throw error
        }
      })
  }
}

export const createEvent = (data) => {
  const url = `${REACT_APP_URL}event`
  return {
    type: 'CREATE_EVENT',
    payload: http(null, "form").post(url, data)
      .then(res => {
        const { status, message } = res.data
        if (!status) {
          throw new Error(message)
        }
        return res
      })
      .catch(error => {
        if (error) {
          throw error
        }
      })
  }
}

export const clearMessage = () => ({
  type: "CLEAR_MESSAGE"
})
