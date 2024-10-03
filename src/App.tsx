import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import  Login from './components/Login';
import  ResetPwd from './components/ResetPwd';

import SuperAdminPanel from './components/SuperAdminPanel';
import { Dashboard } from './components/Dashboard';
import  StudentPanel  from './components/StudentPanel'; // Make sure to import the Dashboard component
import { College } from './components/College';




export const App = () => {
  return (
    
    <BrowserRouter>
    <RouterRoutes>
      {/* Uncomment and use this if you have a Ui component */}
      {/* <Route path="/" element={<Ui />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reset" element={<ResetPwd />} />
      <Route path="/" element={<Login />} />
      <Route path="/college/:collegeId" element={ <College />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/supadmin" element={<SuperAdminPanel />} />
      <Route path="/stuadmin" element={<StudentPanel />} />
    </RouterRoutes>
  </BrowserRouter> 
  )
}
export default App;