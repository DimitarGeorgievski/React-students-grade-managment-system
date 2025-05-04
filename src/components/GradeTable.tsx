import React from "react";

interface Grade {
  studentName: string;
  grade: number;
  subject: string;
}
interface GradeTableProps {
  grades: Grade[];
  onUpdateGrade: (grade: Grade) => void;
  onDeleteGrade: (grade: Grade) => void;
  isTeacher: boolean;
}
const GradeTable: React.FC<GradeTableProps> = ({
  grades,
  onUpdateGrade,
  onDeleteGrade,
  isTeacher,
}) => {
  const groupedGrades = grades.reduce(
    (acc: { [key: string]: Grade[] }, grade) => {
      if (!acc[grade.studentName]) {
        acc[grade.studentName] = [];
      }
      acc[grade.studentName].push(grade);
      return acc;
    },
    {}
  );
  const sortedGroupedGrades = Object.keys(groupedGrades).map((studentName) => {
    const sortedGrades = groupedGrades[studentName].sort(
      (a, b) => a.grade - b.grade
    );
    return {
      studentName,
      grades: sortedGrades,
    };
  });
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Student Name</th>
            <th className="px-6 py-3">Subject</th>
            <th className="px-6 py-3">Grade</th>
            {isTeacher && <th className="px-6 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedGroupedGrades.map((group, index) => (
            <React.Fragment key={index}>
              {}
              {group.grades.map((grade, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{grade.studentName}</td>
                  <td className="px-6 py-4">{grade.subject}</td>
                  <td className="px-6 py-4">{grade.grade}</td>
                  {isTeacher && (
                    <td className="px-6 py-4 space-x-4">
                      <button
                        onClick={() => onUpdateGrade(grade)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onDeleteGrade(grade)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;
