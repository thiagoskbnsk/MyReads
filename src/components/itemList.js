import React, { Component } from 'react'

import BookOptions from './bookOptions'

class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      category: this.props.category
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    if (this.props.onUpdateBook)
      this.props.onUpdateBook(this.props.book, e.target.value)
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ backgroundImage: `url(${this.props.image})` }}></div>
            <div className="book-shelf-changer">
              <BookOptions selected={this.state.category} eventChange={this.handleClick} />
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          {this.props.authors.map((a) => (
            <div className="book-authors" key={a}>{a}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default ItemList
