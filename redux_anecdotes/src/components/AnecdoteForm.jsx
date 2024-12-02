import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = {
      content,
      votes: 0,
    };
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`${content} was created`, 5));
  };

  return (
    <>
      <div>
        <h2>Create New</h2>
        <form onSubmit={addAnecdote}>
          <input name="anecdote" type="text" />
          <button type="submit">create</button>
        </form>
      </div>
    </>
  );
};

export default AnecdoteForm;
