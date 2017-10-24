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

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    }, this.updateListSearch)
  }

  updateListSearch() {
    let query = this.state.query
    //allowed terms: https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    const terms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

    if(terms.indexOf(query) >= 0) {
      BooksAPI.search(query, 20).then(resultSearch => {
        new Promise((booksID) => {
          booksID(this.state.books.map((b) => b.id))
        }).then((result) => {
          resultSearch.map((resultSearchItem, index) => {
            if(result.indexOf(resultSearchItem.id) >= 0)
              resultSearch[index] = this.state.books[result.indexOf(resultSearchItem.id)]
            return resultSearch
          })
          return resultSearch
        }).then((resultSearch) => {
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

  clearSearch() {
    this.setState({ resultSearch: '' })
  }

  updateBook = (book, value) => {
    BooksAPI.update(book, value).then((books) => {
      this.getData()
    })
  }

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
        <Route path='/' exact
          render={() => (
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
          )}
        />
        <Route path='/search'
          render={({history}) => (
            <SearchPage books={this.state.resultSearch} onUpdateBook={(b,v) => this.updateBook(b, v)} onChangeInput={(e) => this.updateQuery(e.target.value)}/>
          )}
        />
      </div>
      )
    }
  }


export default BooksApp
