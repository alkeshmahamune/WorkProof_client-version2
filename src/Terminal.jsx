import { useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  WorkProof Terminal: animated session replay                        */
/*  React + Tailwind (v3.1+, arbitrary values). No other packages.     */
/*                                                                    */
/*  Usage:                                                             */
/*    import Terminal, { SCENES } from "./Terminal";                   */
/*    <Terminal cfg={SCENES.signin} active />                          */
/*    <Terminal cfg={myCustomCfg} active={isVisible} />                */
/*                                                                    */
/*  Props:                                                             */
/*    cfg     scene config (see SCENES below for the shape)            */
/*    active  boolean. Replay runs while true, resets when false.      */
/* ------------------------------------------------------------------ */

export const BRAND_GRADIENT = "linear-gradient(90deg,#FD7228 0%,#F54941 30%,#DC2C7B 55%,#7624E7 80%,#4D2EF0 100%)";

export const TONE = { info: "#6F7A9C", fail: "#FF6B81", good: "#A892FF", pass: "#4CC9A0" };

/* Only the CSS the terminal needs: font, keyframes, reduced-motion. */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

.wp-term-mono{ font-family:'JetBrains Mono',ui-monospace,monospace; }
@keyframes wp-row{ from{ opacity:0; transform:translateY(8px) } to{ opacity:1; transform:none } }
@keyframes wp-stamp{ 0%{ opacity:0; transform:scale(1.8) rotate(-16deg) } 60%{ opacity:1; transform:scale(.94) rotate(-6deg) } 100%{ opacity:1; transform:scale(1) rotate(-6deg) } }
@keyframes wp-caret{ 0%,49%{ opacity:1 } 50%,100%{ opacity:0 } }

@media (prefers-reduced-motion: reduce){
  .wp-term, .wp-term *, .wp-term *::before, .wp-term *::after{
    animation-duration:.001ms !important; animation-delay:0s !important;
    transition-duration:.001ms !important; transition-delay:0s !important;
  }
}
`;

/*
  Scene config shape:
  {
    title:  string          header label on the left
    live:   string          status text while running ("recording")
    tiers:  [s, s, s]       three progress bar labels
    done:   string          caption when replay completes
    working:string          caption while replay runs
    events: [{ t, tone, text, bump: [n, n, n] }]
            tone: "info" | "fail" | "good" | "pass"
            bump: how much each of the three bars fills on this event (0-100)
  }
*/
export const SCENES = {
  signin: {
    title: "session / payments-service / candidate 0412",
    live: "recording",
    tiers: ["Skill check", "Your stack", "Wildcard"],
    done: "Tests first, root-cause debugging, and a quick read of unfamiliar code.",
    working: "Reading how the work was done, not just the final answer.",
    events: [
      { t: "00:00", tone: "info", text: "sandbox ready, repo cloned", bump: [0, 0, 0] },
      { t: "02:14", tone: "fail", text: "ran suite: 3 failing", bump: [0, 0, 0] },
      { t: "04:40", tone: "good", text: "wrote the failing test before the fix", bump: [34, 0, 0] },
      { t: "09:05", tone: "good", text: "traced timeout to the connection pool", bump: [38, 12, 0] },
      { t: "14:32", tone: "pass", text: "refactored retry logic, 6 passing", bump: [20, 52, 0] },
      { t: "21:10", tone: "good", text: "unfamiliar queue lib: read docs first, then shipped", bump: [0, 20, 78] },
    ],
  },
  register: {
    title: "workspace / northwind-labs / setup",
    live: "building",
    tiers: ["Stack read", "Challenges", "Wildcards"],
    done: "Your first assessment is ready to send.",
    working: "Turning your real codebase into a fair, specific test.",
    events: [
      { t: "00:00", tone: "info", text: "connected repo northwind/payments", bump: [0, 0, 0] },
      { t: "00:06", tone: "good", text: "detected node 20, postgres 15, redis", bump: [72, 0, 0] },
      { t: "00:21", tone: "good", text: "drafted challenge: retry storm in the job queue", bump: [28, 46, 0] },
      { t: "00:38", tone: "pass", text: "sandbox image built, 6 checks passing", bump: [0, 54, 0] },
      { t: "00:44", tone: "good", text: "queued wildcard: a library your stack doesn't use", bump: [0, 0, 70] },
      { t: "00:52", tone: "pass", text: "first assessment ready to send", bump: [0, 0, 30] },
    ],
  },
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function Seal({ animate }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      style={animate ? { animation: "wp-stamp .55s cubic-bezier(.2,.8,.3,1) both" } : { transform: "rotate(-6deg)" }}
    >
      <circle cx="32" cy="32" r="29" stroke="#FD7228" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="24" stroke="#FD7228" strokeWidth="1" strokeDasharray="2 3.2" />
      <path d="M21 33l7 7 15-16" stroke="#FD7228" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Terminal({ cfg = SCENES.signin, active = true }) {
  const reduced = useReducedMotion();
  const total = cfg.events.length;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return setStep(0);
    if (reduced) return setStep(total + 1);
    const delay = step === 0 ? 1500 : step <= total ? 1100 : 5200;
    const id = setTimeout(() => setStep((s) => (s > total ? 0 : s + 1)), delay);
    return () => clearTimeout(id);
  }, [active, step, reduced, total]);

  const shown = cfg.events.slice(0, Math.min(step, total));
  const fills = useMemo(
    () => [0, 1, 2].map((i) => Math.min(100, shown.reduce((s, e) => s + e.bump[i], 0))),
    [shown]
  );
  const done = step > total;

  return (
    <div
      className="wp-term w-full max-w-[540px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]"
      style={{ background: "#07060E", color: "#DDE2F2" }}
      role="img"
      aria-label="Animated terminal replay"
    >
      <style>{CSS}</style>

      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="wp-term-mono text-[12px]" style={{ color: "#6F7A9C" }}>
          {cfg.title}
        </span>
        <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "#6F7A9C" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: done ? "#4CC9A0" : "#FF6B81" }} />
          {done ? "complete" : cfg.live}
        </span>
      </div>

      <ol className="wp-term-mono min-h-[224px] space-y-2.5 px-4 py-4 text-[13px] leading-5">
        {shown.map((e) => (
          <li key={e.t} className="flex gap-3" style={{ animation: "wp-row .4s ease-out both" }}>
            <span style={{ color: "#6F7A9C" }}>{e.t}</span>
            <span style={{ color: TONE[e.tone] }} aria-hidden="true">
              {e.tone === "fail" ? "x" : e.tone === "pass" ? "+" : "-"}
            </span>
            <span>{e.text}</span>
          </li>
        ))}
        {!done && (
          <li className="flex gap-3" aria-hidden="true">
            <span style={{ color: "#6F7A9C" }}>{shown.length ? "..:.." : ""}</span>
            <span
              className="inline-block h-4 w-2 translate-y-0.5"
              style={{ background: "#A892FF", animation: "wp-caret 1s steps(1) infinite" }}
            />
          </li>
        )}
      </ol>

      <div className="border-t border-white/10 px-4 pb-4 pt-3.5">
        <div className="grid grid-cols-3 gap-4">
          {cfg.tiers.map((name, i) => (
            <div key={name}>
              <div className="mb-1.5 flex items-baseline justify-between text-[12px]">
                <span style={{ color: "#6F7A9C" }}>{name}</span>
                <span className="wp-term-mono">{Math.round(fills[i])}</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${fills[i]}%`,
                    background: BRAND_GRADIENT,
                    transition: "width .9s cubic-bezier(.3,.7,.2,1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-[64px] items-center justify-between">
          <p className="max-w-[330px] text-[13px] leading-5" style={{ color: "#8E97B5" }}>
            {done ? cfg.done : cfg.working}
          </p>
          <div className="w-16">{done && <Seal animate={!reduced} />}</div>
        </div>
      </div>
    </div>
  );
}