import React, { Component } from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {

    //is this dumb? Should we have just one state of books in the app section?
    state = {
        query: '',
        books: [],
        calls: {search: 0, input: 0}

    }

    updateSearch = (event) => {
        //let { query, books } = this.state

        let newQuery = event.target.value.trim()
        
        BooksAPI.search(newQuery, 100).then((foundBooks) => {
            console.log(foundBooks)
            if (foundBooks.error)
                this.setState({books: []})
            else
                this.setState({books: foundBooks})
            this.state.calls.search++
        })
        
        this.setState({query: newQuery})
        this.state.calls.input++
        
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