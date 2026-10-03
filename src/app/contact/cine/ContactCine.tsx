'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import EnergyField from '@/components/cinematic/EnergyField';
import BlurText from '@/components/cinematic/BlurText';
import { blurIn, blurInView } from '@/components/cinematic/motion';
import { ArrowUpRight, ClockIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/cinematic/icons';
import { COMPANY } from '@/components/cinematic/data';
import { formService } from '@/lib/services/formService';
import { DEPARTMENTS, HOURS, INQUIRY_TYPES, ORGANIZATION_TYPES } from './departments';

const EMPTY = {
  department: '',
  inquiryType: '',
  organizationType: '',
  fullName: '',
  email: '',
  phone: '',
  company: '',
  designation: '',
  country: 'India',
  subject: '',
  message: '',
  urgency: 'normal',
  preferredContact: 'email',
};

const tel = (p: string) => `tel:${p.replace(/\s/g, '')}`;

function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2 min-w-0">
      <span className="text-xs uppercase tracking-[0.16em] text-white/55">
        {label}
        {required && <span className="text-[#9ed27f]"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactCine() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const pickDepartment = (id: string) => {
    setForm((f) => ({ ...f, department: id }));
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await formService.submitContactForm(form);
      setStatus('success');
      setForm(EMPTY);
    } catch (err: unknown) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'The inquiry could not be sent. Check your connection and try again, or email us directly.');
    }
  };

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden min-h-[88svh] flex flex-col">
        <EnergyField variant="hero" className="absolute inset-0 h-full w-full z-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#060b08] z-0" aria-hidden="true" />
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
          <motion.div {...blurIn(0.3)} className="liquid-glass rounded-full flex items-center gap-2.5 pl-1.5 pr-4 py-1.5">
            <span className="rounded-full bg-[#6BAE4B] px-2.5 py-0.5 text-xs font-semibold text-[#06120a]">24/7</span>
            <span className="text-sm text-white/90">Technical support available around the clock</span>
          </motion.div>
          <div className="mt-6 max-w-4xl">
            <BlurText
              as="h1"
              text="Talk to the Engineers Behind the Power"
              className="text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-instrument italic leading-[0.85] tracking-[-3px] md:tracking-[-4px]"
            />
          </div>
          <motion.p {...blurIn(0.8)} className="mt-5 max-w-2xl text-sm md:text-base text-white/90 font-light leading-snug">
            Government procurement, OEM partnerships, export relations or a technical question about a running genset. Every inquiry
            is routed to the team that can answer it.
          </motion.p>
          <motion.div {...blurIn(1.1)} className="mt-9 grid w-full max-w-3xl grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <a href={tel(COMPANY.phone)} className="liquid-glass rounded-[1.25rem] p-5 hover:bg-white/[0.03] transition-colors">
              <PhoneIcon className="h-6 w-6 text-[#9ed27f]" />
              <p className="mt-4 font-instrument italic text-2xl tracking-[-0.5px] leading-none">{COMPANY.phone}</p>
              <p className="mt-2 text-xs text-white/70">Sales and support line</p>
            </a>
            <a href={`mailto:${COMPANY.email}`} className="liquid-glass rounded-[1.25rem] p-5 hover:bg-white/[0.03] transition-colors min-w-0">
              <MailIcon className="h-6 w-6 text-[#9ed27f]" />
              <p className="mt-4 font-instrument italic text-2xl tracking-[-0.5px] leading-none break-words">{COMPANY.email}</p>
              <p className="mt-2 text-xs text-white/70">Quotations and new business</p>
            </a>
            <a href="#plant" className="liquid-glass rounded-[1.25rem] p-5 hover:bg-white/[0.03] transition-colors">
              <PinIcon className="h-6 w-6 text-[#9ed27f]" />
              <p className="mt-4 font-instrument italic text-2xl tracking-[-0.5px] leading-none">Sriperumbudur</p>
              <p className="mt-2 text-xs text-white/70">SIPCOT Industrial Park, Chennai</p>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---------- departments ---------- */}
      <section className="relative px-6 md:px-16 lg:px-20 py-20">
        <motion.header {...blurInView()}>
          <p className="text-sm text-white/80 mb-6">// Departments</p>
          <h2 className="font-instrument italic text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.92] tracking-[-2px] max-w-[16ch]">
            Reach the right desk first time
          </h2>
        </motion.header>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEPARTMENTS.map((d, i) => {
            const selected = form.department === d.id;
            return (
              <motion.article
                key={d.id}
                {...blurInView(0.06 * i)}
                className={`liquid-glass rounded-[1.25rem] p-6 flex flex-col gap-5 transition-colors ${selected ? 'bg-[#6BAE4B]/10' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-instrument italic text-3xl tracking-[-1px] leading-none">{d.name}</h3>
                  <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 whitespace-nowrap">{d.response}</span>
                </div>
                <p className="text-sm text-white/80 font-light leading-snug">{d.description}</p>
                <div className="mt-auto flex flex-col gap-1.5 text-sm">
                  <a href={`mailto:${d.email}`} className="text-white/90 hover:text-[#9ed27f] transition-colors break-words">
                    {d.email}
                  </a>
                  <span className="flex items-center gap-2 text-xs text-white/55">
                    <ClockIcon className="h-3.5 w-3.5" />
                    {d.availability}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => pickDepartment(d.id)}
                  className="self-start liquid-glass-strong rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium"
                >
                  {selected ? 'Selected' : 'Write to this team'}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ---------- form ---------- */}
      <section id="inquiry" className="relative px-6 md:px-16 lg:px-20 py-20 scroll-mt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 80% 30%, rgba(107,174,75,0.14) 0%, rgba(6,11,8,0) 70%)' }}
        />
        <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div {...blurInView()} className="lg:sticky lg:top-28 self-start">
            <p className="text-sm text-white/80 mb-6">// Inquiry</p>
            <h2 className="font-instrument italic text-5xl md:text-6xl leading-[0.92] tracking-[-2px]">Send a formal inquiry</h2>
            <p className="mt-5 max-w-[40ch] text-sm text-white/75 font-light leading-relaxed">
              Fields marked * are required. Choose a department and inquiry type so the request lands with the right engineer, with
              no forwarding chain.
            </p>
          </motion.div>

          <motion.form {...blurInView(0.15)} onSubmit={onSubmit} className="liquid-glass rounded-[1.5rem] p-6 md:p-8 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Department" htmlFor="department" required>
                <select id="department" name="department" value={form.department} onChange={onChange} required className="cine-field">
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Inquiry type" htmlFor="inquiryType" required>
                <select id="inquiryType" name="inquiryType" value={form.inquiryType} onChange={onChange} required className="cine-field">
                  <option value="">Select inquiry type</option>
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Organization type" htmlFor="organizationType" required>
              <select id="organizationType" name="organizationType" value={form.organizationType} onChange={onChange} required className="cine-field">
                <option value="">Select organization type</option>
                {ORGANIZATION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" htmlFor="fullName" required>
                <input id="fullName" name="fullName" value={form.fullName} onChange={onChange} required autoComplete="name" className="cine-field" placeholder="Your name" />
              </Field>
              <Field label="Email" htmlFor="email" required>
                <input id="email" name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" className="cine-field" placeholder="you@company.com" />
              </Field>
              <Field label="Phone" htmlFor="phone" required>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} required autoComplete="tel" className="cine-field" placeholder="+91" />
              </Field>
              <Field label="Company" htmlFor="company" required>
                <input id="company" name="company" value={form.company} onChange={onChange} required autoComplete="organization" className="cine-field" placeholder="Company or department" />
              </Field>
              <Field label="Designation" htmlFor="designation">
                <input id="designation" name="designation" value={form.designation} onChange={onChange} autoComplete="organization-title" className="cine-field" placeholder="Optional" />
              </Field>
              <Field label="Country" htmlFor="country" required>
                <input id="country" name="country" value={form.country} onChange={onChange} required autoComplete="country-name" className="cine-field" />
              </Field>
            </div>
            <Field label="Subject" htmlFor="subject" required>
              <input id="subject" name="subject" value={form.subject} onChange={onChange} required className="cine-field" placeholder="e.g. Quotation for 500 kVA genset" />
            </Field>
            <Field label="Message" htmlFor="message" required>
              <textarea id="message" name="message" value={form.message} onChange={onChange} required rows={6} className="cine-field resize-y" placeholder="Load profile, site, quantities, timelines" />
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Urgency" htmlFor="urgency">
                <select id="urgency" name="urgency" value={form.urgency} onChange={onChange} className="cine-field">
                  <option value="low">Low — general inquiry</option>
                  <option value="normal">Normal — standard response</option>
                  <option value="high">High — priority request</option>
                  <option value="urgent">Urgent — immediate attention</option>
                </select>
              </Field>
              <Field label="Preferred contact" htmlFor="preferredContact">
                <select id="preferredContact" name="preferredContact" value={form.preferredContact} onChange={onChange} className="cine-field">
                  <option value="email">Email</option>
                  <option value="phone">Phone call</option>
                  <option value="both">Email and phone</option>
                </select>
              </Field>
            </div>

            {status === 'success' && (
              <p role="status" className="rounded-[0.9rem] border border-[#6BAE4B]/60 bg-[#6BAE4B]/10 px-4 py-3 text-sm text-[#c9ecb4]">
                Inquiry sent. The team will reply within its listed response time.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="rounded-[0.9rem] border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error} You can also email {COMPANY.email}.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="justify-self-start rounded-full bg-[#6BAE4B] px-6 py-3 flex items-center gap-2 text-sm font-semibold text-[#06120a] hover:bg-[#7cc25a] disabled:opacity-60 transition-colors"
            >
              {status === 'sending' ? 'Sending…' : 'Send inquiry'}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </section>

      {/* ---------- plant ---------- */}
      <section id="plant" className="relative px-6 md:px-16 lg:px-20 py-20 scroll-mt-20">
        <motion.header {...blurInView()}>
          <p className="text-sm text-white/80 mb-6">// Plant</p>
          <h2 className="font-instrument italic text-5xl md:text-6xl leading-[0.92] tracking-[-2px]">Visit the facility</h2>
        </motion.header>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <motion.div {...blurInView(0.1)} className="liquid-glass rounded-[1.5rem] overflow-hidden min-h-[360px]">
            <iframe
              title="Green Boy India plant location"
              src={`${COMPANY.mapUrl}&z=14&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full min-h-[360px] border-0"
              style={{ filter: 'invert(0.92) hue-rotate(180deg) saturate(0.6) brightness(0.9)' }}
            />
          </motion.div>
          <motion.div {...blurInView(0.2)} className="flex flex-col gap-5">
            <div className="liquid-glass rounded-[1.25rem] p-6">
              <PinIcon className="h-6 w-6 text-[#9ed27f]" />
              <p className="mt-4 text-sm leading-relaxed text-white/85">{COMPANY.address}</p>
              <a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#9ed27f] hover:text-white transition-colors">
                Open in Google Maps
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="liquid-glass rounded-[1.25rem] p-6">
              <ClockIcon className="h-6 w-6 text-[#9ed27f]" />
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-white/70">{h.day}</span>
                    <span className="text-white/90 tabular-nums">{h.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-white/50">Plant visits by appointment. ISO 9001:2015 certified facility.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
