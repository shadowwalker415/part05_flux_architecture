import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/request";
import {
  useNotificationDispatch,
  useNotificationValue,
  handleNotification,
} from "./NotificationContextProvider";

const App = () => {
  const dispatch = useNotificationDispatch();
  const notification = useNotificationValue();
  const queryClient = useQueryClient();

  // Fetching anecdotes
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });
  const { isPending, isError, error, data } = result;

  const anecdoteVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const handleVote = (anecdote) => {
    if (notification) return null;
    const targetAnecdote = data.find((anec) => anec.id === anecdote.id);

    const updatedAnecdote = {
      ...targetAnecdote,
      votes: targetAnecdote.votes + 1,
    };
    anecdoteVoteMutation.mutate(updatedAnecdote);
    handleNotification(dispatch, "VOTE", updatedAnecdote.content);
  };

  if (isPending) return <div>Loading...</div>;

  if (isError)
    return <div>{error.message}: anecdote service not available</div>;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
