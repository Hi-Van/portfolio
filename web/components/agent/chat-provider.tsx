"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { createContext, useContext, type ReactNode } from "react";

/**
 * The conversation lives above the route, so moving between surfaces keeps the
 * transcript and any answer still arriving, and a reload empties it. Stream
 * resume stays off: a reload must not replay an answer the reader lost.
 */
function textOf(message: { parts: { type: string; text?: string }[] }): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("")
    .trim();
}

/**
 * The transport posts the contract in design.md, not the SDK's chat payload:
 * one question and the turns before it. The endpoint validates that shape.
 */
const transport = new DefaultChatTransport({
  api: "/api/ask",
  prepareSendMessagesRequest: ({ messages }) => {
    const typed = messages as { role: string; parts: { type: string; text?: string }[] }[];
    const last = typed.at(-1);
    return {
      body: {
        question: last ? textOf(last) : "",
        history: typed.slice(0, -1).map((message) => ({
          role: message.role,
          text: textOf(message),
        })),
      },
    };
  },
});

type Chat = ReturnType<typeof useChat>;
const ChatContext = createContext<Chat | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChat({ transport });
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export function useAgentChat(): Chat {
  const chat = useContext(ChatContext);
  if (chat === null) throw new Error("useAgentChat must be used inside ChatProvider");
  return chat;
}
