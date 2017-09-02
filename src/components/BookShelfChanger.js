import React, { Component } from 'react'
import PropTypes from 'prop-types'

//controlled component
//https://facebook.github.io/react/docs/forms.html
class BookShelfChanger extends Component {

  constructor(props) {
    super(props)

    console.log("changer constructor")
    //in the constructor is the only place you can modify state directly. 
    this.state = { value: this.props.shelf, id: this.props.bookId}
  }


  handleShelfChange = (event) => {
    const newShelf = event.target.value
    const id       = this.props.bookId
    
    this.props.onUpdateBook(id, newShelf)
    this.setState({value: newShelf})
  }

  componentDidMount() {
    console.log("shelf changer mounted")
  }

  /* Do I need this function? Seems like no.  
  componentWillReceiveProps(nextProps) {
    console.log("will receive props. shelf =" + nextProps.shelf)
    if (nextProps.shelf !== this.props.value)
    {
      console.log("updating state")
      this.setState({ value: nextProps.shelf})
    }
  }
  */

  render() {
    console.log("shelf changer rendered. shelf=" + this.state.value)    
    return (
                            <div className="book-shelf-changer">
                              <select value={this.state.value} onChange={this.handleShelfChange}>
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