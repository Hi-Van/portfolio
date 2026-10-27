"use client";

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  MotionConfig,
  m,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { isReturnKey, type ReturnKey, returnTarget } from "../../content/site";
import { visibleAnswer } from "../../lib/agent/parts";
import { citationTargets, isRefusal } from "../../lib/ask/compose";
import { useAgentChat } from "./chat-provider";

const MAX_QUESTION = 280;

const SUGGESTIONS = [
  "What did he ship at Walmart?",
  "What is the 22% number?",
  "What is assumed in the model?",
  "How do I reach him?",
];

/** Built once; every marker the room is willing to link resolves in it. */
const CITATIONS = citationTargets();

const ANCHOR = /\[\[([a-z]+)(?:#([a-z0-9-]+))?\|([^\]]+)\]\]/g;

/** Turns the model's inline anchors into links, as they arrive. */
function renderWithAnchors(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(ANCHOR)) {
    const [whole, surface, anchor, label] = match;
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    const target = anchor ? `${surface}#${anchor}` : surface;
    if (CITATIONS.has(target)) {
      const href =
        surface === "home" ? "/" : `/${surface}${anchor ? `#${anchor}` : ""}`;
      nodes.push(
        <Link
          key={`${start}-${label}`}
          href={href}
          className="text-indigo underline decoration-line underline-offset-4"
        >
          {label}
        </Link>,
      );
    } else {
      // A citation that does not resolve is not a link. The label stays.
      nodes.push(label);
    }
    cursor = start + whole.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

export function AgentRoom() {
  const { messages, sendMessage, status, error, regenerate, stop } =
    useAgentChat();
  const router = useRouter();

  const [input, setInput] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [back, setBack] = useState<ReturnKey>("index");
  const [times, setTimes] = useState<Record<string, string>>({});
  const previousStatus = useRef(status);
  const reduce = useReducedMotion();
  const logRef = useRef<HTMLDivElement>(null);

  const busy = status === "streaming" || status === "submitted";
  const { href: backHref, label: backLabel } = returnTarget(back);

  // The return target comes from the allowlist, never from the raw parameter.
  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from") ?? "";
    setBack(isReturnKey(from) ? from : "index");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        router.push(backHref);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [backHref, router]);

  // One announcement per finished answer, never one per fragment.
  useEffect(() => {
    const finished = previousStatus.current !== "ready" && status === "ready";
    previousStatus.current = status;
    if (!finished) return;
    const last = messages.at(-1);
    if (!last || last.role !== "assistant") return;
    const text = visibleAnswer(
      last.parts as { type: string; text?: string }[],
    ).text.replace(ANCHOR, "");
    setAnnouncement(isRefusal(text) ? text : `Answer: ${text}`);
  }, [messages, status]);

  // A time for each message, without asking the protocol for one.
  useEffect(() => {
    setTimes((current) => {
      const next = { ...current };
      for (const message of messages) {
        if (!(message.id in next)) {
          next[message.id] = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        }
      }
      return next;
    });
  }, [messages]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: the log follows the transcript as it grows
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  function submit(text: string) {
    const question = text.trim();
    if (question.length === 0 || question.length > MAX_QUESTION || busy) return;
    setInput("");
    void sendMessage({ text: question });
  }

  return (
    <div className="mx-auto flex max-w-chat flex-col gap-4">
      <output aria-live="polite" className="sr-only">
        {announcement}
      </output>

      <div
        ref={logRef}
        className="flex max-h-room flex-col gap-4 overflow-y-auto"
      >
        {messages.length === 0 ? (
          <div className="rounded-panel bg-panel p-6">
            <p className="text-reading text-body">
              An agent that answers from this site and nothing else. Every
              answer names the page it came from.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    onClick={() => submit(suggestion)}
                    className="inline-flex min-h-11 items-center rounded-pill border border-line-strong px-4 text-left font-ui text-label text-ink transition-colors duration-200 hover:bg-hover"
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <LazyMotion features={domAnimation}>
          <MotionConfig reducedMotion="user">
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const mine = message.role === "user";
                const text = mine
                  ? messageText(
                      message.parts as { type: string; text?: string }[],
                    )
                  : visibleAnswer(
                      message.parts as { type: string; text?: string }[],
                    ).text;
                return (
                  <m.article
                    key={message.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="flex flex-col gap-1"
                    aria-label={
                      mine ? "Your question" : "The site agent's answer"
                    }
                  >
                    <p className="flex items-baseline gap-2 font-ui text-caps tracking-caps text-muted uppercase">
                      <span className="text-ink">
                        {mine ? "You" : "Site agent"}
                      </span>
                      <span>{times[message.id] ?? ""}</span>
                    </p>
                    <p className="text-reading text-body">
                      {mine ? text : renderWithAnchors(text)}
                    </p>
                    {!mine && isRefusal(text.replace(ANCHOR, "")) ? (
                      <p className="mt-1 font-ui text-caption text-clay">
                        This answer is not on the site, so the agent does not
                        guess.
                      </p>
                    ) : null}
                  </m.article>
                );
              })}
            </AnimatePresence>
          </MotionConfig>
        </LazyMotion>

        {busy ? (
          <p className="font-ui text-label text-muted" aria-hidden="true">
            The agent is reading the site
            <span className="ml-1 inline-block animate-pulse">...</span>
          </p>
        ) : null}

        {error ? (
          <div className="rounded-panel border border-line-strong p-4">
            <p className="font-ui text-label text-ink">
              The answer did not arrive.
            </p>
            <button
              type="button"
              onClick={() => void regenerate()}
              className="mt-2 inline-flex min-h-11 items-center rounded-action border border-ink px-4 font-ui text-label text-ink"
            >
              Try again
            </button>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(input);
        }}
        className="flex items-center gap-2"
      >
        <label htmlFor="agent-input" className="sr-only">
          Ask about this site
        </label>
        <input
          id="agent-input"
          value={input}
          maxLength={MAX_QUESTION}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit(input);
            }
          }}
          placeholder="Ask about this site"
          className="h-11 flex-1 rounded-pill border border-line-strong bg-paper px-5 font-ui text-label text-ink placeholder:text-muted"
        />
        {busy ? (
          <button
            type="button"
            onClick={() => stop()}
            className="inline-flex size-11 items-center justify-center rounded-pill bg-ink text-paper"
          >
            <span className="sr-only">Stop the answer</span>
            <span
              aria-hidden="true"
              className="block size-3 rounded-fact bg-paper"
            />
          </button>
        ) : (
          <button
            type="submit"
            disabled={input.trim().length === 0}
            className="inline-flex size-11 items-center justify-center rounded-pill bg-ink text-paper disabled:opacity-50"
          >
            <span className="sr-only">Send the question</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        )}
      </form>

      <p className="flex flex-wrap items-center justify-between gap-2 font-ui text-caption text-muted">
        <span>
          Answers come from this site only. Nothing you type is stored.
        </span>
        <Link
          href={backHref}
          className="inline-flex min-h-11 items-center text-ink underline decoration-line-strong underline-offset-4"
        >
          Back to {backLabel}
        </Link>
      </p>
    </div>
  );
}
