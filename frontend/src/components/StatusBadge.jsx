const statusStyles = {
  pending: 'border-amber-200 bg-amber-50 text-amber-700',
  in_progress: 'border-sky-200 bg-sky-50 text-sky-700',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed',
};

function StatusBadge({ status = 'pending' }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${
        statusStyles[status] || statusStyles.pending
      }`}
    >
      {statusLabels[status] || 'Pending'}
    </span>
  );
}

export default StatusBadge;
