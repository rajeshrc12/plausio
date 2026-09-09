from typing import Annotated, TypedDict

from langchain_core.messages import BaseMessage


from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

from user_service.config.aws import llm


class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]


def chat(state: ChatState):
    response = llm.invoke(state["messages"])

    return {"messages": [response]}


graph = StateGraph(ChatState)

graph.add_node("chat", chat)

graph.add_edge(START, "chat")

graph.add_edge("chat", END)

graph = graph.compile()
