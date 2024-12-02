const sortAnecdoteByVotes = (state) => {
  const anecdotes = [...state];
  return [...anecdotes.sort((a, b) => b.votes - a.votes)];
};

export default sortAnecdoteByVotes;
