import StatusBadge from './StatusBadge.jsx';

function TaskCard({ task }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="break-words text-base font-semibold text-slate-950">{task.title}</h2>
          <p className="mt-2 break-words text-sm leading-6 text-slate-600">{task.description}</p>
        </div>
        <StatusBadge status={task.status} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <button className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
          Edit
        </button>
        <button className="rounded-md border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 transition hover:border-rose-300 hover:bg-rose-50">
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
