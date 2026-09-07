from typing import Annotated, TypedDict

from langchain_core.messages import BaseMessage
from langchain_community.tools import DuckDuckGoSearchResults
from langchain_core.tools import create_retriever_tool

from langgraph.graph import StateGraph, START
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition

from user_service.config.aws import llm
from user_service.config.qdrant import get_vector_store

vector_store = get_vector_store()

retriever = vector_store.as_retriever(search_kwargs={"k": 4})

rag_tool = create_retriever_tool(
    retriever,
    name="knowledge_base_search",
    description=(
        "Search the internal knowledge base for relevant information. "
        "Use this tool when the user asks about information contained "
        "in the application's documents or knowledge base."
    ),
)

search_tool = DuckDuckGoSearchResults()

tools = [
    rag_tool,
    search_tool,
]

llm_with_tools = llm.bind_tools(tools)


class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]


def chat(state: ChatState):
    response = llm_with_tools.invoke(state["messages"])

    return {"messages": [response]}


graph = StateGraph(ChatState)

graph.add_node("chat", chat)
graph.add_node("tools", ToolNode(tools))

graph.add_edge(START, "chat")

graph.add_conditional_edges(
    "chat",
    tools_condition,
)

graph.add_edge("tools", "chat")

graph = graph.compile()
