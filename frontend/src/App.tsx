import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import Chat from "./pages/Chat"
import Notfound from "./pages/NotFound"
import { useAuth } from "./context/AuthContext"

function App() {
  const auth = useAuth();

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        {auth?.isLoggedIn && auth.user && (
          < Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </main>
  )
}

export default App
