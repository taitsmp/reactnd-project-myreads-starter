import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router} from 'react-router-dom' // 4.0.0
import App from './App'
import Book from './components/Book'
import renderer from 'react-test-renderer';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Router><App /></Router>, div)
})

// - https://facebook.github.io/jest/docs/snapshot-testing.html
// - Functional components should be testable here.  
// - bad idea? will change too much?

it('renders a book correctly', () => {
  const book = {  title: "The Linux Command Line",
                thumbnail: "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
                id: "nggnmAEACAAJ",
                shelf: "currentlyReading",
      }
  const onUpdateBook = () => {}
  const tree = renderer.create(
    <Book 
    thumbnail={book.thumbnail} 
    title={book.title} 
    author={book.author} 
    shelf={book.shelf}
    id={book.id}
    onUpdateBook={onUpdateBook} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
