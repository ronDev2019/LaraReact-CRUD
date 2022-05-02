import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Student from "./pages/student";
import AddStudent from './pages/addStudent.js';
import EditStudent from './pages/editStudent';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Student/>} />
        <Route path="/add-student" element={<AddStudent/>} />
        <Route path="/edit-student/:id" element={<EditStudent/>} />
      </Routes>
    </Router>
  );
}

export default App;
