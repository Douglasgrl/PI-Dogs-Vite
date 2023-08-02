import './App.css'
import { Routes , Route, useLocation} from 'react-router-dom'
import LandingPage from './components/LadingPage/LandingPage'
import Cards from "./components/Cards/Cards"
import Nav from "./components/Nav/Nav"
import Detail from "./components/Detail/Detail"
import Create from "./components/Create/Create"
import Footer from "./components/Footer/Footer"
import About from "./components/About/About"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addDogs, allTemperaments } from './redux/actions'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addDogs())
  },[]);

  useEffect(() => {
    dispatch(allTemperaments());
  }, [dispatch]);
  
  const location = useLocation()

  return (
    <div>

      {location.pathname !== "/" && <Nav/>}

    <Routes>

      <Route path='/' element={<LandingPage/>}/>      

      <Route path='/home' element={<Cards/>}/>

      <Route path='/detail/:id' element={<Detail/>}></Route>

      <Route path='/create' element={<Create/>}></Route>

      <Route path='/about' element={<About/>}></Route>

    </Routes>

      <Footer/>
    </div>
  )
}

export default App
