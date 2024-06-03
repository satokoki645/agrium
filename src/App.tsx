import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Yotei from "./pages/Yotei";
import Today from "./pages/Today";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Yotei yearMonth={new Date()} single={false} rcseq={0} />,
  },
  {
    path: "/:location/:day",
    element: <Today single={false} rcseq={0} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
