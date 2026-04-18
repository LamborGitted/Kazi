"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const charVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.07,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function FloatingLabel({
  label,
  name,
  type = "text",
  textarea = false,
  value,
  onChange,
  delay = 0,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const isActive = value.length > 0;
  const Input = textarea ? "textarea" : "input";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      <Input
        name={name}
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onChange(e.target.value)}
        required
        rows={textarea ? 5 : undefined}
        className={`
          peer w-full bg-transparent rounded-xl
          border border-border
          px-4 ${textarea ? "pt-6 pb-3" : "pt-5 pb-2"}
          text-foreground text-sm
          outline-none
          transition-all duration-300
          focus:border-accent/60
          focus:shadow-[0_0_30px_rgba(236,72,153,0.08)]
          placeholder-transparent
          resize-none
        `}
        placeholder={label}
      />
      <label
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${textarea ? "top-3.5" : "top-3"}
          text-xs font-mono tracking-wide
          ${
            isActive
              ? "text-accent -translate-y-0"
              : "peer-focus:text-accent peer-focus:-translate-y-0 text-muted peer-focus:text-accent"
          }
        `}
      >
        {label}
      </label>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-focus-within:w-full bg-accent/40 transition-all duration-500 rounded-full" />
    </motion.div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setFormState("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormState("error");
    }
  }

  return (
    <main className="flex flex-col min-h-screen relative">
      <section className="relative flex flex-col items-center justify-center py-28 sm:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float-delay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-mono text-accent tracking-widest uppercase"
          >
            Get in touch
          </motion.span>

          <h1 className="mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none overflow-hidden [perspective:600px]">
            {"CONTACT".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <div className="mt-8 h-px w-full max-w-xs mx-auto bg-border relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 1.2,
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg font-light text-foreground/50 max-w-md mx-auto"
          >
            Have a question or want to work together? Drop me a message.
          </motion.p>
        </motion.div>
      </section>

      <section className="relative w-full px-6 pb-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/3 blur-3xl" />
        </div>

        <div className="max-w-xl mx-auto relative z-10">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={
              formInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 60, scale: 0.97 }
            }
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative"
          >
            <div className="rounded-2xl border border-border bg-surface/60 backdrop-blur-sm p-8 sm:p-10 shadow-lg shadow-black/5 dark:shadow-black/20">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 text-accent"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-bold tracking-tight mb-2">
                      Message Sent
                    </h3>
                    <p className="text-sm text-foreground/50">
                      Thank you for reaching out. I&apos;ll get back to you soon.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="mt-8 text-sm font-mono text-accent hover:text-accent/80 transition-colors"
                    >
                      Send another message &rarr;
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FloatingLabel
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                        delay={0.1}
                      />
                      <FloatingLabel
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                        delay={0.15}
                      />
                    </div>

                    <FloatingLabel
                      label="Subject"
                      name="subject"
                      value={form.subject}
                      onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                      delay={0.2}
                    />

                    <FloatingLabel
                      label="Message"
                      name="message"
                      textarea
                      value={form.message}
                      onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                      delay={0.25}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="pt-2"
                    >
                      <button
                        type="submit"
                        disabled={formState === "sending"}
                        className="group relative w-full py-3.5 rounded-xl font-medium text-sm tracking-wide
                          bg-foreground text-background
                          hover:bg-accent
                          disabled:opacity-60 disabled:cursor-not-allowed
                          transition-all duration-300
                          overflow-hidden"
                      >
                        <span
                          className={`inline-flex items-center gap-2 transition-all duration-300 ${
                            formState === "sending"
                              ? "opacity-0"
                              : "opacity-100"
                          }`}
                        >
                          Send Message
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            &rarr;
                          </motion.span>
                        </span>

                        {formState === "sending" && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <svg
                              className="animate-spin h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                          </motion.span>
                        )}
                      </button>

                      {formState === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 text-xs text-red-400 text-center"
                        >
                          Something went wrong. Please try again.
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={formInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex items-center justify-center gap-8 flex-wrap"
          >
            <a
              href="https://github.com/LamborGitted"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/LamborGitted"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
            <a
              href="https://space.bilibili.com/1517690573"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zm4 5.427c-.746 0-1.333-.6-1.333-1.334 0-.733.587-1.333 1.333-1.333s1.334.6 1.334 1.333c0 .734-.588 1.334-1.334 1.334zm5.334 0c-.746 0-1.334-.6-1.334-1.334 0-.733.588-1.333 1.334-1.333.746 0 1.333.6 1.333 1.333 0 .734-.587 1.334-1.333 1.334z" />
              </svg>
              Bilibili
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
