import React from 'react'
import LoginPage from './Components/Pages/Auth/LoginPage';
import { Routes, Route } from 'react-router-dom'
import MinimalLayout from './Mui/layout/MinimalLayout';
import MainLayout from './Mui/layout/MainLayout';
import Home from './Components/Pages/Dashboard/Home'
import ProjectAddUpdate from './Components/Pages/Dashboard/Home/AddUpdate';
import TaskAddUpdate from './Components/Pages/Dashboard/Task/AddUpdate'
import Task from './Components/Pages/Dashboard/Task'
import ProjectView from  './Components/Pages/Dashboard/Home/View'
import RegisterPage from './Components/Pages/Auth/RegisterPage'

const Routing = ({ user, loader, setLoader }) => {
  return (
    <Routes>
      {user.data.isAuthenticated ?
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home loader={loader} setLoader={setLoader} />} />
          <Route path="/project/add/" element={<ProjectAddUpdate />} />
          <Route path="/project/edit/:id" element={<ProjectAddUpdate />} />
          <Route path="/project/view/:id" element={<ProjectView />} />
      
          <Route path="task" element={<Task loader={loader} setLoader={setLoader} />} />
          <Route path="task/add/" element={<TaskAddUpdate />} />
          <Route path="/task/edit/:id" element={<TaskAddUpdate />} />
          <Route path="/task/view/:id" element={"Task View"} />
          <Route path='*' element={"Not found"} />
        </Route>
        :
        <Route path='/' element={<MinimalLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='*' element={"Not found"} />
        </Route>
      }
    </Routes>
  )
}

export default Routing