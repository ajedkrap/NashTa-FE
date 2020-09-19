const initialState = {
  isLoading: false,
  isError: false,
  getEventsMessage: null,
  createEventMessage: null,
  eventData: [],
  pageInfo: {}
}

const event = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_MESSAGE": {
      return {
        ...state,
        getEventsMessage: null,
        createEventMessage: null
      }
    }
    case "GET_EVENTS_PENDING": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "GET_EVENTS_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    case "GET_EVENTS_FULFILLED": {
      const { data, options } = action.payload.data
      return {
        ...state,
        isLoading: false,
        isError: false,
        eventData: data,
        pageInfo: options.pageInfo,
      }
    }
    case "CREATE_EVENT_PENDING": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "CREATE_EVENT_REJECTED": {
      const { response, message } = action.payload
      return {
        ...state,
        isLoading: false,
        isError: true,
        createEventMessage: response !== null ? response.data.message : message
      }
    }
    case "CREATE_EVENT_FULFILLED": {
      const { message } = action.payload.data
      return {
        ...state,
        isLoading: false,
        isError: false,
        createEventMessage: message
      }
    }
    default: {
      return state
    }
  }
}

export default event