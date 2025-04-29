import React, { useState } from "react";

interface Grade {
  studentName: string;
  grade: number;
  subject: string;
}

interface Props {
  onAddGrade: (grade: Grade) => void;
  existingGrades: Grade[];
}

const subjects = [
  "Математика",
  "Економија",
  "Физика",
  "Програмирање",
  "Веб Програмирање",
  "Датабази",
  "Компјутерски Мрежи",
];

const GradeForm: React.FC<Props> = ({ onAddGrade, existingGrades }) => {
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState<number>(1);
  const [subject, setSubject] = useState(subjects[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const exists = existingGrades.some(
      (g) =>
        g.studentName.toLowerCase() === studentName.toLowerCase() &&
        g.subject === subject &&
        g.grade === grade
    );

    if (exists) {
      alert("Оценката веќе постои за овој ученик и предмет.");
      return;
    }

    onAddGrade({ studentName, grade, subject });
    setStudentName("");
    setGrade(1);
    setSubject(subjects[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Име на ученик"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {subjects.map((subj) => (
          <option key={subj} value={subj}>
            {subj}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Оценка (1-5)"
        value={grade}
        onChange={(e) => setGrade(Number(e.target.value))}
        required
        min={1}
        max={5}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Додади оценка
      </button>
    </form>
  );
};

export default GradeForm;
