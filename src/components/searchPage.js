import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { renderBooks } from './shelfPage'

const SearchPage = props => (
    <div className="search-books">
        <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={props.onChangeInput}/>
            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
                {props.books ? (
                    renderBooks(props.books, props.onUpdateBook)
                ) : (
                    <div className="no-results">
                        <p>Didn't find what you wanted? Don't worry! You can search for one of these terms:</p>
                        <small> 'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</small>
                    </div>
                )}
            </ol>
        </div>
    </div>
)

SearchPage.PropTypes = {
    onChangeInput: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default SearchPage
