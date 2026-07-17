"use client";

/**
 * Full ROI calculator page body — Sections 1–7 per the implementation brief.
 * Same formula module and stored state as the homepage quick calculator.
 */

import Link from "next/link";
import { useState } from "react";
import {
  fmtHours,
  fmtMoney,
  fmtMoneyHeadline,
  fmtMonths,
  fmtPercent,
} from "../../lib/roi/formatters";
import { suggestedCyclesPerDay } from "../../lib/roi/formulas";
import { DISPOSITION_LABELS } from "../../lib/roi/scenarios";
import type { LaborDisposition } from "../../lib/roi/types";
import { parseNum, useRoiCalculator } from "./state";
import { NumberField, Segmented, Toggle } from "./fields";

export default function FullCalculator() {
  const { form, setField, reset, result } = useRoiCalculator();
  const [presentation, setPresentation] = useState(false);
  const [copied, setCopied] = useState(false);
  const c = result.current;
  const s = result.savings;
  const currentReady = result.status !== "incomplete";
  const savingsReady = result.status === "full_roi_ready";
  const suggested = suggestedCyclesPerDay(parseNum(form.operatingHours), parseNum(form.intervalHours));

  const handleReset = () => {
    if (window.confirm("Clear every entered value? This cannot be undone.")) reset();
  };

  const handleCopy = async () => {
    const lines = [
      "NXTektal ROI Calculator summary (preliminary estimate)",
      `Formula version: ${result.modelVersion}`,
      "",
      "CURRENT SPENDING",
      `  Annual direct cost: ${fmtMoney(c.annualDirectCost)}`,
      `  Per month: ${fmtMoney(c.monthlyDirectCost)}`,
      `  Per operating day: ${fmtMoney(c.dailyDirectCost)}`,
      `  Labor hours per year: ${fmtHours(c.annualLaborHours)}`,
      ...result.breakdown
        .filter((r) => r.kind !== "total")
        .map((r) => `  ${r.label}: ${r.annualAmount === null ? "not entered" : fmtMoney(r.annualAmount)}`),
    ];
    if (savingsReady) {
      lines.push(
        "",
        "ESTIMATED ECONOMICS (illustrative — assumptions must be confirmed)",
        `  Gross direct savings: ${fmtMoney(s.directGrossCashSavings)}`,
        `  New system operating cost: ${fmtMoney(s.customerIncrementalOperatingCost)}`,
        `  NXTektal annual fee: ${fmtMoney(s.annualVendorFee)}`,
        `  Net direct cash savings: ${fmtMoney(s.netDirectCashSavingsAfterVendor)}`,
        `  Core annual customer net benefit: ${fmtMoney(s.coreAnnualCustomerNetBenefit)}`,
        `  Technical hours removed: ${fmtHours(s.technicalHoursRemoved)}`,
        `  Cash-paid hours avoided: ${fmtHours(s.cashPaidHoursAvoided)}`,
        `  Redeployed capacity hours: ${fmtHours(s.redeployedCapacityHours)}`,
        s.approximatePaybackMonths !== null ? `  Approximate payback: ${fmtMonths(s.approximatePaybackMonths)}` : "",
      );
    }
    lines.push(
      "",
      "Preliminary estimate based on the information and assumptions shown.",
      "It is not a quote, guarantee, or final operational assessment.",
    );
    await navigator.clipboard.writeText(lines.filter(Boolean).join("\n"));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const invalid = (v: string) => currentReady === false && v.trim() === "";

  return (
    <div className={presentation ? "roi-page roi-page--presentation" : "roi-page"}>
      <div className="roi-page-head">
        <div>
          <div className="eyebrow">ROI CALCULATOR</div>
          <h1>Your range&rsquo;s ball collection economics</h1>
          <p className="roi-quick-sub">
            Fill this in together with your NXTektal contact. Every result comes from the numbers and
            assumptions shown on this page.
          </p>
        </div>
        <div className="roi-page-tools" role="group" aria-label="Calculator tools">
          <button type="button" className="roi-tool" onClick={() => setPresentation((p) => !p)} aria-pressed={presentation}>
            {presentation ? "Exit presentation" : "Presentation mode"}
          </button>
          <button type="button" className="roi-tool" onClick={handleCopy}>{copied ? "Copied" : "Copy summary"}</button>
          <button type="button" className="roi-tool" onClick={() => window.print()}>Print</button>
          <button type="button" className="roi-tool roi-tool--danger" onClick={handleReset}>Reset</button>
        </div>
      </div>

      <div className="roi-layout">
        <div className="roi-forms">
          {/* Section 1 — Your Current Operation */}
          <section className="roi-section" aria-labelledby="sec-current">
            <h2 id="sec-current">1 · Your current operation</h2>

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
                invalid={invalid(form.loadedRate)}
                value={form.loadedRate}
                onChange={(v) => setField("loadedRate", v)}
                placeholder="22"
                hint="Wage plus payroll taxes, insurance and benefits — what an hour actually costs, not the pay stub."
              />
            ) : (
              <div className="roi-field-row">
                <NumberField label="Base hourly wage" prefix="$" required invalid={invalid(form.baseWage)} value={form.baseWage} onChange={(v) => setField("baseWage", v)} placeholder="18" />
                <NumberField label="Payroll burden" suffix="%" value={form.burdenPct} onChange={(v) => setField("burdenPct", v)} placeholder="25" hint="Taxes, insurance, benefits as a % of wage." />
              </div>
            )}

            <div className="roi-field-row">
              <NumberField label="Days open per year" required invalid={invalid(form.operatingDays)} value={form.operatingDays} onChange={(v) => setField("operatingDays", v)} placeholder="350" />
              <NumberField label="Hours open per day" required invalid={invalid(form.operatingHours)} value={form.operatingHours} onChange={(v) => setField("operatingHours", v)} placeholder="12" />
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
              <NumberField label="Collection runs per day" required invalid={invalid(form.cyclesPerDay)} value={form.cyclesPerDay} onChange={(v) => setField("cyclesPerDay", v)} placeholder="6" />
            ) : (
              <div className="roi-field-row">
                <NumberField label="Every how many hours?" required value={form.intervalHours} onChange={(v) => setField("intervalHours", v)} placeholder="2" />
                <NumberField
                  label="Runs per day"
                  value={form.cyclesOverride}
                  onChange={(v) => setField("cyclesOverride", v)}
                  placeholder={suggested !== null ? String(suggested) : ""}
                  hint={suggested !== null ? `Suggested: ${suggested} runs/day from your hours and interval. Your own count always wins.` : "Enter the interval to see a suggested count."}
                />
              </div>
            )}

            <div className="roi-field-row">
              <NumberField
                label="Minutes per collection run"
                required
                invalid={invalid(form.durationValue)}
                value={form.durationUnit === "minutes" ? form.durationValue : ""}
                onChange={(v) => {
                  setField("durationUnit", "minutes");
                  setField("durationValue", v);
                }}
                placeholder="75"
              />
              <NumberField label="Employees per run" required min={1} invalid={invalid(form.workersPerRun)} value={form.workersPerRun} onChange={(v) => setField("workersPerRun", v)} placeholder="1" />
            </div>

            <NumberField
              label="Monthly spend on fuel, maintenance & repairs"
              prefix="$"
              value={form.equipmentMonthly}
              onChange={(v) => setField("equipmentMonthly", v)}
              placeholder="600"
              hint="Blank means unknown and is left out of the total — it is never counted as $0."
            />

            <Toggle
              label="Employees also do separate manual recovery from slopes, fences or hard-to-reach areas"
              checked={form.specialEnabled}
              onChange={(v) => setField("specialEnabled", v)}
            >
              <div className="roi-field-row">
                <NumberField label="Sessions per week" required value={form.specialSessionsPerWeek} onChange={(v) => setField("specialSessionsPerWeek", v)} placeholder="1" />
                <NumberField label="Hours per session" required value={form.specialHoursPerSession} onChange={(v) => setField("specialHoursPerSession", v)} placeholder="6" />
              </div>
              <div className="roi-field-row">
                <NumberField label="Workers per session" required min={1} value={form.specialWorkers} onChange={(v) => setField("specialWorkers", v)} placeholder="1" />
                <NumberField label="Active weeks per year" value={form.activeWeeksPerYear} onChange={(v) => setField("activeWeeksPerYear", v)} placeholder="52" />
              </div>
            </Toggle>
          </section>

          {/* Section 2 — Additional Costs */}
          <section className="roi-section" aria-labelledby="sec-additional">
            <details className="roi-accordion">
              <summary id="sec-additional">2 · Additional costs <span>optional</span></summary>
              <Toggle
                label="A separate crew unloads and handles collected balls"
                checked={form.unloadingEnabled}
                onChange={(v) => setField("unloadingEnabled", v)}
              >
                <div className="roi-field-row">
                  <NumberField label="Minutes per run" required value={form.unloadingMinutes} onChange={(v) => setField("unloadingMinutes", v)} placeholder="15" />
                  <NumberField label="Workers" required min={1} value={form.unloadingWorkers} onChange={(v) => setField("unloadingWorkers", v)} placeholder="1" />
                </div>
              </Toggle>
              <div className="roi-field-row">
                <NumberField label="Balls replaced per year" value={form.ballsLostPerYear} onChange={(v) => setField("ballsLostPerYear", v)} placeholder="10000" />
                <NumberField label="Landed cost per ball" prefix="$" step={0.01} value={form.costPerBall} onChange={(v) => setField("costPerBall", v)} placeholder="0.80" />
              </div>
              <div className="roi-field-row">
                <NumberField label="Annual refunds & service credits" prefix="$" value={form.refundsAnnual} onChange={(v) => setField("refundsAnnual", v)} hint="Caused by empty dispensers." />
                <NumberField label="Other verified annual cash costs" prefix="$" value={form.otherAnnualCost} onChange={(v) => setField("otherAnnualCost", v)} />
              </div>
              <div className="roi-field-row">
                <NumberField label="Baskets sold per year" value={form.annualBaskets} onChange={(v) => setField("annualBaskets", v)} hint="Optional — enables cost per 1,000 balls." />
                <NumberField label="Balls per basket" value={form.ballsPerBasket} onChange={(v) => setField("ballsPerBasket", v)} />
              </div>
            </details>
          </section>

          {/* Section 3 — NXTektal Assumptions */}
          <section className="roi-section" aria-labelledby="sec-assumptions">
            <h2 id="sec-assumptions">3 · NXTektal assumptions</h2>
            <Toggle
              label="Show the savings model (every assumption stays visible and editable)"
              checked={form.savingsEnabled}
              onChange={(v) => setField("savingsEnabled", v)}
            >
              <p className="roi-callout">
                No NXTektal-approved performance or pricing values are loaded. Everything entered here is
                an illustrative assumption until confirmed by NXTektal.
              </p>
              <Segmented
                legend="Scenario"
                value={form.scenarioId}
                options={[
                  { value: "conservative", label: "Conservative" },
                  { value: "expected", label: "Expected" },
                ]}
                onChange={(v) => setField("scenarioId", v)}
              />
              <div className="roi-field-row">
                <NumberField label="Regular collection coverage" suffix="%" value={form.regularCoveragePct} onChange={(v) => setField("regularCoveragePct", v)} hint="Share of regular collection the system can take over." />
                {form.specialEnabled && (
                  <NumberField label="Special recovery coverage" suffix="%" value={form.specialCoveragePct} onChange={(v) => setField("specialCoveragePct", v)} hint="Usually much lower than regular coverage." />
                )}
              </div>
              <div className="roi-field-row">
                <NumberField label="System uptime" suffix="%" value={form.uptimePct} onChange={(v) => setField("uptimePct", v)} />
                <NumberField label="Capacity fit" suffix="%" value={form.capacityFitPct} onChange={(v) => setField("capacityFitPct", v)} />
              </div>
              <div className="roi-field-row">
                <NumberField label="Workflow success" suffix="%" value={form.workflowPct} onChange={(v) => setField("workflowPct", v)} />
                <NumberField label="Adoption" suffix="%" value={form.adoptionPct} onChange={(v) => setField("adoptionPct", v)} />
              </div>

              <div className="roi-field">
                <label htmlFor="roi-disposition">What would happen to the labor hours this system frees up?</label>
                <select
                  id="roi-disposition"
                  value={form.laborDisposition}
                  onChange={(e) => setField("laborDisposition", e.target.value as LaborDisposition | "")}
                >
                  <option value="">Choose…</option>
                  {Object.entries(DISPOSITION_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              {(form.laborDisposition === "reassign" || form.laborDisposition === "not_sure" || form.laborDisposition === "avoid_hire") && (
                <p className="roi-hint">
                  {form.laborDisposition === "reassign"
                    ? "Reassigned hours count as released operating capacity, not payroll savings — cash realization defaults to 0%."
                    : form.laborDisposition === "avoid_hire"
                      ? "Without a confirmed hire date, no first-year cash saving is counted — cash realization defaults to 0%."
                      : "Until the answer is known, no cash saving is counted — cash realization defaults to 0%."}
                </p>
              )}
              <NumberField
                label="Labor cash realization"
                suffix="%"
                value={form.cashRealizationPct}
                onChange={(v) => setField("cashRealizationPct", v)}
                hint="Share of freed labor value that truly becomes cash (fewer paid hours, less overtime, an avoided hire)."
              />
              <div className="roi-field-row">
                <NumberField label="Equipment cost avoidable" suffix="%" value={form.equipmentAvoidablePct} onChange={(v) => setField("equipmentAvoidablePct", v)} hint="0% if the current picker is fully retained." />
                <NumberField label="New system operating cost / year" prefix="$" value={form.customerOpsAnnual} onChange={(v) => setField("customerOpsAnnual", v)} hint="Energy, connectivity, customer-side upkeep." />
              </div>
              <NumberField
                label="Confirmed recovered contribution margin / year"
                prefix="$"
                value={form.recoveredMarginAnnual}
                onChange={(v) => setField("recoveredMarginAnnual", v)}
                hint="Only enter margin (price minus variable cost) you can evidence — never gross revenue."
              />

              <Segmented
                legend="Pricing model"
                value={form.pricingMode}
                options={[
                  { value: "raas", label: "RaaS / monthly fee" },
                  { value: "capex", label: "Equipment purchase" },
                ]}
                onChange={(v) => setField("pricingMode", v)}
              />
              {form.pricingMode === "raas" ? (
                <NumberField label="Monthly NXTektal fee" prefix="$" value={form.monthlyFee} onChange={(v) => setField("monthlyFee", v)} />
              ) : (
                <>
                  <div className="roi-field-row">
                    <NumberField label="Hardware price" prefix="$" value={form.hardwarePrice} onChange={(v) => setField("hardwarePrice", v)} />
                    <NumberField label="Installation" prefix="$" value={form.installationCost} onChange={(v) => setField("installationCost", v)} />
                  </div>
                  <div className="roi-field-row">
                    <NumberField label="Site preparation" prefix="$" value={form.sitePrepCost} onChange={(v) => setField("sitePrepCost", v)} />
                    <NumberField label="Training & integration" prefix="$" value={form.integrationTrainingCost} onChange={(v) => setField("integrationTrainingCost", v)} />
                  </div>
                  <NumberField label="Annual recurring maintenance / software fee" prefix="$" value={form.annualRecurringFee} onChange={(v) => setField("annualRecurringFee", v)} />
                </>
              )}
            </Toggle>
          </section>
        </div>

        {/* Sticky results */}
        <aside className="roi-results" aria-live="polite">
          <div className="roi-card">
            <p className="roi-result-label">Estimated current annual spending</p>
            {currentReady ? (
              <>
                <p className="roi-result-headline">{fmtMoneyHeadline(c.annualDirectCost)}</p>
                <dl className="roi-result-rows">
                  <div><dt>Per operating day</dt><dd>{fmtMoney(c.dailyDirectCost)}</dd></div>
                  <div><dt>Per month</dt><dd>{fmtMoney(c.monthlyDirectCost)}</dd></div>
                  <div><dt>Labor hours per year</dt><dd>{fmtHours(c.annualLaborHours)}</dd></div>
                </dl>
              </>
            ) : (
              <p className="roi-result-empty">Complete the highlighted fields to calculate.</p>
            )}
          </div>

          {form.savingsEnabled && (
            <div className="roi-card">
              <p className="roi-result-label">Potential NXTektal economics</p>
              <p className="roi-illustrative">Illustrative estimate — assumptions must be confirmed</p>
              {savingsReady ? (
                <>
                  <ol className="roi-waterfall">
                    <li><span>Current annual direct cost</span><strong>{fmtMoney(c.annualDirectCost)}</strong></li>
                    <li><span>Gross direct savings</span><strong>{fmtMoney(s.directGrossCashSavings)}</strong></li>
                    <li><span>New system operating cost</span><strong>−{fmtMoney(s.customerIncrementalOperatingCost)}</strong></li>
                    <li><span>NXTektal annual fee</span><strong>−{fmtMoney(s.annualVendorFee)}</strong></li>
                    <li><span>Net direct cash savings</span><strong>{fmtMoney(s.netDirectCashSavingsAfterVendor)}</strong></li>
                    {s.recoveredContributionMargin !== null && (
                      <li><span>Recovered contribution margin</span><strong>{fmtMoney(s.recoveredContributionMargin)}</strong></li>
                    )}
                    <li className="roi-waterfall-core"><span>Core annual customer net benefit</span><strong>{fmtMoney(s.coreAnnualCustomerNetBenefit)}</strong></li>
                    <li><span>Monthly net benefit</span><strong>{fmtMoney(s.monthlyCoreNetBenefit)}</strong></li>
                    <li><span>Direct cost reduction</span><strong>{fmtPercent(s.directCostReductionRate)}</strong></li>
                    {form.pricingMode === "capex" && (
                      <li><span>Approximate payback</span><strong>{fmtMonths(s.approximatePaybackMonths)}</strong></li>
                    )}
                  </ol>
                  <dl className="roi-result-rows roi-hours-split">
                    <div><dt>Technical hours removed</dt><dd>{fmtHours(s.technicalHoursRemoved)}</dd></div>
                    <div><dt>Cash-paid hours avoided</dt><dd>{fmtHours(s.cashPaidHoursAvoided)}</dd></div>
                    <div><dt>Redeployed capacity hours</dt><dd>{fmtHours(s.redeployedCapacityHours)}</dd></div>
                  </dl>
                  {form.laborDisposition === "reassign" && (
                    <p className="roi-hint">
                      These hours are shown as released operating capacity, not payroll savings, because the
                      employees would be reassigned rather than removed from payroll.
                    </p>
                  )}
                  {currentReady && s.postAnnualDirectCost !== null && c.annualDirectCost !== null && (
                    <div className="roi-compare" role="img" aria-label={`Current annual cost ${fmtMoney(c.annualDirectCost)} versus with NXTektal ${fmtMoney(s.postAnnualDirectCost)}`}>
                      <div className="roi-compare-row">
                        <span>Current</span>
                        <div className="roi-bar"><i style={{ width: "100%" }} /></div>
                        <strong>{fmtMoneyHeadline(c.annualDirectCost)}</strong>
                      </div>
                      <div className="roi-compare-row">
                        <span>With NXTektal</span>
                        <div className="roi-bar roi-bar--lime">
                          <i style={{ width: `${Math.max(0, Math.min(100, (s.postAnnualDirectCost / c.annualDirectCost) * 100))}%` }} />
                        </div>
                        <strong>{fmtMoneyHeadline(s.postAnnualDirectCost)}</strong>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="roi-result-empty">
                  Enter every assumption and the NXTektal pricing to see net economics. Nothing is assumed silently.
                </p>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Section 5 — Cost breakdown */}
      {currentReady && (
        <section className="roi-section roi-breakdown" aria-labelledby="sec-breakdown">
          <h2 id="sec-breakdown">Cost breakdown</h2>
          <table>
            <thead>
              <tr><th scope="col">Cost item</th><th scope="col">Calculation</th><th scope="col">Annual amount</th></tr>
            </thead>
            <tbody>
              {result.breakdown.map((row) => (
                <tr key={row.id} className={row.kind === "total" ? "roi-row-total" : row.kind === "excluded" ? "roi-row-excluded" : undefined}>
                  <td>{row.label}</td>
                  <td>{row.calculation}</td>
                  <td>{row.annualAmount === null ? "—" : fmtMoney(row.annualAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Section 6 — Transparency */}
      <section className="roi-section roi-transparency" aria-labelledby="sec-transparency">
        <h2 id="sec-transparency">What this estimate is based on</h2>
        {result.warnings.length > 0 && (
          <ul className="roi-warnings">
            {result.warnings.map((w) => (
              <li key={w.code + w.message}>{w.message}</li>
            ))}
          </ul>
        )}
        {result.assumptions.length > 0 && (
          <dl className="roi-assumption-list">
            {result.assumptions.map((a) => (
              <div key={a.id}>
                <dt>{a.label}</dt>
                <dd>{a.value} <em>{a.source === "scenario_assumption" ? "assumption" : "entered"}</em></dd>
              </div>
            ))}
          </dl>
        )}
        <p className="roi-disclaimer">
          Preliminary estimate based on the information and assumptions shown. It is not a quote,
          guarantee, or final operational assessment.
        </p>
      </section>

      {/* Section 7 — CTA */}
      <section className="roi-section roi-cta">
        <h2>Confirm the real numbers on your range</h2>
        <p>A site assessment replaces every assumption above with measured values from your facility.</p>
        <a className="button button-primary" href="mailto:founders@nxtektal.com?subject=Site%20assessment">
          Book a site assessment
        </a>
        <Link className="text-link" href="/">Back to nxtektal.com</Link>
      </section>
    </div>
  );
}
