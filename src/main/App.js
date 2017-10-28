import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ShelfPage from '../components/shelfPage'
import SearchPage from '../components/searchPage'

import * as BooksAPI from '../utils/BooksAPI'
import '../components/App.css'

class BooksApp extends Component {

    constructor() {
        super()
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    /**
    * @description Clear resultSearch state
    */
    clearSearch() {
        this.setState({ resultSearch: '' });
    }

    /**
    * @description Updates the book's shelf in the bookAPI
    * @param {object} book - Book that will change
    * @param {string} value - Shelf value
    */
    updateBook = (book, value) => {
        BooksAPI.update(book, value).then((resolve) => {
            this.getData()
        });
    }

    /**
    * @description Consult books
    */
    getData() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books }, this.updateListSearch);
        });
    }

    render() {
        return (
            <div className="app">
                <Route path='/' exact render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <ShelfPage books={this.state.books} onUpdateBook={this.updateBook}/>
                        </div>
                        <div className="open-search">
                            <Link to='/search' onClick={() => this.clearSearch()} >Add a book</Link>
                        </div>
                    </div>
                )} />
                <Route path='/search' render={({history}) => (
                    <SearchPage books={this.state.books} onUpdateBook={this.updateBook}/>
                )} />
            </div>
        )
    }
}

export default BooksApp
