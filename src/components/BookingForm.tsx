import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  bookingCatalog,
  bookingSchedule,
  bookingSettings
} from "@/data/siteContent";

type BookingService = (typeof bookingCatalog)[number];
type BookingDayKey = keyof typeof bookingSchedule;
type DaySchedule = (typeof bookingSchedule)[BookingDayKey];

const bookingCatalogMap = bookingCatalog.reduce<Record<string, BookingService>>(
  (acc, service) => {
    acc[service.id] = service;
    return acc;
  },
  {}
);

const weekdayKeys: BookingDayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

const today = new Date();

const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addDays = (date: Date, days: number) => {
  const cloned = new Date(date);
  cloned.setDate(cloned.getDate() + days);
  return cloned;
};

const formatDisplayDate = (dateString: string) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-").map(Number);
  const localDate = new Date(year, (month ?? 1) - 1, day ?? 1);
  return new Intl.DateTimeFormat("en-NZ", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(localDate);
};

const deriveDayKey = (dateValue: string): BookingDayKey | null => {
  if (!dateValue) return null;
  const [year, month, day] = dateValue.split("-").map(Number);
  if (!year || !month || !day) return null;
  const localDate = new Date(year, month - 1, day);
  const weekdayIndex = localDate.getDay();
  return weekdayKeys[weekdayIndex] ?? null;
};
const currentDateString = formatDateForInput(today);
const currentMinutes = today.getHours() * 60 + today.getMinutes();

const minDate = currentDateString;
const maxDate = formatDateForInput(addDays(today, bookingSettings.maxAdvanceDays));

const getSlotMinutes = (slot: string) => {
  const [hours, minutes] = slot.split(":").map(Number);
  return (hours ?? 0) * 60 + (minutes ?? 0);
};

const isFutureSlot = (dateString: string, slot: string) => {
  if (!dateString) return false;
  if (dateString !== currentDateString) return true;
  return getSlotMinutes(slot) > currentMinutes;
};

const hasFutureSlot = (dateString: string, schedule: DaySchedule) =>
  schedule.slots.some((slot) => isFutureSlot(dateString, slot));

const findFirstAvailableDate = () => {
  for (let offset = 0; offset <= bookingSettings.maxAdvanceDays; offset += 1) {
    const candidateDate = formatDateForInput(addDays(today, offset));
    const key = deriveDayKey(candidateDate);
    if (!key) continue;
    const schedule = bookingSchedule[key];
    if (!schedule) continue;
    if (hasFutureSlot(candidateDate, schedule)) {
      return candidateDate;
    }
  }
  return minDate;
};

const formatCurrency = (value: number) =>
  value > 0
    ? new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD", minimumFractionDigits: 0 }).format(value)
    : "—";

const formatDuration = (minutes: number) => {
  if (!minutes) return "—";
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours && remainder) {
    return `${hours}h ${remainder}m`;
  }
  if (hours) {
    return `${hours}h`;
  }
  return `${remainder} mins`;
};

function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    if (selectedDate) return;
    const firstDate = findFirstAvailableDate();
    if (firstDate) {
      setSelectedDate(firstDate);
    }
  }, [selectedDate]);

  const dayKey = useMemo(() => deriveDayKey(selectedDate), [selectedDate]);
  const daySchedule = dayKey ? bookingSchedule[dayKey] : null;

  useEffect(() => {
    if (!daySchedule) {
      setSelectedAddOnIds([]);
      return;
    }
    const servicesForDay = daySchedule.services as readonly string[];
    setSelectedAddOnIds((prev) =>
      prev.filter((addOnId) => servicesForDay.includes(addOnId))
    );
  }, [daySchedule]);

  const availableSlots = useMemo(() => {
    if (!daySchedule) return [];
    return daySchedule.slots.filter((slot) => isFutureSlot(selectedDate, slot));
  }, [daySchedule, selectedDate]);

  const availableServices = useMemo(() => {
    if (!daySchedule) return [];
    return daySchedule.services
      .map((serviceId) => bookingCatalogMap[serviceId])
      .filter((service): service is BookingService => Boolean(service));
  }, [daySchedule]);

  const { primaryServices, addOnServices } = useMemo(() => {
    const primary: BookingService[] = [];
    const addons: BookingService[] = [];
    availableServices.forEach((service) => {
      if (service.serviceType === "addon") {
        addons.push(service);
      } else {
        primary.push(service);
      }
    });
    return { primaryServices: primary, addOnServices: addons };
  }, [availableServices]);

  const selectedAddOns = useMemo(() => {
    return selectedAddOnIds
      .map((id) => bookingCatalogMap[id])
      .filter((service): service is BookingService => Boolean(service));
  }, [selectedAddOnIds]);

  const totalPriceValue = useMemo(() => {
    const base = bookingCatalogMap[selectedServiceId]?.priceValue ?? 0;
    return selectedAddOns.reduce((sum, service) => sum + (service.priceValue ?? 0), base);
  }, [selectedAddOns, selectedServiceId]);

  const totalDurationMinutes = useMemo(() => {
    const base = bookingCatalogMap[selectedServiceId]?.durationMinutes ?? 0;
    return selectedAddOns.reduce((sum, service) => sum + (service.durationMinutes ?? 0), base);
  }, [selectedAddOns, selectedServiceId]);

  const resetSelectionsForNewDate = (value: string) => {
    setSelectedDate(value);
    setSelectedSlot("");
    setSelectedServiceId("");
    setSelectedAddOnIds([]);
  };

  const handleClientInfoChange = (field: keyof typeof clientInfo, value: string) => {
    setClientInfo((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAddOn = (serviceId: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const formattedTotalPrice = formatCurrency(totalPriceValue);
  const formattedTotalDuration = formatDuration(totalDurationMinutes);

  const submissionDisabled =
    !selectedDate ||
    !selectedSlot ||
    !selectedServiceId ||
    !clientInfo.name ||
    !clientInfo.email ||
    availableSlots.length === 0;

  const buildPayload = () => {
    const service = bookingCatalogMap[selectedServiceId];
    return {
      preferredDate: selectedDate,
      preferredDateLabel: formatDisplayDate(selectedDate),
      preferredSlot: selectedSlot,
      service,
      addOns: selectedAddOns,
      client: clientInfo,
      totals: {
        priceValue: totalPriceValue,
        durationMinutes: totalDurationMinutes,
        displayPrice: formattedTotalPrice
      },
      metadata: {
        scheduleNote: daySchedule?.note ?? "",
        timezone: "Pacific/Auckland",
        responseTime: bookingSettings.responseTime
      }
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionDisabled) return;

    const payload = buildPayload();

    setStatus("pending");
    setFeedback("");

    if (bookingSettings.submissionEndpoint) {
      try {
        const response = await fetch(bookingSettings.submissionEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        setStatus("success");
        setFeedback("Request sent. Sammy will reach out to confirm your chair time.");
        setSelectedSlot("");
        setSelectedServiceId("");
        setClientInfo({ name: "", email: "", phone: "", notes: "" });
      } catch (error) {
        console.error(error);
        setStatus("error");
        setFeedback("We couldn't reach the booking endpoint. Please retry or contact Sammy directly.");
      }

      return;
    }

    const serviceLine = payload.service ? `${payload.service.name} — ${payload.service.price}` : "";
    const addOnsLine = selectedAddOns.length
      ? selectedAddOns.map((svc) => `${svc.name} (${svc.duration})`).join(", ")
      : "None";
    const contactLine = clientInfo.phone
      ? `${clientInfo.name} (${clientInfo.email}, ${clientInfo.phone})`
      : `${clientInfo.name} (${clientInfo.email})`;
    const emailBody = `Preferred date: ${payload.preferredDateLabel}\nTime: ${payload.preferredSlot}\nService: ${serviceLine}\nAdd-ons: ${addOnsLine}\nEstimated duration: ${formattedTotalDuration}\nEstimated total: ${formattedTotalPrice}\nClient: ${contactLine}\nNotes: ${
      clientInfo.notes || "—"
    }`;

    const subject = `New booking request — ${payload.preferredDateLabel}`;
    const mailto = `mailto:${bookingSettings.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailto;
    setStatus("success");
    setFeedback("Launching your email client so you can finish the request.");
  };

  return (
    <section id="booking" className="section-shell">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-silver">Booking</p>
          <h2 className="font-display text-3xl text-white">{bookingSettings.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-platinum/75">{bookingSettings.subtitle}</p>
        </div>
        <div className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-platinum/80">
          <p>{bookingSettings.responseTime}</p>
          <p className="text-xs text-platinum/60">Need help sooner? Call {bookingSettings.phone}.</p>
        </div>
      </div>

      <form className="grid gap-8 lg:grid-cols-2" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-silver/80">Step 01 · Date & time</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-platinum/80">Preferred date</span>
                <input
                  type="date"
                  min={minDate}
                  max={maxDate}
                  value={selectedDate}
                  onChange={(event) => resetSelectionsForNewDate(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white focus:border-gilded/60 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm">
                <span className="text-platinum/80">Time slot</span>
                <select
                  value={selectedSlot}
                  onChange={(event) => setSelectedSlot(event.target.value)}
                  disabled={!daySchedule || availableSlots.length === 0}
                  className="select-field disabled:text-platinum/30"
                  required
                >
                  <option value="" disabled>
                    {!daySchedule
                      ? "Choose a date first"
                      : availableSlots.length > 0
                        ? "Select a slot"
                        : "No future slots today"}
                  </option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="mt-2 text-xs text-platinum/60">
              {!daySchedule
                ? "Pick a date to reveal Sammy's live availability."
                : availableSlots.length > 0
                  ? daySchedule.note
                  : "All remaining slots for this day have passed. Choose another date."}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-silver/80">Step 02 · Service focus</p>
            {daySchedule ? (
              primaryServices.length > 0 ? (
                <div className="mt-3 space-y-4">
                  {primaryServices.map((service) => (
                    <label
                      key={service.id}
                      className={`block rounded-2xl border px-4 py-3 transition ${
                        selectedServiceId === service.id
                          ? "border-gilded bg-white/5"
                          : "border-white/10 hover:border-gilded/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedServiceId === service.id}
                        onChange={() => setSelectedServiceId(service.id)}
                        className="sr-only"
                      />
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center justify-between text-white">
                          <span className="font-semibold">{service.name}</span>
                          <span className="text-gilded">{service.price}</span>
                        </div>
                        <p className="text-xs text-platinum/70">{service.description}</p>
                        <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-platinum/50">
                          {service.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/10 px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </label>
                  ))}

                  {addOnServices.length > 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.35em] text-platinum/60">
                        Enhancements · add multiple
                      </p>
                      <div className="mt-3 space-y-3">
                        {addOnServices.map((service) => (
                          <label
                            key={service.id}
                            className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                              selectedAddOnIds.includes(service.id)
                                ? "border-gilded/70 bg-white/5"
                                : "border-white/10 hover:border-gilded/40"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
                              checked={selectedAddOnIds.includes(service.id)}
                              onChange={() => toggleAddOn(service.id)}
                            />
                            <div>
                              <div className="flex flex-wrap items-center gap-2 text-white">
                                <span className="font-semibold">{service.name}</span>
                                <span className="text-xs uppercase tracking-[0.25em] text-platinum/50">
                                  +{service.duration}
                                </span>
                              </div>
                              <p className="text-xs text-platinum/70">{service.description}</p>
                              <span className="text-xs text-gilded">{service.price}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-3 rounded-2xl border border-amber-500/40 bg-amber-500/5 px-4 py-3 text-xs text-amber-200">
                  Sammy hasn't opened this day for public booking. Choose another date.
                </p>
              )
            ) : (
              <p className="mt-3 rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-platinum/50">
                Choose a date to see which services Sammy is offering that day.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-silver/80">Step 03 · Your details</p>
            <div className="mt-3 space-y-4 text-sm">
              <label className="flex flex-col gap-2">
                <span className="text-platinum/80">Full name</span>
                <input
                  type="text"
                  value={clientInfo.name}
                  onChange={(event) => handleClientInfoChange("name", event.target.value)}
                  className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white focus:border-gilded/60 focus:outline-none"
                  placeholder="Who should Sammy greet?"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-platinum/80">Email</span>
                <input
                  type="email"
                  value={clientInfo.email}
                  onChange={(event) => handleClientInfoChange("email", event.target.value)}
                  className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white focus:border-gilded/60 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-platinum/80">Phone (optional)</span>
                <input
                  type="tel"
                  value={clientInfo.phone}
                  onChange={(event) => handleClientInfoChange("phone", event.target.value)}
                  className="rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white focus:border-gilded/60 focus:outline-none"
                  placeholder="+64 21 ..."
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-platinum/80">Notes</span>
                <textarea
                  value={clientInfo.notes}
                  onChange={(event) => handleClientInfoChange("notes", event.target.value)}
                  className="min-h-[120px] rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-base text-white focus:border-gilded/60 focus:outline-none"
                  placeholder="Let Sammy know if you want a razor design, after-hours slot, or have inspo links."
                />
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f0f11] to-[#050505] p-5 text-sm text-platinum/80">
            <p className="text-xs uppercase tracking-[0.35em] text-silver/80">Request summary</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-platinum/60">Date</dt>
                <dd className="text-white">{formatDisplayDate(selectedDate) || "—"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-platinum/60">Time</dt>
                <dd className="text-white">{selectedSlot || "—"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-platinum/60">Service</dt>
                <dd className="text-white">
                  {selectedServiceId ? bookingCatalogMap[selectedServiceId]?.name : "—"}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-platinum/60">Add-ons</dt>
                <dd className="text-xs text-platinum/70">
                  {selectedAddOns.length > 0
                    ? selectedAddOns.map((svc) => svc.name).join(", ")
                    : "None"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-platinum/60">Total duration</dt>
                <dd className="text-white">{formattedTotalDuration}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-platinum/60">Total price</dt>
                <dd className="text-gilded">{formattedTotalPrice}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-platinum/50">{bookingSettings.note}</p>
            <button
              type="submit"
              className="pill-button mt-4 w-full bg-gradient-to-r from-gilded via-brass to-gilded text-sm text-onyx shadow-gold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={submissionDisabled || status === "pending"}
            >
              {status === "pending" ? "Sending..." : "Send request"}
            </button>
            <p className="mt-2 text-xs text-platinum/60" aria-live="polite">
              {feedback}
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default BookingForm;
