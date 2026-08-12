export function validateTaskTitle(title) {
  if (!String(title || '').trim()) {
    return 'Task title is required.';
  }
  return '';
}

export function validateTaskDescription(description) {
  return '';
}
