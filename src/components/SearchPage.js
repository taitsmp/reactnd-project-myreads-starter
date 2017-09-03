import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {

    state = {
        query: '',
        books: [], //search books and my books are different things.
    }

    componentWillReceiveProps = (nextProps) => {
        let m1 = JSON.stringify(nextProps.mybooks)
        let m2 = JSON.stringify(this.props.mybooks)

        //TODO: try deepEqual
        if (m1 !== m2) {
            this.setState({ books: this.combineSearches(nextProps.mybooks, this.state.books)})
        }

    }

    combineSearches = (mybooks, searchBooks) => {
        for (let bk of searchBooks) {
            let myBook = mybooks.find( mb => mb.id === bk.id )
            bk.shelf = myBook ? myBook.shelf : 'none'
        }
        return searchBooks
    }

    updateSearch = (event) => {
        const { mybooks } = this.props

        let newQuery = event.target.value
        
        //handle the empty query.  No results.
        if (newQuery === '') {
            this.setState({books: []})
        }
        else {
            BooksAPI.search(newQuery, 100).then((foundBooks) => {
                if (foundBooks.error) {
                    this.setState({books: []})
                }
                else {
                    let books = this.combineSearches(mybooks, foundBooks)
                    this.setState({books: books})
                }
            }).catch(err => {
                //silently fails on network error. Acts like broken search.
                this.setState({books: []})
            })
        }

        this.setState({query: newQuery})
    }

    render() {

        return (
          <div className="search-books">
            <SearchInput query={this.state.query} onSearchChange={this.updateSearch} />
            <SearchResults books={this.state.books} mybooks={this.props.mybooks} onUpdateBook={this.props.onUpdateBook} />
          </div> 
        )
    }

}

SearchPage.PropTypes = {
    mybooks: PropTypes.any.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

export default SearchPage