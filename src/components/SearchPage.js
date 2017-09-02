import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {

    state = {
        query: '',
        books: [], //search books and my books are different things.
        calls: {search: 0, input: 0}

    }

    updateSearch = (event) => {
        //let { query, books } = this.state
        const { mybooks } = this.props

        let newQuery = event.target.value
        
        //handle the empty query.  No results.
        if (newQuery === '') {
            this.setState({books: []})
            this.state.calls.input++            
        }
        else {
            BooksAPI.search(newQuery, 100).then((foundBooks) => {
                console.log(foundBooks)
                if (foundBooks.error) {
                    console.log(foundBooks.error)
                    this.setState({books: []})
                }
                else {
                    //set shelf using mybooks
                    for (let bk of foundBooks) {
                        let myBook = mybooks.find( mb => mb.id === bk.id )
                        if (myBook) {
                            console.log("set shelf 1")
                            bk.shelf = myBook.shelf
                        }
                        else {
                            console.log("set shelf 2")
                            bk.shelf = 'none'
                        }
                    }
                    this.setState({books: foundBooks})
                }
                this.state.calls.search++
            }).catch(err => {
                //silently fails on network error. Acts like broken search.
                this.setState({books: []})
            })
        }

        this.setState({query: newQuery})
        this.state.calls.input++
    }

    render() {

        return (
          <div className="search-books">
            <SearchInput query={this.state.query} onSearchChange={this.updateSearch} />
            <SearchResults books={this.state.books} onUpdateBook={this.props.onUpdateBook} />
          </div> 
        )
    }

}

SearchPage.PropTypes = {
    mybooks: PropTypes.any.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

export default SearchPage