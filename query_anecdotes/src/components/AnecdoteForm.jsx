import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/request";
import {
  useNotificationDispatch,
  handleNotification,
} from "../NotificationContextProvider";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
    onError: (error) =>
      handleNotification(dispatch, "ERROR", error.response.data.error),
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({
      content,
      votes: 0,
    });
    handleNotification(dispatch, "CREATE", content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
