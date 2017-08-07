import React, { Component } from 'react'
import Book from './Book'

class SearchInput extends Component {

    render() {

        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.props.books.map( book => (
                    <li key={book.id}>
                    <Book thumbnail={book.imageLinks.thumbnail} 
                            title={book.title} 
                            author={book.author} 
                            shelf={book.shelf}
                            id={book.id}
                            onUpdateBook={this.props.onUpdateBook} />
                    </li>
                    ))}
                </ol>
            </div>            
        )
    }

}

export default SearchInput