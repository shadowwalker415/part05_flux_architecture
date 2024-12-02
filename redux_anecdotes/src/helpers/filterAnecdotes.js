const filterAnecdotes = (anecdotes, keyword) => {
  const filtered = [];
  let i;
  i = 0;
  while (i < anecdotes.length) {
    if (anecdotes[i].content.toLowerCase().includes(keyword)) {
      filtered.push(anecdotes[i]);
    }
    i++;
  }
  return filtered;
};

export default filterAnecdotes;
