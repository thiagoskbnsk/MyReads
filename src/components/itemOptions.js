import React from 'react'

const categories = [
    {
        name: 'Move to...',
        value: '',
        disabled: true
    },
    {
        name: 'Currently Reading',
        value: 'currentlyReading',
        disabled: false
    },
    {
        name: 'Want to Read',
        value: 'wantToRead',
        disabled: false
    },
    {
        name: 'Read',
        value: 'read',
        disabled: false
    },
    {
        name: 'None',
        value: 'none',
        disabled: false
    }
];

export default props => (
    <select value={props.selected} onChange={props.eventChange}>
        {categories.map((c) => (
            <option key={c.name} value={c.value} disabled={c.disabled}>{c.name}</option>
        ))}
    </select>
)
