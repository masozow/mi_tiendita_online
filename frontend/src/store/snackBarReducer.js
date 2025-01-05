const snackbarReducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        open: true,
        message: action.message,
        severity: action.severity,
      };
    case "CLOSE":
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
