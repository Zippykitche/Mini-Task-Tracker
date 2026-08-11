from datetime import datetime, timezone

from extensions import db


TASK_STATUS_TO_DO = "To Do"
TASK_STATUS_IN_PROGRESS = "In Progress"
TASK_STATUS_DONE = "Done"

TASK_STATUSES = (
    TASK_STATUS_TO_DO,
    TASK_STATUS_IN_PROGRESS,
    TASK_STATUS_DONE,
)


class Task(db.Model):
    __tablename__ = "tasks"
    __table_args__ = (
        db.CheckConstraint(
            "status IN ('To Do', 'In Progress', 'Done')",
            name="check_task_status",
        ),
    )

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default=TASK_STATUS_TO_DO)
    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
