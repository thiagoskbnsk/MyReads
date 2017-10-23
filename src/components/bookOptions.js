import React, { Component } from 'react'

class BookOptions extends Component {

  render() {
    const categories = [
      {
        name: 'Move to...',
        value: 'none',
        disabled: true
      },
      {
        name: 'Currently Reading',
        value: 'currentlyReading',
        disabled: false
      },
      {
        name: 'Want to Read',
        value: 'wantToRead',
        disabled: false
      },
      {
        name: 'Read',
        value: 'read',
        disabled: false
      },
      {
        name: 'None',
        value: 'none',
        disabled: false
      }
    ]

    return (
      <select value={this.props.selected} onChange={this.props.eventChange}>
        {categories.map((c) => (
          <option key={c.name} value={c.value} disabled={c.disabled}>{c.name}</option>
        ))}
      </select>
    )
  }
}

export default BookOptions
