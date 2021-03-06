import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {

  handleShelfChange = (event) => {
    const newShelf = event.target.value
    const id       = this.props.bookId
    
    this.props.onUpdateBook(id, newShelf)
  }

  render() {
    return (
                            <div className="book-shelf-changer">
                              <select value={this.props.shelf} onChange={this.handleShelfChange}>
                                <option value="move" disabled>Move to...</option>                  
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
    )
  }
}

BookShelfChanger.PropTypes = {
  shelf: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
  onUpdateBook: PropTypes.func.isRequired
}

export default BookShelfChanger