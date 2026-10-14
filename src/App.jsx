import LoginRegisterPage from "./commonPages/LoginRegisterPage"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TempLogin from "./commonPages/TempLogin"

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<LoginRegisterPage/>}/>
            <Route path='/templogin' element={<TempLogin/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
