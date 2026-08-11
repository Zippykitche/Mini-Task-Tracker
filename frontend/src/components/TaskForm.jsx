function TaskForm() {
  return (
    <form className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-800">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Example: Finish project README"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          />
          <p className="mt-2 text-xs text-slate-500">Required when validation is connected.</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-800">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Add a short task description"
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
            defaultValue="pending"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Save task
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
