import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommonLayout"
import { generateRoutes } from "./utils/generateRoutes"
import { adminSidebarItems } from "./routes/AdminSidbarItems"




function App() {

  console.log(generateRoutes(adminSidebarItems))

  return (
    <CommonLayout>
      <Outlet></Outlet>
    </CommonLayout>
  )
}

export default App
