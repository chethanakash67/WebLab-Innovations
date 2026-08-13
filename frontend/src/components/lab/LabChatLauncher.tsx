"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import LabAuthProvider from "./LabAuthProvider";
import LabAssistantChatGate from "./LabAssistantChatGate";
import "./LabChatLauncher.css";

export default function LabChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`lab-launcher-button ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close the Lab assistant" : "Ask the Lab assistant"}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div className="lab-launcher-panel" role="dialog" aria-label="Lab assistant">
          <LabAuthProvider>
            <LabAssistantChatGate />
          </LabAuthProvider>
        </div>
      )}
    </>
  );
}
