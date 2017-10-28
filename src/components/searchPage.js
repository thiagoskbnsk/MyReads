import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle'

import { renderBooks } from './shelfPage'
import * as BooksAPI from '../utils/BooksAPI'

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            resultSearch: []
        }
    }

    /**
    * @description Change the state of query (input search) and invoke a function
    * @param {string} query - The value of user entered
    */
    updateQuery = (query) => {
        this.setState({ query },
            () => {
                if(query.length > 0) {
                    this.searchBook()
                }
            }
        )
    }

    /**
    * @description Does a search on a bookAPI if query passed is allowed on terms: "https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md".
    */
    searchBook() {
        BooksAPI.search(this.state.query, 20).then((books) => {
            if(Array.isArray(books)) {
                this.setState(state => ({
                    resultSearch: this.setCategory(books)
                }))
            } else {
                this.setState({ resultSearch: [] })
            }
        })
    }

    setCategory(books) {
        books.map((b) => {
            b.shelf = 'none'
            return b
        })

        this.props.books.map((book) => {
            const index = books.findIndex(b => b.id === book.id)
            if(index >= 0)
                books[index].shelf = book.shelf
            return book
        })

        return books;
    }



    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateQuery(e.target.value)}/>
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.resultSearch && this.state.resultSearch.length > 0 ? (
                            renderBooks(this.state.resultSearch, this.props.onUpdateBook)
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
    }
}

SearchPage.PropTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default SearchPage
