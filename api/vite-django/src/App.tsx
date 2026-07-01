import './App.css'
import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx"

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<RootLayout/>} >
              <Route index element={<HomePage/>}/>
              <Route path={"login"} element={<LoginPage/>}/>
              <Route path={"register"} element={<RegisterPage/>}/>
          </Route>
      </Routes>
    </>
  )
}

export default App
