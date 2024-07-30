
import { Navigate } from "react-router"

const ProtectedRouteForUser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('users'))
  if (user?.role === "user") {
    return children
  }
  else {
    return <Navigate to={'/auth/signin'} />
  }
}

export default ProtectedRouteForUser;