import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote} from '../reducers/anecdoteReducer';
import Filter from './Filter';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      console.log(state);
      if (!state.filters) {
        return state.anecdotes
      }
      return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filters.toLowerCase()))
      })
  const dispatch = useDispatch()

  const vote = (data) => {
    dispatch(voteAnecdote(data))
  }
  return (
    <>
      <Filter/>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList