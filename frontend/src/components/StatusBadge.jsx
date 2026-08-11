import { getStatusOption } from '../utils/statusOptions.js';

function StatusBadge({ status = 'todo' }) {
  const config = getStatusOption(status);

  return (
    <span
      className={`inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-semibold ${config.badgeClass}`}
    >
      {config.label}
    </span>
  );
}

export default StatusBadge;
