"use client";

import { useMemo, useState } from "react";

type Attendance = "yes" | "no" | "later";

type FormState = {
  name: string;
  attendance: Attendance | "";
  guestsCount: string;
  dietary: string;
  drink: string;
};

function isPositiveIntString(v: string) {
  if (!/^\d+$/.test(v)) return false;
  return Number(v) >= 1;
}

export function RsvpForm() {
  const [state, setState] = useState<FormState>({
    name: "",
    attendance: "",
    guestsCount: "",
    dietary: "",
    drink: "",
  });
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [success, setSuccess] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!state.name.trim()) e.name = "Please enter your name.";
    if (!state.attendance) e.attendance = "Please choose an option.";
    if (!state.guestsCount.trim() || !isPositiveIntString(state.guestsCount)) {
      e.guestsCount = "Please enter a number (1, 2, 3...).";
    }
    if (!state.drink.trim()) e.drink = "Please tell us what you’d like to drink.";
    return e;
  }, [state]);

  const canSubmit = Object.keys(errors).length === 0;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function markTouched<K extends keyof FormState>(key: K) {
    setTouched((t) => (t[key] ? t : { ...t, [key]: true }));
  }

  const showError = (key: keyof FormState) => Boolean(errors[key] && (submittedOnce || touched[key]));

  const stepValid = useMemo(() => {
    if (step === 1) return !errors.name;
    if (step === 2) return !errors.attendance;
    return !errors.guestsCount && !errors.drink;
  }, [errors, step]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittedOnce(true);
    if (!canSubmit) return;

    // UI-only replica: no backend. Keep payload for easy wiring later.
    const payload = {
      ...state,
      guestsCount: Number(state.guestsCount),
      submittedAt: new Date().toISOString(),
    };
    // eslint-disable-next-line no-console
    console.log("RSVP submitted", payload);
    setSuccess(true);
    setState({
      name: "",
      attendance: "",
      guestsCount: "",
      dietary: "",
      drink: "",
    });
    setSubmittedOnce(false);
    setTouched({});
    setStep(1);
    window.setTimeout(() => setSuccess(false), 2600);
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="formFrame">
        <div className="formFrameDots" aria-hidden="true" />
        <div className="formTitle">Please confirm your attendance</div>
        <div className="formStepper" aria-hidden="true">
          <span className={step >= 1 ? "stepDot stepDotActive" : "stepDot"} />
          <span className={step >= 2 ? "stepDot stepDotActive" : "stepDot"} />
          <span className={step >= 3 ? "stepDot stepDotActive" : "stepDot"} />
        </div>

        {success ? (
          <div className="formSuccess" role="status" aria-live="polite">
            <div className="formConfetti" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className="confettiPiece" style={{ ["--i" as any]: i }} />
              ))}
            </div>
            <div className="formSuccessTitle">Thank you!</div>
            <div className="formSuccessText">Your RSVP has been recorded.</div>
          </div>
        ) : null}

        <div className="formGrid">
        {step === 1 ? (
          <div className="field">
            <label className="label" htmlFor="name">
              Your name <span className="req">*</span>
            </label>
            <input
              className="input"
              id="name"
              name="name"
              value={state.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => markTouched("name")}
              autoComplete="name"
              placeholder="Name"
            />
            {showError("name") ? <div className="error">{errors.name}</div> : null}
          </div>
        ) : null}

        {step === 2 ? (
          <fieldset className="field">
            <legend className="label">
              Will you come? <span className="req">*</span>
            </legend>
            <div className="radioGroup" role="radiogroup" aria-label="Will you come?">
              <label className="radio">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={state.attendance === "yes"}
                  onChange={() => {
                    update("attendance", "yes");
                    markTouched("attendance");
                  }}
                />
                Yes, I will
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={state.attendance === "no"}
                  onChange={() => {
                    update("attendance", "no");
                    markTouched("attendance");
                  }}
                />
                Unfortunately, I can not :(
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="attendance"
                  value="later"
                  checked={state.attendance === "later"}
                  onChange={() => {
                    update("attendance", "later");
                    markTouched("attendance");
                  }}
                />
                I will tell you a bit later
              </label>
            </div>
            {showError("attendance") ? <div className="error">{errors.attendance}</div> : null}
          </fieldset>
        ) : null}

        {step === 3 ? (
          <>
            <div className="field">
              <label className="label" htmlFor="guestsCount">
                How many guests from your family? <span className="req">*</span>
              </label>
              <input
                className="input"
                id="guestsCount"
                name="guestsCount"
                inputMode="numeric"
                value={state.guestsCount}
                onChange={(e) => update("guestsCount", e.target.value)}
                onBlur={() => markTouched("guestsCount")}
                placeholder="1"
              />
              {showError("guestsCount") ? <div className="error">{errors.guestsCount}</div> : null}
            </div>

            <div className="field">
              <label className="label" htmlFor="dietary">
                Any dietary requirements?
              </label>
              <input
                className="input"
                id="dietary"
                name="dietary"
                value={state.dietary}
                onChange={(e) => update("dietary", e.target.value)}
                onBlur={() => markTouched("dietary")}
                placeholder="e.g., vegetarian, no nuts"
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="drink">
                What would you like to drink? <span className="req">*</span>
              </label>
              <input
                className="input"
                id="drink"
                name="drink"
                value={state.drink}
                onChange={(e) => update("drink", e.target.value)}
                onBlur={() => markTouched("drink")}
                placeholder="e.g., wine, beer, soft drinks"
              />
              {showError("drink") ? <div className="error">{errors.drink}</div> : null}
            </div>
          </>
        ) : null}
        </div>

        <div className="formActions">
          {step > 1 ? (
            <button
              className="button buttonGhost"
              type="button"
              onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
            >
              Back
            </button>
          ) : null}

          {step < 3 ? (
            <button
              className="button"
              type="button"
              onClick={() => {
                setSubmittedOnce(true);
                if (stepValid) setStep((s) => (s === 1 ? 2 : 3));
              }}
            >
              Next
            </button>
          ) : (
            <button className="button" type="submit" disabled={!canSubmit}>
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

