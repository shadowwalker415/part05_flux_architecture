import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      if (action.type === undefined) return state;
      return action.payload;
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(removeNotification());
    }, 1000 * seconds);
    dispatch(createNotification(message));
  };
};
export default notificationSlice.reducer;
