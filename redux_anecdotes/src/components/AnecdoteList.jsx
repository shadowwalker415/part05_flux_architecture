import { voteAnecdoteOf } from "../reducers/anecdoteReducer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import sortAnecdoteByVotes from "../helpers/sortAnecdoteByVote";
import filterAnecdotes from "../helpers/filterAnecdotes";
import Filter from "./Filter";
import Notification from "./Notification";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const notificationMessage = useSelector(
    (state) => state.notification,
    shallowEqual
  );
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    }
    return filterAnecdotes(state.anecdotes, state.filter);
  }, shallowEqual);
  const sortedAnecdotes = sortAnecdoteByVotes(anecdotes);

  return (
    <>
      <div>
        <h2>Acnecdotes</h2>
        {notificationMessage && <Notification />}
        {!notificationMessage && <Filter />}
        {sortedAnecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  dispatch(voteAnecdoteOf(anecdote.id));
                  dispatch(setNotification(`you voted ${anecdote.content}`, 5));
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnecdoteList;
