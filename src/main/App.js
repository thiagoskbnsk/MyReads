import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import SectionChildren from '../components/sectionChildren'
import SearchPage from '../components/searchPage'

import * as BooksAPI from '../utils/BooksAPI'
import '../components/App.css'

class BooksApp extends Component {

    state = {
        books: [],
        query: '',
        resultSearch: ''
    }

    componentDidMount() {
        this.getData()
    }

    /**
    * @description Change the state of query (input search) and invoke a function
    * @param {string} query - The value of user entered
    */
    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        }, this.updateListSearch)
    }

    /**
    * @description Does a search on a bookAPI if query passed is allowed on terms: "https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md".
    */
    updateListSearch() {
        let query = this.state.query

        const terms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

        // verifies if query is on the terms
        if(terms.indexOf(query) >= 0) {
            BooksAPI.search(query, 20).then(resultSearch => {
                new Promise((resolve) => {
                    // return an array with all books in shelf
                    resolve(this.state.books.map((b) => b.id))
                }).then((result) => {
                    // does a loop to verify if the result has in state
                    resultSearch.map((resultSearchItem, index) => {
                        if(result.indexOf(resultSearchItem.id) >= 0)
                            resultSearch[index] = this.state.books[result.indexOf(resultSearchItem.id)] // if it is in the state, save the state instead of the result
                        return resultSearch
                    })
                    return resultSearch
                }).then((resultSearch) => {
                    // save a new state to resultSearch
                    this.setState({
                        resultSearch
                    })
                })
            }).catch((err) => {
                this.clearSearch()
            })
        } else {
            this.clearSearch()
        }
    }

    /**
    * @description Clear resultSearch state
    */
    clearSearch() {
        this.setState({ resultSearch: '' })
    }

    /**
    * @description Updates the book's shelf in the bookAPI
    * @param {object} book - Book that will change
    * @param {string} value - Shelf value
    */
    updateBook = (book, value) => {
        BooksAPI.update(book, value).then((books) => {
            this.getData()
        })
    }

    /**
    * @description Consult books
    */
    getData() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            })
        })
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
                            <SectionChildren books={this.state.books} onUpdateBook={(b,v) => this.updateBook(b, v)}/>
                        </div>
                        <div className="open-search">
                            <Link to='/search' onClick={() => this.clearSearch()} >Add a book</Link>
                        </div>
                    </div>
                )} />
                <Route path='/search' render={({history}) => (
                    <SearchPage books={this.state.resultSearch} onUpdateBook={(b,v) => this.updateBook(b, v)} onChangeInput={(e) => this.updateQuery(e.target.value)}/>
                )} />
            </div>
        )
    }
}

export default BooksApp
