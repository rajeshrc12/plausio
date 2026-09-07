from user_service.models import Connector


def get_rag_prompt(connectors: list[Connector]) -> str:
    connector_context = "\n".join(
        f"- Name: {connector.name}\n"
        f"  Title: {connector.title}\n"
        f"  Description: {connector.description}"
        for connector in connectors
    )

    return f"""
You have access to a knowledge base containing information from these sources:

{connector_context}

Instructions:
- Use the knowledge_base_search tool when the user's question may be answered from the connected sources.
- Provide only the information necessary to answer the user's question. Do not include lengthy explanations, background information, or unnecessary details unless the user explicitly asks for more detail.
""".strip()
