from typing import Annotated, TypedDict

from langchain_core.messages import BaseMessage
from langchain_core.tools import tool
from langchain_community.tools import DuckDuckGoSearchResults
from qdrant_client.models import Filter, FieldCondition, MatchAny

from langgraph.graph import StateGraph, START
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition, InjectedState

from user_service.config.aws import llm
from user_service.config.qdrant import get_vector_store

vector_store = get_vector_store()


class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    file_ids: list[int]


@tool
def knowledge_base_search(
    query: str,
    state: Annotated[ChatState, InjectedState],
) -> str:
    """
    Search the internal knowledge base for relevant information
    from the specified files.
    """

    file_ids = state["file_ids"]

    if not file_ids:
        return "No files were provided for the search."

    qdrant_filter = Filter(
        must=[
            FieldCondition(
                key="metadata.file_id",
                match=MatchAny(any=file_ids),
            )
        ]
    )

    retriever = vector_store.as_retriever(
        search_kwargs={
            "k": 4,
            "filter": qdrant_filter,
        }
    )

    docs = retriever.invoke(query)

    if not docs:
        return "No relevant information found in the specified files."

    return "\n\n".join(doc.page_content for doc in docs)


search_tool = DuckDuckGoSearchResults()

tools = [
    knowledge_base_search,
    search_tool,
]

llm_with_tools = llm.bind_tools(tools)


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
