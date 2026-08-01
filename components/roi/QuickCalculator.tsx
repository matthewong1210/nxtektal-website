"use client";

/**
 * Homepage quick calculator — the 7 first-screen inputs and Current Spending
 * only. Shares the formula module and stored state with /roi-calculator, so
 * entered values carry over when the manager opens the full version.
 */

import Link from "next/link";
import { fmtHours, fmtMoney, fmtMoneyHeadline } from "../../lib/roi/formatters";
import { suggestedCyclesPerDay } from "../../lib/roi/formulas";
import { parseNum, useRoiCalculator } from "./state";
import { NumberField, Segmented } from "./fields";

export default function QuickCalculator() {
  const { form, setField, result } = useRoiCalculator();
  const c = result.current;
  const ready = result.status !== "incomplete";
  const suggested = suggestedCyclesPerDay(parseNum(form.operatingHours), parseNum(form.intervalHours));

  return (
    <section className="roi-quick" id="roi" aria-labelledby="roi-quick-title">
      <div className="block-inner">
        <div className="eyebrow">OPERATING ECONOMICS</div>
        <h2 id="roi-quick-title">What is the current workflow costing your range?</h2>
        <p className="roi-quick-sub">
          Use your own labor, collection frequency, run time, and equipment costs to estimate the direct operating cost of today’s workflow.
        </p>

        <div className="roi-app">
          <div className="roi-app-titlebar">
            <span className="roi-app-title"><i aria-hidden="true" /> NXTektal · Operating Cost Estimator</span>
            <span className="roi-app-note">Estimates from your inputs — not a quote</span>
          </div>
          <div className="roi-quick-grid">
          <form className="roi-quick-form" onSubmit={(e) => e.preventDefault()}>
            <Segmented
              legend="What does one hour of range labor cost the facility?"
              value={form.rateMode}
              options={[
                { value: "loaded", label: "Fully loaded hourly cost" },
                { value: "base", label: "I only know the base wage" },
              ]}
              onChange={(v) => setField("rateMode", v)}
            />
            {form.rateMode === "loaded" ? (
              <NumberField
                label="Fully loaded cost per hour"
                prefix="$"
                required
                value={form.loadedRate}
                onChange={(v) => setField("loadedRate", v)}
                placeholder="22"
                hint="Wage plus payroll taxes, insurance and benefits."
              />
            ) : (
              <div className="roi-field-row">
                <NumberField label="Base hourly wage" prefix="$" required value={form.baseWage} onChange={(v) => setField("baseWage", v)} placeholder="18" />
                <NumberField label="Payroll burden" suffix="%" value={form.burdenPct} onChange={(v) => setField("burdenPct", v)} placeholder="25" />
              </div>
            )}

            <div className="roi-field-row">
              <NumberField label="Days open per year" required value={form.operatingDays} onChange={(v) => setField("operatingDays", v)} placeholder="350" />
              <NumberField label="Hours open per day" required value={form.operatingHours} onChange={(v) => setField("operatingHours", v)} placeholder="12" />
            </div>

            <Segmented
              legend="How often do employees collect balls?"
              value={form.frequencyMode}
              options={[
                { value: "cycles_per_day", label: "Times per day" },
                { value: "interval_hours", label: "Every X hours" },
              ]}
              onChange={(v) => setField("frequencyMode", v)}
            />
            {form.frequencyMode === "cycles_per_day" ? (
              <NumberField label="Collection runs per day" required value={form.cyclesPerDay} onChange={(v) => setField("cyclesPerDay", v)} placeholder="6" />
            ) : (
              <div className="roi-field-row">
                <NumberField label="Every how many hours?" required value={form.intervalHours} onChange={(v) => setField("intervalHours", v)} placeholder="2" />
                <NumberField
                  label="Runs per day"
                  value={form.cyclesOverride}
                  onChange={(v) => setField("cyclesOverride", v)}
                  placeholder={suggested !== null ? String(suggested) : ""}
                  hint={suggested !== null ? `Suggested: ${suggested} runs/day. Edit if your actual count differs.` : "Enter the interval to see a suggestion."}
                />
              </div>
            )}

            <div className="roi-field-row">
              <NumberField
                label="Minutes per collection run"
                required
                value={form.durationUnit === "minutes" ? form.durationValue : ""}
                onChange={(v) => {
                  setField("durationUnit", "minutes");
                  setField("durationValue", v);
                }}
                placeholder="75"
              />
              <NumberField label="Employees per run" required min={1} value={form.workersPerRun} onChange={(v) => setField("workersPerRun", v)} placeholder="1" />
            </div>

            <NumberField
              label="Monthly spend on fuel, maintenance & repairs"
              prefix="$"
              value={form.equipmentMonthly}
              onChange={(v) => setField("equipmentMonthly", v)}
              placeholder="600"
              hint="For the current picker and carts. Leave blank if unknown — it will simply not be counted."
            />
          </form>

          <div className="roi-quick-result" aria-live="polite">
            {ready ? (
              <>
                <p className="roi-result-label">Estimated current spending</p>
                <p className="roi-result-headline">{fmtMoneyHeadline(c.annualDirectCost)}<span> / year</span></p>
                <dl className="roi-result-rows">
                  <div><dt>Per operating day</dt><dd>{fmtMoney(c.dailyDirectCost)}</dd></div>
                  <div><dt>Per month</dt><dd>{fmtMoney(c.monthlyDirectCost)}</dd></div>
                  <div><dt>Labor hours per year</dt><dd>{fmtHours(c.annualLaborHours)}</dd></div>
                </dl>
              </>
            ) : (
              <p className="roi-result-empty">Complete the highlighted fields to calculate.</p>
            )}
            <div className="roi-quick-actions">
              <Link className="button button-primary" href="/roi-calculator">
                Open Full ROI Calculator
              </Link>
              <a
                className="text-link"
                href="mailto:founders@nxtektal.com?subject=Site%20Assessment%20Request"
              >
                Request a Site Assessment
              </a>
            </div>
            <p className="roi-disclaimer">
              Preliminary estimate based on the information and assumptions shown. It is not a quote, guarantee, or final operational assessment.
            </p>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
