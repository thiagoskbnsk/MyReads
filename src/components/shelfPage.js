import React from 'react'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

import CategorySection from './categorySection'
import ItemList from './itemList'

/**
* @description Render a list of books passed on filter
* @param {object} books - List of books
* @param {function} onUpdate - Function passed by props
* @param {string} category - Category passed by filter
*/
export const renderBooks = (books, onUpdate, category) => {
    if (category) {
        return (
            books.sort(sortBy('title')).filter((b) => b.shelf === category).map((b) => (
                <ItemList title={b.title} authors={[b.authors]} image={b.imageLinks.thumbnail} key={b.id} id={b.id} category={b.shelf ? b.shelf : 'none'} book={b} onUpdateBook={onUpdate}/>
            ))
        );
    } else {
        return (
            books.sort(sortBy('title')).map((b) => (
                <ItemList title={b.title} authors={[b.authors]} image={b.imageLinks.thumbnail} key={b.id} id={b.id} category={b.shelf ? b.shelf : 'none'} book={b} onUpdateBook={onUpdate}/>
            ))
        );
    }
}

const ShelfPage = props => (
    <div>
        {props.books.length > 0 ? (
            <div>
                <CategorySection categoryName="Currently Reading">
                    {renderBooks(props.books, props.onUpdateBook, "currentlyReading")}
                </CategorySection>
                <CategorySection categoryName="Want to Read">
                    {renderBooks(props.books, props.onUpdateBook, "wantToRead")}
                </CategorySection>
                <CategorySection categoryName="Read">
                    {renderBooks(props.books, props.onUpdateBook, "read")}
                </CategorySection>
            </div>
        ) : (
            <div className="eclipse">
                <div></div>
            </div>
        )}
    </div>
)

ShelfPage.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default ShelfPage
