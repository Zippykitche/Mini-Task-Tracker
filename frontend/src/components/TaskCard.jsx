import StatusBadge, { STATUS_OPTIONS, normalizeStatus } from './StatusBadge.jsx';

function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const currentStatus = normalizeStatus(task.status);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-base font-semibold text-slate-950">{task.title}</h2>
          {task.description && (
            <p className="mt-2 break-words text-sm leading-6 text-slate-600">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={currentStatus} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        {/* Quick Status Select */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>Status:</span>
          <select
            value={currentStatus}
            onChange={(e) => onStatusChange && onStatusChange(task.id, e.target.value)}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit && onEdit(task)}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Edit Details
          </button>
          <button
            type="button"
            onClick={() => onDelete && onDelete(task.id)}
            className="rounded-md border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
