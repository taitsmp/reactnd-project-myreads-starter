import React, { Component } from 'react'
import PropTypes from 'prop-types'

//controlled component
//https://facebook.github.io/react/docs/forms.html
class BookShelfChanger extends Component {

  constructor(props) {
    super(props)

    //in the constructor is the only place you can modify state directly. 
    this.state = { value: this.props.shelf, id: this.props.bookId}
  }

  //should I handle change here or at a higher level component?  
  // if I do it here => 
  // if I do it at a higher level, how do I change the state here?

  handleShelfChange = (event) => {
    const newShelf = event.target.value
    const id       = this.props.bookId
    
    this.props.onUpdateBook(id, newShelf)
    this.setState({value: newShelf})
  }

  componentDidMount() {

  }

  render() {
    return (
                            <div className="book-shelf-changer">
                              <select value={this.state.value} onChange={this.handleShelfChange}>
                                <option value="none" disabled>Move to...</option>                  
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