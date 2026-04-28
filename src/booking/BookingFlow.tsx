import { useEffect, useMemo, useRef, useState } from "react";
import type { Booking, Provider, Service, Slot } from "./types";
import { CALL_ONLY_PHONE, providers, services } from "./data";
import { depositAmount, formatSlot, generateSlots } from "./slots";

type Step =
  | "service"
  | "call-only-info"
  | "provider"
  | "slot"
  | "details"
  | "confirm"
  | "done";

export function BookingFlow() {
  const [step, setStep] = useState<Step>("service");
  const [service, setService] = useState<Service | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);

  const eligibleProviders = useMemo(
    () => (service ? providers.filter((p) => p.serviceIds.includes(service.id)) : []),
    [service],
  );

  const slots = useMemo(
    () => (provider ? generateSlots(provider.id) : []),
    [provider],
  );

  const deposit = service ? depositAmount(service.priceUsd, service.deposit) : 0;

  // Move focus to the active step's heading on every step change so screen
  // readers announce the new step. tabIndex={-1} makes the heading focusable
  // programmatically without entering the tab order.
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  const reset = () => {
    setStep("service");
    setService(null);
    setProvider(null);
    setSlot(null);
    setName("");
    setEmail("");
    setBooking(null);
  };

  // Picking a service invalidates downstream selections so a back-and-forth
  // flow can never end up with a stale provider or slot from a different service.
  const pickService = (s: Service) => {
    setService(s);
    setProvider(null);
    setSlot(null);
    setStep(s.mode === "call-only" ? "call-only-info" : "provider");
  };

  const pickProvider = (p: Provider) => {
    setProvider(p);
    setSlot(null);
    setStep("slot");
  };

  return (
    <div className="booking">
      <header className="booking__header">
        <h1>Book an appointment</h1>
        <p className="booking__sub">Pick a service, provider, and time.</p>
      </header>

      {step === "service" && (
        <section>
          <h2 ref={stepHeadingRef} tabIndex={-1}>1. Choose a service</h2>
          <ul className="booking__list">
            {services.map((s) => (
              <li key={s.id}>
                <button className="booking__card" onClick={() => pickService(s)}>
                  <div className="booking__card-title">{s.name}</div>
                  <div className="booking__card-meta">
                    {s.durationMin} min · ${s.priceUsd}
                    {s.mode === "call-only" && <span className="booking__pill">Call only</span>}
                    {s.deposit === "fifty-percent" && (
                      <span className="booking__pill">50% deposit</span>
                    )}
                    {s.deposit === "full" && <span className="booking__pill">Prepay</span>}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === "call-only-info" && service && (
        <section className="booking__notice">
          <h2 ref={stepHeadingRef} tabIndex={-1}>This service is call-only</h2>
          <p>
            <strong>{service.name}</strong> can't be booked online. Please call{" "}
            <a href={`tel:${CALL_ONLY_PHONE.replace(/\D/g, "")}`}>{CALL_ONLY_PHONE}</a> to schedule.
          </p>
          <button
            className="booking__secondary"
            type="button"
            onClick={() => setStep("service")}
          >
            Back to services
          </button>
        </section>
      )}

      {step === "provider" && service && (
        <section>
          <h2 ref={stepHeadingRef} tabIndex={-1}>2. Choose a provider</h2>
          <ul className="booking__list">
            {eligibleProviders.map((p) => (
              <li key={p.id}>
                <button className="booking__card" onClick={() => pickProvider(p)}>
                  <div className="booking__card-title">{p.name}</div>
                </button>
              </li>
            ))}
          </ul>
          <button
            className="booking__secondary"
            type="button"
            onClick={() => setStep("service")}
          >
            Back
          </button>
        </section>
      )}

      {step === "slot" && provider && (
        <section>
          <h2 ref={stepHeadingRef} tabIndex={-1}>3. Choose a time</h2>
          <ul className="booking__slots">
            {slots.map((s) => (
              <li key={s.iso}>
                <button
                  className="booking__slot"
                  onClick={() => {
                    setSlot(s);
                    setStep("details");
                  }}
                >
                  {formatSlot(s.iso)}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="booking__secondary"
            type="button"
            onClick={() => setStep("provider")}
          >
            Back
          </button>
        </section>
      )}

      {step === "details" && service && provider && slot && (
        <section>
          <h2 ref={stepHeadingRef} tabIndex={-1}>4. Your details</h2>
          <form
            className="booking__form"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("confirm");
            }}
          >
            <label>
              Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <div className="booking__actions">
              <button
                type="button"
                className="booking__secondary"
                onClick={() => setStep("slot")}
              >
                Back
              </button>
              <button type="submit" className="booking__primary">
                Review
              </button>
            </div>
          </form>
        </section>
      )}

      {step === "confirm" && service && provider && slot && (
        <section>
          <h2 ref={stepHeadingRef} tabIndex={-1}>5. Confirm</h2>
          <dl className="booking__summary">
            <dt>Service</dt>
            <dd>{service.name}</dd>
            <dt>Provider</dt>
            <dd>{provider.name}</dd>
            <dt>When</dt>
            <dd>{formatSlot(slot.iso)}</dd>
            <dt>Name</dt>
            <dd>{name}</dd>
            <dt>Email</dt>
            <dd>{email}</dd>
            <dt>Total</dt>
            <dd>${service.priceUsd}</dd>
          </dl>

          {service.deposit !== "none" && (
            <div className="booking__notice">
              <strong>Deposit required:</strong> ${deposit} due now
              {service.deposit === "fifty-percent" ? " (50%)" : " (full prepayment)"}.
            </div>
          )}

          <div className="booking__actions">
            <button
              className="booking__secondary"
              type="button"
              onClick={() => setStep("details")}
            >
              Back
            </button>
            <button
              type="button"
              className="booking__primary"
              onClick={() => {
                setBooking({
                  service,
                  provider,
                  slot,
                  customerName: name,
                  customerEmail: email,
                  // Stored as a derived value so the audit log is self-contained
                  // even if pricing/deposit rules change later.
                  depositPaidUsd: deposit,
                });
                setStep("done");
              }}
            >
              {service.deposit === "none" ? "Confirm booking" : "Pay deposit & confirm"}
            </button>
          </div>
        </section>
      )}

      {step === "done" && booking && (
        <section className="booking__success">
          <h2 ref={stepHeadingRef} tabIndex={-1}>Booking confirmed</h2>
          <p>
            We've sent a confirmation to <strong>{booking.customerEmail}</strong>.
          </p>
          <dl className="booking__summary">
            <dt>Service</dt>
            <dd>{booking.service.name}</dd>
            <dt>Provider</dt>
            <dd>{booking.provider.name}</dd>
            <dt>When</dt>
            <dd>{formatSlot(booking.slot.iso)}</dd>
            {booking.depositPaidUsd > 0 && (
              <>
                <dt>Deposit paid</dt>
                <dd>${booking.depositPaidUsd}</dd>
              </>
            )}
          </dl>
          {booking.service.postBookingInstructions && (
            <div className="booking__notice">
              <strong>Before your visit:</strong> {booking.service.postBookingInstructions}
            </div>
          )}
          <button className="booking__secondary" type="button" onClick={reset}>
            Book another
          </button>
        </section>
      )}
    </div>
  );
}
