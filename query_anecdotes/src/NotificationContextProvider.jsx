import { useReducer, createContext, useContext } from "react";

const initialState = null;

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `${action.payload} voted`;
    case "CREATE":
      return `${action.payload} was created`;
    case "ERROR":
      return action.payload;
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const notificationContext = createContext();

// This is a react custom hook
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(notificationContext);
  return notificationAndDispatch[0];
};

// This is a react custom hook
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(notificationContext);
  return notificationAndDispatch[1];
};

export const handleNotification = (dispatch, type, payload) => {
  dispatch({ type, payload });
  setTimeout(() => {
    dispatch({ type: "RESET" });
  }, 5000);
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </notificationContext.Provider>
  );
};

export default notificationContext;
