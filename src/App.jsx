import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogDetails from "./components/BlogDetails";
import Home from "./pages";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import PrivateRoutes from "./pages/privateRoutes";
import Profile from "./pages/profile";
import Register from "./pages/register";
import CreateBlog from "./components/CreateBlog";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Home />} path="/" exact />
        <Route element={<CreateBlog />} path="/write-blog" exact />
        <Route element={<BlogDetails />} path="/blog/:id" exact />
        <Route element={<Profile />} path="/me" />
      </Route>
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}

export default App;
