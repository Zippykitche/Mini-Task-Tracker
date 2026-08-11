from flask import Blueprint, jsonify, request

from extensions import db
from models import TASK_STATUSES, TASK_STATUS_TO_DO, Task


tasks_bp = Blueprint("tasks", __name__)


def serialize_task(task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "created_at": task.created_at.isoformat() if task.created_at else None,
        "updated_at": task.updated_at.isoformat() if task.updated_at else None,
    }


def get_json_body():
    data = request.get_json(silent=True)
    if data is None:
        return {}
    return data


def validate_title(data, required=False):
    title = data.get("title")

    if required and title is None:
        return None, "Title is required."

    if title is not None:
        title = str(title).strip()
        if not title:
            return None, "Title is required."

    return title, None


def validate_status(data):
    status = data.get("status")

    if status is None:
        return None, None

    if status not in TASK_STATUSES:
        allowed_statuses = ", ".join(TASK_STATUSES)
        return None, f"Status must be one of: {allowed_statuses}."

    return status, None


@tasks_bp.get("")
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([serialize_task(task) for task in tasks]), 200


@tasks_bp.post("")
def create_task():
    data = get_json_body()
    title, title_error = validate_title(data, required=True)
    status, status_error = validate_status(data)

    if title_error:
        return jsonify({"error": title_error}), 400

    if status_error:
        return jsonify({"error": status_error}), 400

    task = Task(
        title=title,
        description=data.get("description"),
        status=status or TASK_STATUS_TO_DO,
    )

    db.session.add(task)
    db.session.commit()

    return jsonify(serialize_task(task)), 201


@tasks_bp.put("/<int:task_id>")
def update_task(task_id):
    task = Task.query.get(task_id)

    if task is None:
        return jsonify({"error": "Task not found."}), 404

    data = get_json_body()
    title, title_error = validate_title(data)
    status, status_error = validate_status(data)

    if title_error:
        return jsonify({"error": title_error}), 400

    if status_error:
        return jsonify({"error": status_error}), 400

    if "title" in data:
        task.title = title

    if "description" in data:
        task.description = data.get("description")

    if "status" in data:
        task.status = status

    db.session.commit()

    return jsonify(serialize_task(task)), 200


@tasks_bp.delete("/<int:task_id>")
def delete_task(task_id):
    task = Task.query.get(task_id)

    if task is None:
        return jsonify({"error": "Task not found."}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully."}), 200
