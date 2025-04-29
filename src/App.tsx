import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import GradeForm from "./components/GradeForm";
import GradeTable from "./components/GradeTable";
import Navbar from "./components/navbar";
import FilterByStudent from "./components/FilterByStudent";

interface Grade {
  studentName: string;
  grade: number;
  subject: string;
}

const App: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [currentView, setCurrentView] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");

  useEffect(() => {
    const savedGrades = localStorage.getItem("grades");
    if (savedGrades) {
      setGrades(JSON.parse(savedGrades));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && role === "parent") {
      setCurrentView("filterStudent");
    }
  }, [isLoggedIn, role]);

  const addGrade = (grade: Grade) => {
    const newGrades = [...grades, grade];
    setGrades(newGrades);
    localStorage.setItem("grades", JSON.stringify(newGrades));
  };

  const updateGrade = (updatedGrade: Grade) => {
    const updatedGrades = grades.map((grade) =>
      grade.studentName === updatedGrade.studentName &&
      grade.subject === updatedGrade.subject
        ? updatedGrade
        : grade
    );
    setGrades(updatedGrades);
    localStorage.setItem("grades", JSON.stringify(updatedGrades));
  };

  const deleteGrade = (gradeToDelete: Grade) => {
    const updatedGrades = grades.filter(
      (g) =>
        !(
          g.studentName === gradeToDelete.studentName &&
          g.subject === gradeToDelete.subject &&
          g.grade === gradeToDelete.grade
        )
    );
    setGrades(updatedGrades);
    localStorage.setItem("grades", JSON.stringify(updatedGrades));
  };

  const handleLogin = (username: string, password: string, role: string) => {
    if (role === "parent") {
      const studentExists = grades.some(
        (grade) => grade.studentName.toLowerCase() === username.toLowerCase()
      );
      if (studentExists && password === username) {
        setIsLoggedIn(true);
        setRole("parent");
        setStudentName(username);
      } else {
        alert("Грешно име или пасворд за студентот");
      }
    } else if (role === "teacher") {
      if (username === "admin" && password === "admin") {
        setIsLoggedIn(true);
        setRole("teacher");
      } else {
        alert("Грешно име или пасворд за професор");
      }
    }
  };

  const viewAllGrades = () => setCurrentView("viewAll");
  const filterByStudent = () => setCurrentView("filterStudent");
  const addNewGrade = () => setCurrentView("addGrade");

  const handleFilter = (name: string) => {
    setStudentName(name);
    setCurrentView("filterStudent");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    setCurrentView("");
    setStudentName("");
  };

  return (
    <div className="container mx-auto p-4">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {role === "teacher" ? "Наставнички Панел" : "Родителски Панел"}
              </h1>
              {role === "parent" && (
                <p className="text-sm text-gray-600">Студент: {studentName}</p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-2xl"
            >
              Одјави се
            </button>
          </div>
          {role === "teacher" && (
            <>
              <Navbar
                onViewAllGrades={viewAllGrades}
                onFilterByStudent={filterByStudent}
                onAddGrade={addNewGrade}
              />
              {currentView === "filterStudent" && (
                <FilterByStudent onFilter={handleFilter} />
              )}
            </>
          )}
          {currentView === "viewAll" && (
            <GradeTable
              grades={grades}
              onUpdateGrade={updateGrade}
              onDeleteGrade={deleteGrade}
              isTeacher={role === "teacher"}
            />
          )}
          {currentView === "filterStudent" && (
            <GradeTable
              grades={grades.filter(
                (grade) =>
                  grade.studentName.toLowerCase() === studentName.toLowerCase()
              )}
              onUpdateGrade={updateGrade}
              onDeleteGrade={deleteGrade}
              isTeacher={role === "teacher"}
            />
          )}
          {currentView === "addGrade" && (
            <GradeForm onAddGrade={addGrade} existingGrades={grades} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
