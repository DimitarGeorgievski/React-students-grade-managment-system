import React, { useState } from "react";

interface Grade {
  id: string;
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
  const [editingGradeId, setEditingGradeId] = useState<string | null>(null);
  const [newGradeValue, setNewGradeValue] = useState<number>(0);

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

  const handleGradeChange = (value: number) => {
    if (value < 1 || value > 5) {
      alert("Мора да внесиш одценка од 1 до 5.");
    } else {
      setNewGradeValue(value);
    }
  };

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
              {group.grades.map((grade) => (
                <tr
                  key={grade.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{grade.studentName}</td>
                  <td className="px-6 py-4">{grade.subject}</td>
                  <td className="px-6 py-4">
                    {editingGradeId === grade.id ? (
                      <input
                        type="number"
                        value={newGradeValue}
                        onChange={(e) =>
                          handleGradeChange(parseInt(e.target.value))
                        }
                        className="border px-2 py-1 w-20"
                      />
                    ) : (
                      grade.grade
                    )}
                  </td>
                  {isTeacher && (
                    <td className="px-6 py-4 space-x-4">
                      {editingGradeId === grade.id ? (
                        <>
                          <button
                            onClick={() => {
                              onUpdateGrade({
                                ...grade,
                                grade: newGradeValue,
                              });
                              setEditingGradeId(null);
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingGradeId(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingGradeId(grade.id);
                              setNewGradeValue(grade.grade);
                            }}
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
                        </>
                      )}
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
