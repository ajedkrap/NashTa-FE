const initialState = {
  isLoading: false,
  isError: false,
  participantsData: [],
  participantsSelect: []
}

const participant = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PARTICIPANTS_PENDING":
      return {
        ...state,
        isLoading: true,
      }
    case "GET_PARTICIPANTS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    case "GET_PARTICIPANTS_FULFILLED":
      const { data } = action.payload.data
      const select = data.map(par => ({
        value: par.id,
        label: par.name,
        detail: par
      }))
      return {
        ...state,
        isLoading: false,
        isError: false,
        participantsData: data,
        participantsSelect: select
      }
    default:
      return state
  }
}

export default participant