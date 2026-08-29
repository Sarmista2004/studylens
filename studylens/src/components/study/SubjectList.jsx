import SubjectCard from "./SubjectCard";

function SubjectList({ subjects, onUpdate, onDelete }) {

  if (subjects.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400 mt-8 text-lg">
        No subjects added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">

      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}

export default SubjectList;