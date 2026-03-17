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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    // UI-only replica: no backend. Keep payload for easy wiring later.
    const payload = {
      ...state,
      guestsCount: Number(state.guestsCount),
      submittedAt: new Date().toISOString(),
    };
    // eslint-disable-next-line no-console
    console.log("RSVP submitted", payload);
    alert("Thank you! Your RSVP has been recorded (demo).");
    setState({
      name: "",
      attendance: "",
      guestsCount: "",
      dietary: "",
      drink: "",
    });
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="formGrid">
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
            autoComplete="name"
            placeholder="Name"
          />
          {errors.name ? <div className="error">{errors.name}</div> : null}
        </div>

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
                onChange={() => update("attendance", "yes")}
              />
              Yes, I will
            </label>
            <label className="radio">
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={state.attendance === "no"}
                onChange={() => update("attendance", "no")}
              />
              Unfortunately, I can not :(
            </label>
            <label className="radio">
              <input
                type="radio"
                name="attendance"
                value="later"
                checked={state.attendance === "later"}
                onChange={() => update("attendance", "later")}
              />
              I will tell you a bit later
            </label>
          </div>
          {errors.attendance ? <div className="error">{errors.attendance}</div> : null}
        </fieldset>

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
            placeholder="1"
          />
          {errors.guestsCount ? (
            <div className="error">{errors.guestsCount}</div>
          ) : null}
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
            placeholder="e.g., wine, beer, soft drinks"
          />
          {errors.drink ? <div className="error">{errors.drink}</div> : null}
        </div>
      </div>

      <div className="formActions">
        <button className="button" type="submit" disabled={!canSubmit}>
          Confirm attendance
        </button>
        <div className="fineprint">
          This is a UI replica. Wire this to email/Sheets when ready.
        </div>
      </div>
    </form>
  );
}

