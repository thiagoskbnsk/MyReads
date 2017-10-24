import React from 'react'

export default props => (
    <section className="bookshelf">
        <h2 className="bookshelf-title">{props.categoryName}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.children}
            </ol>
        </div>
    </section>
)
