import {BrowserRouter, Routes, Route} from "react-router-dom"


// pages & components
import Home from "./pages/Home/Home"

import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import CourseList from "./pages/Course/CourseList"
import CourseDetails from "./pages/Course/CourseDetails"
import LessonLists from "./pages/Lesson/LessonList"
import {AuthProvider} from "./context/AuthContext";
import PrivateRoute from "./Routes/PrivateRoute";
import Instructor from "./pages/Instructor/Instructor";
import CreateCourse from "./features/Instructors/services/createCourse";
import UpdateCourse from "./features/Instructors/services/updateCourse";
import EnrollmentPage from "./pages/Enrollment/EnrollmentPage";
import ConfirmEnrollment from "./pages/Enrollment/ConfirmEnrollment";
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageCourse from "./features/Lessons/services/ManageCourse";
import CreateLessonContent from "./features/Lessons/services/CreateLessonContent";
import React from "react";
import CourseLandingPage from "./features/Lessons/services/CourseLandingPage";
import LessonPage from "./pages/Lesson/LessonPage";
import LessonList from "./pages/Lesson/LessonList";
import CollapsibleNavbar from "./layouts/CollapsibleNavbar";
import FooterlogSign from "./layouts/FooterlogSign";
import ForgotPassword from "./features/authentication/services/ForgetPassword";
import RestPassword from "./features/authentication/hooks/RestPassword";



function App() {
    return (
        <div style={{minHeight:"100vh", position:"relative"}}  className="App">
            <BrowserRouter>
                <AuthProvider>
                    <CollapsibleNavbar/>
                    <div   className="pages">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Signup/>}/>
                            <Route path="/forgot-password" element={<ForgotPassword/>} />
                            <Route path="/resetPassword" element={<RestPassword />} />
                            <Route path="/courses">
                                <Route index element={<CourseList/>}/>
                                <Route path=":id" element={<CourseDetails/>}/>
                            </Route>
                            <Route path='/'>}
                                <Route path="/lessons/:id" element={
                                    <PrivateRoute>
                                        <LessonLists/>
                                    </PrivateRoute>}>
                                </Route>
                            </Route>
                            <Route path='/'>}
                                <Route path="/instructor" element={
                                    <PrivateRoute>
                                        <Instructor/>
                                    </PrivateRoute>}>
                                </Route>
                            </Route>
                            <Route path="/create" element={
                                <PrivateRoute>
                                    <CreateCourse/>
                                </PrivateRoute>}>
                            </Route>
                            <Route path="/update/course/:id" element={
                                <PrivateRoute>
                                    <UpdateCourse/>
                                </PrivateRoute>}>
                            </Route>
                            <Route path="/my-courses/learning/" element ={
                                <PrivateRoute>
                                    <EnrollmentPage/>
                                </PrivateRoute>}>
                            </Route>
                            <Route path="/confirmEnrollment" element ={
                                <PrivateRoute>
                                    <ConfirmEnrollment/>
                                </PrivateRoute>}>
                            </Route>
                            <Route path="/manage/course/:id" element ={
                                <PrivateRoute>
                                    <ManageCourse/>
                                </PrivateRoute>}>
                            </Route>
                            <Route path="/instructor/course/:id/manage/curriculum" element ={
                                <PrivateRoute>
                                    <CreateLessonContent/>
                                </PrivateRoute>}>
                            </Route>
                            <Route path="/instructor/course/:id/manage/basics" element ={
                                <PrivateRoute>
                                    <CourseLandingPage/>
                                </PrivateRoute>}>
                            </Route>
                            <Route path="/courses/learning/:id" element ={
                                <PrivateRoute>
                                    <LessonPage/>
                                </PrivateRoute>}>
                            </Route>
                        </Routes>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;
