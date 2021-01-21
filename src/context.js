// Context Manager
import React from 'react';

const getNewDate = () => {
    // Get Yesterday's Date
    let date = new Date();
    date.setDate(date.getDate() - 1);
    
    return `${date.toISOString().slice(0, 10)}`
}

export const DateContext = React.createContext(`${getNewDate()}`)
export const SourceContext = React.createContext(`ALL`)

