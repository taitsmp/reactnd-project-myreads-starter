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

    componentWillReceiveProps = (nextProps) => {
        let m1 = JSON.stringify(nextProps.mybooks)
        let m2 = JSON.stringify(this.props.mybooks)

        //TODO: try deepEqual
        if (m1 !== m2) {
            this.setState({ books: this.combineSearches(nextProps.mybooks, this.state.books)})
        }

    }

    //add mybooks data into searchBooks
    combineSearches = (mybooks, searchBooks) => {
        //props could uppdate state but won't initialize state. 
        for (let bk of searchBooks) {
            let myBook = mybooks.find( mb => mb.id === bk.id )
            bk.shelf = myBook ? myBook.shelf : 'none'
        }
        return searchBooks
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
                if (foundBooks.error) {
                    this.setState({books: []})
                }
                else {
                    let books = this.combineSearches(mybooks, foundBooks)
                    this.setState({books: books})
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