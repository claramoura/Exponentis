import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout.js';
import HomePage from './pages/HomePage.js';
import UnitLessons from './pages/UnitLessons.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';

// Admin routes

import Courses from './pages/adminPages/Courses.js';
import EditCourse from './pages/adminPages/EditCourse.js';
import AddCourse from './pages/adminPages/AddCourse.js';

import Examples from './pages/adminPages/Examples.js';
import EditExample from './pages/adminPages/EditExample.js';
import AddExample from './pages/adminPages/AddExample.js';

import Exercises from './pages/adminPages/Exercises.js';
import EditExercise from './pages/adminPages/EditExercise.js';
import AddExercise from './pages/adminPages/AddExercise.js';

import Graphs from './pages/adminPages/Graphs.js';
import EditGraph from './pages/adminPages/EditGraph.js';
import AddGraph from './pages/adminPages/AddGraph.js';

import Images from './pages/adminPages/Images.js';
import EditImage from './pages/adminPages/EditImage.js';
import AddImage from './pages/adminPages/AddImage.js';

import Lessons from './pages/adminPages/Lessons.js';
import EditLesson from './pages/adminPages/EditLesson.js';
import AddLesson from './pages/adminPages/AddLesson.js';

import Users from './pages/adminPages/Users.js';
import EditUser from './pages/adminPages/EditUser.js';

function App() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />

          <Route path='/admin/courses' element={<Courses />} />
          <Route path='/admin/course/:courseId/change' element={<EditCourse />} />
          <Route path='/admin/course/add' element={<AddCourse />} />

          <Route path='/admin/examples' element={<Examples />} />
          <Route path='/admin/example/:exampleId/change' element={<EditExample />} />
          <Route path='/admin/example/add' element={<AddExample />} />

          <Route path='/admin/exercises' element={<Exercises />} />
          <Route path='/admin/exercise/:exerciseId/change' element={<EditExercise />} />
          <Route path='/admin/exercise/add' element={<AddExercise />} />

          <Route path='/admin/graphs' element={<Graphs />} />
          <Route path='/admin/graph/:graphId/change' element={<EditGraph />} />
          <Route path='/admin/graph/add' element={<AddGraph />} />

          <Route path='/admin/images' element={<Images />} />
          <Route path='/admin/image/:imageId/change' element={<EditImage />} />
          <Route path='/admin/image/add' element={<AddImage />} />

          <Route path='/admin/lessons' element={<Lessons />} />
          <Route path='/admin/lesson/:lessonId/change' element={<EditLesson />} />
          <Route path='/admin/lesson/add' element={<AddLesson />} />

          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/user/:userId/change' element={<EditUser />} />

          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/:course/:unit' element={<UnitLessons />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
