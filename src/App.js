import React from 'react'
import * as BooksAPI from './BooksAPI'
import MainPage from './components/MainPage'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      showSearchPage: false,  //REMOVE ME
      books: []
    } 

  } 

  handleUpdateBook = (id, shelf) => {
    const book = {id: id, shelf: shelf}  //hack
    BooksAPI.update(book, shelf)

    //we need to update the state using setState.  Beware of shallow copies. 
    //you could start by refetching all the data from the server.  this is not a great idea but is doable. 
    //

    //https://facebook.github.io/react/docs/update.html
    //newBooks = update(this.state.books, {}) //-works MUCH easier if books is not an array. 
    //const newState = update(this.state, {books: {i {$apply: function(x) {return x * 2;}}});

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
        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div> 
        )} />
        <Route exact path='/' render={() => (
          <MainPage books={this.state.books} onUpdateBook={this.handleUpdateBook} />
        )} />
       
      </div>
    )
  }
}

export default BooksApp
