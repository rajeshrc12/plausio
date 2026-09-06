from typing import TYPE_CHECKING
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from user_service.config.database import Base

if TYPE_CHECKING:
    from user_service.models.chat import Chat


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(primary_key=True)

    chat_id: Mapped[int] = mapped_column(
        ForeignKey("chats.id"),
        nullable=False,
        index=True,
    )

    content: Mapped[str] = mapped_column(Text)
    type: Mapped[str] = mapped_column(Text)
    role: Mapped[str] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    chat: Mapped["Chat"] = relationship(
        "Chat",
        back_populates="messages",
    )
