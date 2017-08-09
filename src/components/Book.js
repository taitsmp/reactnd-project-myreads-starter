import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

//this is going to just have a render method and props.
class Book extends Component {

  componentDidMount() {

  }
  
  render() {
    const coverStyle = {
      width: 128,
      height: 193,
      backgroundImage: "url('"+this.props.thumbnail+"')"
    }
    return (
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={coverStyle}></div>
                            <BookShelfChanger shelf={this.props.shelf} bookId={this.props.id} onUpdateBook={this.props.onUpdateBook} />
                          </div>
                          <div className="book-title">{this.props.title}</div>
                          <div className="book-authors">{this.props.author}</div>
                        </div>
    )
  }
        
}


//leaving this outside class definition in case I change this to a propType
Book.PropTypes = {

  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onUpdateBook: PropTypes.func.isRequired

}

export default Book