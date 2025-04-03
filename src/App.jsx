import "./App.css"
import { Route, Routes } from "react-router-dom"
import RequireAuth from "./Components/Auth/RequireAuth"
import CourseDescription from "./Pages/Courses/CourseDescription"
import CourseList from "./Pages/Courses/CourseList"
import CreateCourse from "./Pages/Courses/CreateCourse"
import AddLecture from "./Pages/Dashboard/AddLecture" 
import DisplayLectures from "./Pages/Dashboard/DisplayLectures"
import Denied from "./Pages/Denied"
import HomePage from "./Pages/HomePage" 
import Login from "./Pages/Login"
import NotFound from "./Pages/NotFound"
import Signup from "./Pages/Signup"
import EditProfile from "./Pages/User/EditProfile"
import Profile from "./Pages/User/Profile"
function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/courses" element={<CourseList/>}/>
      <Route path="/courses/:courseId" element={<CourseDescription/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/denied" element={<Denied/>}/>

      <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
        <Route path="/course/create" element={<CreateCourse/>}/>
        <Route path="/course/addLecture" element={<AddLecture/>}/>
        
      </Route>

      <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']}/>}>
        <Route path="/user/profile" element={<Profile/>}/>
        <Route path="/user/update-profile" element={<EditProfile/>}/>
        
        <Route path="/course/lectures" element={<DisplayLectures/>}/>
      </Route>

      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
    
  )
}

export default App
