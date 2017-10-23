import React, { Component } from 'react'

class SectionCategory extends Component {
  render() {
    return (
      <section className="bookshelf">
        <h2 className="bookshelf-title">{this.props.categoryName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.children }
          </ol>
        </div>
      </section>
    )
  }
}

export default SectionCategory
