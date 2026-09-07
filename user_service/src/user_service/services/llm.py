from user_service.config.aws import llm
from langchain_core.messages import SystemMessage, HumanMessage


def call_llm(message: str) -> str:

    response = llm.invoke(
        [
            SystemMessage(content="You are a RAG chat bot"),
            HumanMessage(content=message),
        ]
    )
    return (
        response.content if isinstance(response.content, str) else str(response.content)
    )
