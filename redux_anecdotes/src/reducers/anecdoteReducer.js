import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdotes(state, action) {
      return [
        ...state.map((anecdote) =>
          anecdote.id !== action.payload.id ? anecdote : action.payload
        ),
      ];
    },
  },
});

export const { appendAnecdote, updateAnecdotes, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

//
export const voteAnecdoteOf = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id);
    dispatch(updateAnecdotes(votedAnecdote));
  };
};

export default anecdoteSlice.reducer;
