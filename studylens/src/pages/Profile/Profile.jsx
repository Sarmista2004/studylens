import { Navigate } from "react-router-dom";

// Profile is merged into Settings — keep this route working for any old links.
function Profile() {
  return <Navigate to="/settings" replace />;
}

export default Profile;
