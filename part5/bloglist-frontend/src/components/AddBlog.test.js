import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlog from './AddBlog'
import userEvent from '@testing-library/user-event'

beforeEach(() => {
  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify({ name: 'test' })
  )
})

test('<AddBlog /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn(() => ({ data: {} }))
  const setBlogs = jest.fn()
  const showMessage = jest.fn()
  const user = userEvent.setup()

  render(<AddBlog createBlog={createBlog} blogs={[]} setBlogs={setBlogs} showMessage={showMessage} />)
  const viewButton = screen.getByText('new note')
  await user.click(viewButton)

  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'testing a form title...')
  const sendButton = screen.getByText('create')

  await user.type(inputs[1], 'testing a form url...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form title...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form url...')
})