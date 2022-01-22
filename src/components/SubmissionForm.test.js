import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SubmissionForm from './SubmissionForm'

test('<SubmissionForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <SubmissionForm submission={addBlog} />
  )

  const title = component.container.querySelector('.titleInput')
  const author = component.container.querySelector('.authorInput')
  const url = component.container.querySelector('.urlInput')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Testing the Tests that Test Us' }
  })
  fireEvent.change(author, {
    target: { value: 'Blog Tester' }
  })
  fireEvent.change(url, {
    target: { value: 'www.blogs.test' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Testing the Tests that Test Us')
  expect(addBlog.mock.calls[0][0].author).toBe('Blog Tester')
  expect(addBlog.mock.calls[0][0].url).toBe('www.blogs.test')
})