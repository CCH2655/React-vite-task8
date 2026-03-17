import { RouterProvider } from "react-router";
import { router } from "./router";
import "./assets/style.css";
import MessageToast from "./components/MessageToast";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <MessageToast />
    </>
  )
}

export default App;