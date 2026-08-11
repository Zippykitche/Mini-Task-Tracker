export const STATUS_OPTIONS = [
  { id: 'todo', label: 'To Do', badgeClass: 'border-amber-200 bg-amber-50 text-amber-700 font-semibold' },
  { id: 'in_progress', label: 'In Progress', badgeClass: 'border-sky-200 bg-sky-50 text-sky-700 font-semibold' },
  { id: 'done', label: 'Done', badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold' },
];

export function normalizeStatus(status) {
  if (!status) return 'todo';
  const s = String(status).toLowerCase();
  if (s === 'pending') return 'todo';
  if (s === 'completed') return 'done';
  if (s === 'to_do' || s === 'to do') return 'todo';
  if (s === 'in progress' || s === 'in_progress') return 'in_progress';
  return ['todo', 'in_progress', 'done'].includes(s) ? s : 'todo';
}

const statusMap = {
  todo: { label: 'To Do', badgeClass: 'border-amber-200 bg-amber-50 text-amber-700' },
  in_progress: { label: 'In Progress', badgeClass: 'border-sky-200 bg-sky-50 text-sky-700' },
  done: { label: 'Done', badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
};

function StatusBadge({ status = 'todo' }) {
  const norm = normalizeStatus(status);
  const config = statusMap[norm] || statusMap.todo;

  return (
    <span
      className={`inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${config.badgeClass}`}
    >
      {config.label}
    </span>
  );
}

export default StatusBadge;
