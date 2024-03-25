import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import { authContext, userContext } from "./context";
import store from "./store";


import AccountDetails from "./pages/AccountDetails";
import CreateArticle from "./pages/CreateArticle";
import ClientDashboard from "./pages/Dashboard/ClientDashboard";
import WriterDashboard from "./pages/Dashboard/WriterDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DisplayArticles from "./pages/DisplayArticles";
import UpdateArticle from "./pages/UpdateArticle";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
                                                      "id": null,
                                                      "email": "",
                                                      "first_name": "",
                                                      "last_name": null,
                                                      "is_writer": false,
                                                      "joined_on": null
                                                  });

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "writer/",
          children: [
            {
              path: "dashboard/",
              element: (
                <ProtectedRoute>
                  <WriterDashboard />
                </ProtectedRoute>
              ),
            },
            {
              path: "create-article/",
              element: (
                <ProtectedRoute>
                  <CreateArticle />
                </ProtectedRoute>
              ),
            },
            {
              path: "update-article/:uniqueId",
              element: (
                <ProtectedRoute>
                  <UpdateArticle />
                </ProtectedRoute>
              ),
            },
            {
              path: "show-articles/me",
              element: (
                <ProtectedRoute>
                  <DisplayArticles user={{ type: "writer" }} />
                </ProtectedRoute>
              ),
            },
            {
              path: "account/me",
              element: (
                <ProtectedRoute>
                  <AccountDetails user={{ type: "writer" }} />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "client/",
          children: [
            {
              path: "dashboard/",
              element: (
                <ProtectedRoute>
                  <ClientDashboard />
                </ProtectedRoute>
              ),
            },
            {
              path: "browse-articles/",
              element: (
                <ProtectedRoute>
                  <DisplayArticles user={{ type: "client" }} />
                </ProtectedRoute>
              ),
            },
            {
              path: "account/me",
              element: (
                <ProtectedRoute>
                  <AccountDetails user={{ type: "client" }} />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <authContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
          <Provider store={store} >
          <RouterProvider router={routes} />
          </Provider>
        </userContext.Provider>
      </authContext.Provider>
    </>
  );
}

export default App;
