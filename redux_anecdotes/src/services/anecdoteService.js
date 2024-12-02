import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addAnecdote = async (content) => {
  const response = await axios.post(baseUrl, content);
  return response.data;
};

const voteAnecdote = async (id) => {
  // Finding the anecdote with id
  const targetAnecdote = await axios.get(`${baseUrl}/${id}`);
  // initializing a new anecdote object with updated votes
  const updatedVotes = {
    ...targetAnecdote.data,
    votes: targetAnecdote.data.votes + 1,
  };
  // sending a put request to the backend with updated anecdote
  const response = await axios.put(`${baseUrl}/${id}`, updatedVotes);
  return response.data;
};

export default { getAll, addAnecdote, voteAnecdote };
