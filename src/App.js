import React from 'react'
import * as BooksAPI from './BooksAPI'
import MainPage from './components/MainPage'
import SearchPage from './components/SearchPage'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  /*
  This function used by MainPage and SearchPage.  It updates the book on the server.  
  It also updates the state of books in app which is only used by the main page. 
  */
  handleUpdateBook = (id, shelf) => {

    //this looks really ugly.  
      BooksAPI.get(id).then(book => {
        book.shelf = shelf      
        BooksAPI.update(book, shelf).then( shelves => {
        //shelves is a object with three lists of book ids (currently reading, want to read, read)
        
        let   newBooks = [...this.state.books] //copy books
        const found = newBooks.find(b => b.id === id)

        if (!found) {
          newBooks.unshift(book)
        }
        else
        {
          newBooks = newBooks.reduce((books, b) => {
              let nextBook = b.id === book.id ? book : b
              return [...books, nextBook]
            }, [])

        }
        this.setState({books: newBooks})
      }).catch(err => {
        console.log("error" + err)
      })
    })
  }
  
  componentDidMount() {
    BooksAPI.getAll().then( obj => {
      this.setState({ books: obj })
    }).catch(err => {
        if (err instanceof TypeError)
          console.log("Network Not Present")
        else
          throw err
      })
  }  

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage mybooks={this.state.books} onUpdateBook={this.handleUpdateBook} />
        )} />
        <Route exact path='/' render={() => (
          <MainPage books={this.state.books} onUpdateBook={this.handleUpdateBook} />
        )} />
       
      </div>
    )
  }
}

export default BooksApp
