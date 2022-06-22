import React from 'react'
 
import DarkTheme, { createTheme } from 'react-dark-theme'
 
const lightTheme = {
  background: 'white',
  text: 'black',
}
 
const darkTheme = {
  background: 'black',
  text: 'white',
}
 
const myTheme = createTheme(darkTheme, lightTheme)
 
export default function Theme(){
  
    return (
      <div style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
        <DarkTheme light={lightTheme} dark={darkTheme} />
        Rest of your application
      </div>
    )
}
