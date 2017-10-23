import React, { Component } from 'react'

import SectionCategory from './sectionCategory'
import ItemList from './itemList'

class SectionChildren extends Component {
  render() {
    return (
      <div>
        {this.props.books.length > 0 ? (
          <div>
            <SectionCategory categoryName="Currently Reading">
              {this.props.books.filter((b) => b.shelf === "currentlyReading").map((b) => (
                <ItemList title={b.title} authors={b.authors} image={b.imageLinks.thumbnail} key={b.id} id={b.id} category={b.shelf} book={b} onUpdateBook={this.props.onUpdateBook}/>
              ))}
            </SectionCategory>
            <SectionCategory categoryName="Want to Read">
              {this.props.books.filter((b) => b.shelf === "wantToRead").map((b) => (
                <ItemList title={b.title} authors={b.authors} image={b.imageLinks.thumbnail} key={b.id} id={b.id} category={b.shelf} book={b} onUpdateBook={this.props.onUpdateBook}/>
              ))}
            </SectionCategory>
            <SectionCategory categoryName="Read">
              {this.props.books.filter((b) => b.shelf === "read").map((b) => (
                <ItemList title={b.title} authors={b.authors} image={b.imageLinks.thumbnail} key={b.id} id={b.id} category={b.shelf} book={b} onUpdateBook={this.props.onUpdateBook}/>
              ))}
            </SectionCategory>
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    )
  }
}

export default SectionChildren
