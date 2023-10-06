import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Inicio from "./components/Inicio"
import Login from "./components/Login"
import Menu from "./components/Menu"
import Admin from "./components/Admin"
import "bootstrap/dist/css/bootstrap.css"

function App() {
  return (
    <div className='container'>
      <Router>
        <Menu></Menu>
        <Routes>
          <Route path='/' element={ <Inicio />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/Admin' element={ <Admin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
