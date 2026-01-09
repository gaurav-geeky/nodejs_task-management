
import { Route, Routes } from 'react-router-dom'

import Form from './Pages/Form'
import Layout from './Pages/Layout'

// admin 
import AdminDashBoard from './Admin/AdminDashBoard'
import CreateUser from './Admin/CreateUser'
import AssignTask from './Admin/AssignTask'
import AdminHome from './Admin/AdminHome'
import Report from './Admin/Report'
import Setting from './Admin/Setting'


// employee
import EmpDashboard from './Pages/EmpDashboard'
import MyTask from './Pages/MyTask'
import SubmittedTask from './Pages/SubmittedTask'
import EmpHome from './Pages/EmpHome'
import RemainingTasks from './Pages/RemainingTasks'
import Settings from './Pages/Settings'

import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Layout />} >

          <Route index element={< Form />} />

        </Route>
      </Routes>


      <Routes>
        <Route path="admin-dashboard" element={<AdminDashBoard />}>

          <Route index element={<AdminHome />} />
          <Route path='create-user' element={<CreateUser />} />
          <Route path='assign-task' element={<AssignTask />} />
          <Route path='report' element={<Report />} />
          <Route path='setting' element={<Setting />} />
        </Route>
      </Routes >


      <Routes>
        <Route path="emp-dashboard" element={<EmpDashboard />}>

          <Route index element={<EmpHome />} />
          <Route path='mytask' element={<MyTask />} />
          <Route path='submitedtask' element={<SubmittedTask />} />
          <Route path='remainingTask' element={<RemainingTasks />} />
          <Route path='settings' element={<Settings />} />

        </Route>
      </Routes >

      <ToastContainer theme="dark" />
    </>
  )
}

export default App;



