import React from 'react'
import * as BooksAPI from './BooksAPI'
import MainPage from './components/MainPage'
import SearchPage from './components/SearchPage'
import { Route } from 'react-router-dom'
import './App.css'

/*
What's left?

* search does not give you the shelf.  You need to populate it (including not checking anything? this would be "none")
* handleUpdateBook is not setup to take a new book and add it the existing set of books.  Fix the "reduce"
* review promises lecture.  avoid pyramid of doom. Might be able to use outer block book variable to pass the book between then calls. 

* rewatch any lectures? 
* review requirements
* why can't I set a new property on an Error object? Property gone when I throw it.
* read "thinking in react" and see if you "get it".
* 403 happens on some searches (including "b").  Do I care?
* remove the constructor on this page.
* rewrite this in react native.  
* rewrite up the architecture in README.md
*/

class BooksApp extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      books: []
    } 

  } 

  getBook(id) {
    let bk = ""
    BooksAPI.get(id).then(book => {
      bk = book
      console.log(book)
    })
    return bk
    //return this.state.books.find(b => b.id === id )
  }

  handleUpdateBook = (id, newShelf) => {
    
    let book = undefined
    BooksAPI.get(id)
      .then(bk => {
        book = bk
        return BooksAPI.update(book, newShelf)
      }) //can I do this? Does this automatically return the promise? 
      .then(shelves => { 
        
        console.log("after update")
        let books = [...this.state.books]

        if (newShelf === 'none')
        {
          book.shelf = newShelf
          books.unshift(book)
        }
        else
        {
          //reduce here? Don't want to accidentally update the state in place. probably fine. 
          for (let b of books) {
            if (b.id === id) {
              b.shelf = newShelf
            }
          }
        }

        this.setState({books: books})

      })
        //add catch here...
        
         
  }
  /*
  This function used by MainPage and SearchPage.  It updates the book on the server.  
  It also updates the state of books in app which is only used by the main page. 
  */
  handleUpdateBook2 = (id, shelf) => {

    //this looks really ugly.  
    BooksAPI.get(id).then(book => {
      BooksAPI.update(book, shelf).then( shelves => {
      //shelves is a object with three lists of book ids (currently reading, want to read, read)
      console.log(shelves)
      console.log("here is the about-to-update book")
      console.log(book)
      
      const oldShelf = book.shelf
      console.log(oldShelf)
      book.shelf = shelf
      
      let newBooks = [...this.state.books] //copy books
      if (oldShelf === 'none') {
        newBooks.unshift(book)
      }
      else
      {
        //just do reduce?  will return a new array.
        newBooks = newBooks.reduce((books, b) => {
    
            let nextBook = b.id === book.id ? book : b
            //console.log(books)
            return [...books, nextBook]
          }, [])

      }
      console.log("setting state")
      this.setState({books: newBooks})
    }).catch(err => {
      console.log("error" + err)
    })
  })



  }
  
  componentDidMount() {
    BooksAPI.getAll().then( obj => {
      this.setState({ books: obj })
      console.log(obj)
    }).catch(err => {
        if (err instanceof TypeError)
          console.log("Network Not Present")
        else
          throw err
      })
  }  

  render() {
    //had to print the state here not in componentDidMount()
    console.log(this.state);
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
