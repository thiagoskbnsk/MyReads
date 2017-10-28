import React from 'react'
import PropTypes from 'prop-types'

import ItemOptions from './itemOptions'

const handleClick = (e, onUpdateBook, book) => {
    e.preventDefault();
    if (onUpdateBook)
        onUpdateBook(book, e.target.value);
}

const renderAuthors = (authors) => {
    return (
        authors.map((a, item) => (
            <div className="book-authors" key={item}>{a}</div>
        ))
    )
}

const ItemList = props => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ backgroundImage: `url(${props.image})` }}></div>
                <div className="book-shelf-changer">
                    <ItemOptions selected={props.category} eventChange={(e) => handleClick(e, props.onUpdateBook, props.book)} />
                </div>
            </div>
            <div className="book-title">{props.title}</div>
            {renderAuthors(props.authors)}
        </div>
    </li>
)

ItemList.propTypes = {
    image: PropTypes.string,
    category: PropTypes.string.isRequired,
    title: PropTypes.string,
    authors: PropTypes.array,
    onUpdateBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

export default ItemList
