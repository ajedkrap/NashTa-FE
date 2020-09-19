import http from "../../helper/http"

const { REACT_APP_URL } = process.env

export const getParticipants = () => {
  const url = `${REACT_APP_URL}participant`
  console.log(url)
  return {
    type: 'GET_PARTICIPANTS',
    payload: http().get(url)
      .then(res => res)
      .catch(error => {
        if (error) {
          throw error
        }
      })
  }
}