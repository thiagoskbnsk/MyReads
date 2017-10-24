import React from 'react'
import sortBy from 'sort-by'

import SectionCategory from './sectionCategory'
import ItemList from './itemList'

/**
* @description Render a list of books passed on filter
* @param {object} books - List of books
* @param {function} onUpdate - Function passed by props
* @param {string} category - Category passed by filter
*/
export function categoryBooks(books, onUpdate, category) {
    if (category) {
        return (
            books.sort(sortBy('title')).filter((b) => b.shelf === category).map((b) => (
                <ItemList title={b.title} authors={[b.authors]} image={b.imageLinks.thumbnail} key={b.id} id={b.id} category={b.shelf ? b.shelf : 'none'} book={b} onUpdateBook={onUpdate}/>
            ));
        );
    } else {
        return (
            books.sort(sortBy('title')).map((b) => (
                <ItemList title={b.title} authors={[b.authors]} image={b.imageLinks.thumbnail} key={b.id} id={b.id} category={b.shelf ? b.shelf : 'none'} book={b} onUpdateBook={onUpdate}/>
            ));
        );
    }
}

export default props => (
    <div>
        {props.books.length > 0 ? (
            <div>
                <SectionCategory categoryName="Currently Reading">
                    {categoryBooks(props.books, props.onUpdateBook, "currentlyReading")}
                </SectionCategory>
                <SectionCategory categoryName="Want to Read">
                    {categoryBooks(props.books, props.onUpdateBook, "wantToRead")}
                </SectionCategory>
                <SectionCategory categoryName="Read">
                    {categoryBooks(props.books, props.onUpdateBook, "read")}
                </SectionCategory>
            </div>
        ) : (
            <p>loading...</p>
        )}
    </div>
)
