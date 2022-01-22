import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    author: 'Blog Tester',
    title: 'Testing the Tests that Test Us',
    url: 'www.blogs.test',
    user: { name: 'Blog Tester', username: 'BlogTester' }
  }

  const component = render(
    <Blog blog={blog} user={{ name: 'Blog Tester' }}/>
  )

  expect(component.container).toHaveTextContent(
    'Testing the Tests that Test Us'
  )
})

test('renders title/auth, not url/likes', () => {
  const blog = {
    author: 'Blog Tester',
    title: 'Testing the Tests that Test Us',
    url: 'www.blogs.test',
    user: { name: 'Blog Tester', username: 'BlogTester' }
  }

  const component = render(
    <Blog blog={blog} user={{ name: 'Blog Tester' }}/>
  )

  const div = component.container.querySelector('.togglableContent')

  expect(div).toHaveStyle(
    'display: none'
  )
})

test('clicking show renders likes and url', () => {
  const blog = {
    author: 'Blog Tester',
    title: 'Testing the Tests that Test Us',
    url: 'www.blogs.test',
    user: { name: 'Blog Tester', username: 'BlogTester' }
  }

  const component = render(
    <Blog blog={blog} user={{ name: 'Blog Tester' }}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  const div = component.container.querySelector('.togglableContent')


  expect(div).not.toHaveStyle(
    'display: none'
  )
})

test('clicking the like button twice calls the event handler twice', () => {
  const blog = {
    author: 'Blog Tester',
    title: 'Testing the Tests that Test Us',
    url: 'www.blogs.test',
    user: { name: 'Blog Tester', username: 'BlogTester' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={{ name: 'Blog Tester' }} likes={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})