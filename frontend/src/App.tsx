// import { Route, Routes } from "react-router-dom"
// import Header from "./components/Header"
// import Home from "./pages/Home"
// import Login from "./pages/Login"
// import SignUp from "./pages/Signup"
// import Chat from "./pages/Chat"
// import Notfound from "./pages/NotFound"
// import { useAuth } from "./context/AuthContext"

// function App() {
//   const auth = useAuth();

//   return (
//     <main>
//       <Header/>
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/sign-up" element={<SignUp/>}/>
//         <Route path="/chat" element={<Chat />} />
//         <Route path="*" element={<Notfound/>}/>
//       </Routes>
//     </main>
//   )
// }

// export default App

import { Route, Routes, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import Chat from "./pages/Chat"
import Notfound from "./pages/NotFound"
import { useAuth } from "./context/AuthContext"

function App() {
  const auth = useAuth();

  // Prevents the "flash" of the login page on refresh
  if (auth.isLoading) {
    return <div>Loading session...</div>; 
  }

  return (
    <main>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        {/* If logged in, redirect away from auth pages */}
        <Route path="/login" element={auth.isLoggedIn ? <Navigate to="/chat" /> : <Login />}/>
        <Route path="/sign-up" element={auth.isLoggedIn ? <Navigate to="/chat" /> : <SignUp />}/>
        
        {/* If NOT logged in, redirect to login */}
        <Route path="/chat" element={auth.isLoggedIn && auth.user ? <Chat /> : <Navigate to="/login" />} />
        
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </main>
  )
}

export default App
