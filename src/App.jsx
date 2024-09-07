import "./App.css"

import { Route, Routes } from "react-router-dom"

import Footer from "./Components/Footer"
import HomeLayout from "./Layout/HomeLayout"
import AboutUs from "./Pages/AboutUs"
import HomePage from "./Pages/HomePage"
function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/about" element={<AboutUs/>}/> 
    </Routes>
    </>
    
  )
}

export default App
