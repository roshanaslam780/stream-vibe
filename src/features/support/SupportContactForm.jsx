import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  countryCode: "+1",
  message: "",
  consent: false,
};

const validate = (values) => {
  const errors = {};
  const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/;

  if (!namePattern.test(values.firstName.trim())) {
    errors.firstName = "Enter a first name using 2–50 letters.";
  }
  if (!namePattern.test(values.lastName.trim())) {
    errors.lastName = "Enter a last name using 2–50 letters.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!/^[0-9()+.\s-]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number (7–20 characters).";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please provide at least 10 characters.";
  } else if (values.message.trim().length > 2000) {
    errors.message = "Keep your message under 2,000 characters.";
  }
  if (!values.consent) errors.consent = "Please accept the terms to continue.";

  return errors;
};

const SupportContactForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  const updateField = (event) => {
    if (status === "submitting") return;
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setFormError("");
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      return;
    }

    const endpoint = import.meta.env.VITE_SUPPORT_FORM_ENDPOINT;
    if (!endpoint) {
      setFormError("The contact form is not connected yet. Please try again later.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: `${values.countryCode} ${values.phone.trim()}`,
          message: values.message.trim(),
        }),
      });

      if (!response.ok) {
        let message = "We couldn't send your message. Please try again.";
        try {
          const result = await response.json();
          if (result?.message) message = result.message;
        } catch {
          // Use the default message when the service returns no JSON body.
        }
        throw new Error(message);
      }

      setStatus("success");
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setFormError(error.message || "A network error occurred. Please try again.");
    }
  };

  const inputClass = (field) => `mt-2.5 min-h-14 w-full rounded-lg border bg-dark-08 px-4 text-sm text-white outline-none transition-colors placeholder:text-neutral-60 focus:border-brand-45 ${errors[field] ? "border-brand-45" : "border-dark-15"}`;
  const renderError = (field) => errors[field] && (
    <span id={`${field}-error`} className="mt-1.5 block text-xs text-brand-45" role="alert">
      {errors[field]}
    </span>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-dark-15 bg-dark-06 p-5 sm:p-7 md:p-10 2xl:p-12.5">
      <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2 sm:gap-y-7">
        <label className="typo text-sm" htmlFor="support-first-name">
          First Name
          <input
            id="support-first-name"
            name="firstName"
            value={values.firstName}
            onChange={updateField}
            autoComplete="given-name"
            placeholder="Enter First Name"
            className={inputClass("firstName")}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            required
          />
          {renderError("firstName")}
        </label>

        <label className="typo text-sm" htmlFor="support-last-name">
          Last Name
          <input
            id="support-last-name"
            name="lastName"
            value={values.lastName}
            onChange={updateField}
            autoComplete="family-name"
            placeholder="Enter Last Name"
            className={inputClass("lastName")}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            required
          />
          {renderError("lastName")}
        </label>

        <label className="typo text-sm" htmlFor="support-email">
          Email
          <input
            id="support-email"
            name="email"
            type="email"
            value={values.email}
            onChange={updateField}
            autoComplete="email"
            placeholder="Enter your Email"
            className={inputClass("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {renderError("email")}
        </label>

        <div>
          <label className="typo text-sm" htmlFor="support-phone">Phone Number</label>
          <div className="mt-2.5 flex gap-2.5">
            <select
              name="countryCode"
              value={values.countryCode}
              onChange={updateField}
              aria-label="Country calling code"
              className="min-h-14 w-28 shrink-0 rounded-lg border border-dark-15 bg-dark-08 px-2 text-sm text-white outline-none focus:border-brand-45"
            >
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+91">🇮🇳 +91</option>
              <option value="+92">🇵🇰 +92</option>
              <option value="+61">🇦🇺 +61</option>
            </select>
            <input
              id="support-phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={updateField}
              autoComplete="tel-national"
              placeholder="Enter Phone Number"
              className={`min-h-14 min-w-0 flex-1 rounded-lg border bg-dark-08 px-4 text-sm text-white outline-none placeholder:text-neutral-60 focus:border-brand-45 ${errors.phone ? "border-brand-45" : "border-dark-15"}`}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              required
            />
          </div>
          {renderError("phone")}
        </div>

        <label className="typo text-sm sm:col-span-2" htmlFor="support-message">
          Message
          <textarea
            id="support-message"
            name="message"
            value={values.message}
            onChange={updateField}
            placeholder="Enter your Message"
            rows={5}
            maxLength={2000}
            className={`${inputClass("message")} min-h-40 resize-y py-4`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : "message-count"}
            required
          />
          {renderError("message")}
          <span id="message-count" className="mt-1 block text-right text-xs text-neutral-60">
            {values.message.length}/2000
          </span>
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-5 border-t border-dark-15 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-60" htmlFor="support-consent">
            <input
              id="support-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={updateField}
              className="mt-0.5 size-4 accent-brand-45"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I agree to the <Link to="/terms-of-use" className="text-white underline">Terms of Use</Link> and <Link to="/privacy-policy" className="text-white underline">Privacy Policy</Link>.
            </span>
          </label>
          {renderError("consent")}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-45 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-50 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? (
            <><span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sending…</>
          ) : (
            <>Send Message <Icon icon="lucide:send" aria-hidden="true" /></>
          )}
        </button>
      </div>

      <div aria-live="polite" className="mt-4">
        {status === "success" && (
          <p className="rounded-lg border border-green-700/50 bg-green-950/30 p-3 text-sm text-green-300">
            Your message has been sent. Our support team will be in touch.
          </p>
        )}
        {status === "error" && formError && (
          <p className="rounded-lg border border-brand-45/40 bg-brand-45/10 p-3 text-sm text-brand-80" role="alert">
            {formError}
          </p>
        )}
      </div>
    </form>
  );
};

export default SupportContactForm;
