import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

let blog
beforeEach(() => {
  blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'test url',
    author: 'test author',
    likes: 12
  }
  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify({ name: 'test' })
  )
})

test('renders content', () => {
  const { container } = render(<Blog blog={blog} />)

  const title = screen.getByText('Component testing is done with react-testing-library')
  expect(title).toBeDefined()
  const url = container.querySelector('.url')
  expect(url).toBeNull()
  const likes = container.querySelector('.likes')
  expect(likes).toBeNull()

  const author = container.querySelector('.author')
  expect(author).toHaveTextContent('test author')
})

test('shows likes and url when clicking on the button', async () => {
  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const title = container.querySelector('.title')
  expect(title).toHaveTextContent('Component testing is done with react-testing-library')
  const url = container.querySelector('.url')
  expect(url).toHaveTextContent('test url')
  const likes = container.querySelector('.likes')
  expect(likes).toHaveTextContent('12')

  const author = container.querySelector('.author')
  expect(author).toHaveTextContent('test author')
})

test('clicking the button calls event handler once', async () => {

  const mockHandler = jest.fn()
  render(<Blog blog={blog} likeBlog={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})