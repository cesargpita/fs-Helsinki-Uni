import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote} from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (data) => {
    dispatch(voteAnecdote(data))
  }
  return (
    <>
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