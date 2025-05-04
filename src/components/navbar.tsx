import React from "react";

interface NavbarProps {
  onViewAllGrades: () => void;
  onFilterByStudent: () => void;
  onAddGrade: () => void;
}
const Navbar: React.FC<NavbarProps> = ({
  onViewAllGrades,
  onFilterByStudent,
  onAddGrade,
}) => {
  return (
    <div className="bg-transparent p-4 mb-5 text-white flex justify-between">
      <button
        onClick={onViewAllGrades}
        className="px-4 py-2 rounded-2xl bg-blue-900"
      >
        Види ги сите оценки
      </button>
      <button
        onClick={onFilterByStudent}
        className="px-4 py-2 rounded-2xl bg-blue-900"
      >
        Филтрирај по ученик
      </button>
      <button
        onClick={onAddGrade}
        className="px-4 py-2 rounded-2xl bg-blue-900"
      >
        Додај Оценка
      </button>
    </div>
  );
};
export default Navbar;
