import SignIn from './pages/Auth/SignIn/SignIn'
import Board from './pages/Boards/_id'
import ErrorPage from './error-page'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import SignUp from './pages/Auth/SignUp/SignUp'
import { path } from './utils/constants'
import PublicRoutes from './components/Auth/publicRoute'
import PrivateRoutes from './components/Auth/privateRoute'
import HomePage from './pages/Home'
import CreateUserGoogle from './pages/Auth/MiddlewareLoginWithGoogle/CreateGoogle'
import PostAuth from './pages/Auth/MiddlewareLoginWithGoogle/PostAuth'

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path={path.PostAuth} element={<PostAuth />} />
          <Route path={path.CreateUserGoogle} element={<CreateUserGoogle />} />
          <Route path={path.SignIn} element={<SignIn />} />
          <Route path={path.SignUp} element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path={path.Board + '/:id'} element={<Board />} />
          <Route path={path.Home} element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
