import Home from './pages/Home'
import './firebase'
import Authentication from './pages/Authentication/Authentication';
import Report from './pages/Report'
import { AuthProvider } from './contexts/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useState } from 'react';
import ProtectedRoutes from './utils/protected-routes';
import Community from "./pages/Community"
import SentMessage from './components/communityChat/sentMessage';
import RecvMessage from './components/communityChat/recievedMessage';
import Error404Page from './pages/ErrorPages/Error404Page';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },{
      path: "/report",
      element: <ProtectedRoutes protect={<Report/>}/>
    },{
      path: "/community",
      element: <ProtectedRoutes protect={<Community/>}/>
    },{
      path: "/*",
      element: <Error404Page />
    },
  ]);
  return (
    <AuthProvider>
       <RouterProvider router={router} />
      <div className="w-screen">
      </div>
    </AuthProvider>
  );
}

export default App;
