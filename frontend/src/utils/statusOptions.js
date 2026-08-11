export const STATUS_OPTIONS = [
  {
    id: 'todo',
    label: 'To Do',
    apiValue: 'To Do',
    badgeClass: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    apiValue: 'In Progress',
    badgeClass: 'border-sky-200 bg-sky-50 text-sky-700',
  },
  {
    id: 'done',
    label: 'Done',
    apiValue: 'Done',
    badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
];

export function normalizeStatus(status) {
  if (!status) return 'todo';

  const normalized = String(status).trim().toLowerCase();

  if (normalized === 'pending') return 'todo';
  if (normalized === 'completed') return 'done';
  if (normalized === 'to_do' || normalized === 'to do') return 'todo';
  if (normalized === 'in progress' || normalized === 'in_progress') return 'in_progress';

  return STATUS_OPTIONS.some((option) => option.id === normalized) ? normalized : 'todo';
}

export function getStatusOption(status) {
  const normalized = normalizeStatus(status);
  return STATUS_OPTIONS.find((option) => option.id === normalized) || STATUS_OPTIONS[0];
}

export function toApiStatus(status) {
  return getStatusOption(status).apiValue;
}
