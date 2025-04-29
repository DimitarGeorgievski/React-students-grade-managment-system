// src/components/FilterByStudent.tsx
import React, { useState } from "react";

interface FilterByStudentProps {
  onFilter: (studentName: string) => void;
}

const FilterByStudent: React.FC<FilterByStudentProps> = ({ onFilter }) => {
  const [studentName, setStudentName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(studentName);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-3 items-center mb-4"
    >
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Внесете име на студент"
        className="input input-bordered border rounded-2xl p-1 text-center  w-full max-w-xs mb-2"
      />
      <button
        type="submit"
        className="btn btn-primary rounded-2xl w-32 h-8 bg-blue-500"
      >
        Филтрирај
      </button>
    </form>
  );
};

export default FilterByStudent;
