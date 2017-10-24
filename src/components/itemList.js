import React, { Component } from 'react'

import ItemOptions from './itemOptions'

class ItemList extends Component {
    state = {
        category: ''
    }

    componentDidMount() {
        this.setState({
            category: this.props.category
        });
    }

    /**
    * @description Call a function which was declare in App.js
    */
    handleClick = (e) => {
        e.preventDefault();
        if (this.props.onUpdateBook)
            this.props.onUpdateBook(this.props.book, e.target.value);
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ backgroundImage: `url(${this.props.image})` }}></div>
                        <div className="book-shelf-changer">
                            <ItemOptions selected={this.state.category} eventChange={this.handleClick} />
                        </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    {this.props.authors.map((a, item) => (
                        <div className="book-authors" key={item}>{a}</div>
                    ))}
                </div>
            </li>
        )
    }
}

export default ItemList
