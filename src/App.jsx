import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import './App.css'
import RequireAuth from "./components/RequireAuth"
import PersistLogin from "./components/PersistLogin"

function App() {

  return (
    <main id="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </main>
  )
}

export default App
