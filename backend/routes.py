from flask import Blueprint, jsonify, request
from sqlalchemy.exc import SQLAlchemyError

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
    if not isinstance(data, dict):
        return None
    return data


def commit_changes():
    try:
        db.session.commit()
    except SQLAlchemyError:
        db.session.rollback()
        return jsonify({"error": "Database operation failed."}), 500

    return None


def validate_title(data, required=False):
    title = data.get("title")

    if required and title is None:
        return None, "Title is required."

    if title is not None:
        title = str(title).strip()
        if not title:
            return None, "Title is required."

    return title, None


def validate_description(data, required=False):
    description = data.get("description")

    if required and description is None:
        return None, "Description is required."

    if description is not None:
        description = str(description).strip()
        if required and not description:
            return None, "Description is required."

    return description or "", None


def validate_status(data):
    status = data.get("status")

    if status is None:
        return None, None

    if status not in TASK_STATUSES:
        allowed_statuses = ", ".join(TASK_STATUSES)
        return None, f"Status must be one of: {allowed_statuses}."

    return status, None


@tasks_bp.get("")
@tasks_bp.get("/")
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([serialize_task(task) for task in tasks]), 200


@tasks_bp.post("")
@tasks_bp.post("/")
def create_task():
    data = get_json_body()

    if data is None:
        return jsonify({"error": "Request body must be a JSON object."}), 400

    title, title_error = validate_title(data, required=True)
    description, description_error = validate_description(data, required=False)
    status, status_error = validate_status(data)

    if title_error:
        return jsonify({"error": title_error}), 400

    if description_error:
        return jsonify({"error": description_error}), 400

    if status_error:
        return jsonify({"error": status_error}), 400

    task = Task(
        title=title,
        description=description or "",
        status=status or TASK_STATUS_TO_DO,
    )

    db.session.add(task)
    error_response = commit_changes()

    if error_response:
        return error_response

    return jsonify(serialize_task(task)), 201


@tasks_bp.put("/<int:task_id>")
def update_task(task_id):
    task = db.session.get(Task, task_id)

    if task is None:
        return jsonify({"error": "Task not found."}), 404

    data = get_json_body()

    if data is None:
        return jsonify({"error": "Request body must be a JSON object."}), 400

    title, title_error = validate_title(data)
    description, description_error = validate_description(data)
    status, status_error = validate_status(data)

    if title_error:
        return jsonify({"error": title_error}), 400

    if description_error:
        return jsonify({"error": description_error}), 400

    if status_error:
        return jsonify({"error": status_error}), 400

    if "title" in data:
        task.title = title

    if "description" in data:
        task.description = description

    if "status" in data:
        task.status = status

    error_response = commit_changes()

    if error_response:
        return error_response

    return jsonify(serialize_task(task)), 200


@tasks_bp.delete("/<int:task_id>")
def delete_task(task_id):
    task = db.session.get(Task, task_id)

    if task is None:
        return jsonify({"error": "Task not found."}), 404

    db.session.delete(task)
    error_response = commit_changes()

    if error_response:
        return error_response

    return jsonify({"message": "Task deleted successfully."}), 200
