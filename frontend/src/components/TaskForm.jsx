import { useState } from 'react';
import { STATUS_OPTIONS, normalizeStatus } from '../utils/statusOptions.js';
import { validateTaskTitle, validateTaskDescription } from '../utils/validators.js';

function TaskForm({
  initialValues = { title: '', description: '', status: 'todo' },
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitButtonLabel = 'Save task',
}) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [status, setStatus] = useState(normalizeStatus(initialValues.status));
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleError = validateTaskTitle(title);
    if (titleError) {
      setError(titleError);
      return;
    }

    const descriptionError = validateTaskDescription(description);
    if (descriptionError) {
      setError(descriptionError);
      return;
    }

    setError('');
    if (onSubmit) {
      onSubmit({ title: title.trim(), description: description.trim(), status });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="space-y-5">
        {error && (
          <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 font-medium">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-800">
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Example: Finish project README"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-800">
            Description <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError('');
            }}
            placeholder="Add a task description (optional)"
            className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-800">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : submitButtonLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
