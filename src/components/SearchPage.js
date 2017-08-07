import React, { Component } from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import * as BooksAPI from '../BooksAPI'
//TODO: regex escaping for search.

class SearchPage extends Component {

    //is this dumb? Should we have just one state of books in the app section?
    state = {
        query: '',
        books: []
    }

    updateSearch = (event) => {
        //let { query, books } = this.state

        let newQuery = event.target.value

        BooksAPI.search(newQuery, 100).then((foundBooks) => {
            console.log(foundBooks)
            this.setState({books: foundBooks})
        })

        this.setState({query: newQuery})

    }

    render() {

        return (
          <div className="search-books">
            <SearchInput query={this.state.query} onSearchChange={this.updateSearch} />
            <SearchResults books={this.state.books} onBookUpdate={this.props.onBookUpdate} />
          </div> 
        )
    }

}

export default SearchPage