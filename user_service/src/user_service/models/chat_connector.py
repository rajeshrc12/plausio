from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from user_service.config.database import Base

from user_service.models.chat import Chat
from user_service.models.connector import Connector


class ChatConnector(Base):
    __tablename__ = "chat_connectors"

    chat_id: Mapped[int] = mapped_column(
        ForeignKey("chats.id", ondelete="CASCADE"),
        primary_key=True,
    )

    connector_id: Mapped[int] = mapped_column(
        ForeignKey("connectors.id", ondelete="CASCADE"),
        primary_key=True,
    )

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
        back_populates="chat_connectors",
    )

    connector: Mapped["Connector"] = relationship(
        "Connector",
        back_populates="chat_connectors",
    )
