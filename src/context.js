// Context Manager
import React from 'react';

export const DateContext = React.createContext(`${new Date().toISOString().slice(0, 10)}`)
export const SourceContext = React.createContext(`ALL`)

