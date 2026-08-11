import TaskForm from './TaskForm.jsx';

function TaskEditModal({ task, isOpen, onClose, onSave, isSaving }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl border border-slate-100">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-950">Edit Task</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description,
            status: task.status,
          }}
          onSubmit={(updatedData) => onSave(task.id, updatedData)}
          onCancel={onClose}
          isSubmitting={isSaving}
          submitButtonLabel="Update Task"
        />
      </div>
    </div>
  );
}

export default TaskEditModal;
