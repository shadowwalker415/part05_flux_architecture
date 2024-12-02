import { useSelector, shallowEqual } from "react-redux";

const Notification = () => {
  const nofiticationMessage = useSelector(
    (state) => state.notification,
    shallowEqual
  );
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{nofiticationMessage}</div>;
};

export default Notification;
