import React, { Component } from 'react'
import PropTypes from 'prop-types'

//this is going to just have a render method and props.
class Book extends Component {

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
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
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
    thumbnail: PropTypes.string.isRequired
}

export default Book