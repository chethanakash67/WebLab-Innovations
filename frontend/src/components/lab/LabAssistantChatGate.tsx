"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { LogIn } from "lucide-react";
import LabAssistantChat from "./LabAssistantChat";
import "./LabAssistantChat.css";

export default function LabAssistantChatGate() {
  const [authRequired, setAuthRequired] = useState<boolean | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch("/api/lab-chat/auth-required")
      .then((response) => response.json())
      .then((data) => setAuthRequired(Boolean(data?.required)))
      .catch(() => setAuthRequired(false));
  }, []);

  if (authRequired === null || status === "loading") {
    return <div className="lab-chat lab-chat-loading">Loading the assistant…</div>;
  }

  if (authRequired && !session) {
    return (
      <div className="lab-chat lab-chat-gate">
        <p>Sign in to chat with the Lab assistant.</p>
        <button type="button" onClick={() => signIn("google")}>
          <LogIn size={16} />
          <span>Sign in with Google</span>
        </button>
      </div>
    );
  }

  return <LabAssistantChat />;
}
