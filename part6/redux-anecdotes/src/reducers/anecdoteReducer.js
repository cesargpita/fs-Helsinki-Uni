const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      state = state.map(_ => _.id === action.data.id ? action.data : _)
      break;
    case 'NEW_ANECDOTE':
      state = [...state, {...action.data, votes: 0, id: getId()}]
      break;
    default:
      break;
  }
  return state.sort((a, b) => b.votes - a.votes)
}

const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

const voteAnecdote = (content) => {
  return {
    type: 'VOTE',
    data: {...content,
    votes: content.votes + 1}
  }
}

export {anecdotesReducer, createAnecdote, voteAnecdote}