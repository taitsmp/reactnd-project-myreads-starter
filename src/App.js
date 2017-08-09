import React from 'react'
import * as BooksAPI from './BooksAPI'
import MainPage from './components/MainPage'
import SearchPage from './components/SearchPage'
import { Route } from 'react-router-dom'
import './App.css'

/*
What's left?

* rewatch the lecture on managing state and controlled components.  Did you do search right?
* rewatch any other lectures? 
* consider refactoring so that we just keep the books list in one place 
* review requirements
* I occassionally get a 403 forbidden from the backend.  How best to structure code to handle this? - https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
* Do you need to start this project over from a create-react-app?
* read "thinking in react" and see if you "get it".
* remove the constructor on this page.
* rewrite this in react native.  
*/

class BooksApp extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      books: []
    } 

  } 

  getBook(id) {
    return this.state.books.find(b => b.id === id )
  }

  handleUpdateBook = (id, shelf) => {
    const book = {id: id, shelf: shelf}  //hack
    BooksAPI.update(book, shelf).then( shelves => {
      //shelves is a object with three lists of book ids (currently reading, want to read, read)
      console.log(shelves)
      console.log(this.getBook(id))
      
      //just do reduce?  will return a new array.
      let newBooks = this.state.books.reduce((books, b) => {
        var book

        console.log(books)
        if (b.id === id) {
          book = this.getBook(id)
          book.shelf = shelf
        }
        else
          book = b
        
        return [...books, book]
      }, [])

      console.log('here' + newBooks.length)
      this.setState({books: newBooks})
    })



  }
  
  componentDidMount() {
    BooksAPI.getAll().then( obj => {
      this.setState({ books: obj })
      console.log(obj)
    }) 
    this.setState({ tait: "hi" })
  }  

  render() {
    //had to print the state here not in componentDidMount()
    console.log(this.state);
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage onUpdateBook={this.handleUpdateBook} />
        )} />
        <Route exact path='/' render={() => (
          <MainPage books={this.state.books} onUpdateBook={this.handleUpdateBook} />
        )} />
       
      </div>
    )
  }
}

export default BooksApp
