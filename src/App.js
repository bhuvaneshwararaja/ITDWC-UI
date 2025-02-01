import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import Login from "./component/login";
import ProtectedRoute from "./component/protexted";
import Layout from "./component/dashboard";
import CreateUser from "./component/create_user";
import EntryForm from "./component/entry";
import Table from "./component/view_entry";

function App() {
  return (
    <UserProvider>
      {/* Add basename for subpath */}
      <Router basename="/itdwc">
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/entry"
            element={
              <ProtectedRoute>
                <Layout>
                  <EntryForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-user"
            element={
              <ProtectedRoute adminOnly>
                <Layout>
                  <CreateUser />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-entry"
            element={
              <ProtectedRoute adminOnly>
                <Layout>
                  <Table />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<h1 className="text-center mt-10 text-2xl">404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
