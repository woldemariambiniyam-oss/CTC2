import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Coffee, Mountain, Leaf, ArrowRight, PlayCircle } from 'lucide-react'
import { Button, Card } from '../components/ui'

const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -left-32 -top-32 w-80 h-80 rounded-full bg-gradient-coffee blur-3xl" />
          <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-highland-green opacity-60 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 grid gap-12 lg:grid-cols-[1.3fr,1fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur text-[0.75rem] border border-white/40 mb-6 border-ethiopian">
              <Leaf className="w-3 h-3 text-highland-green" />
              <span className="uppercase tracking-[0.2em] text-text-secondary">
                Ethiopian Coffee Training Center
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-primary-900 mb-4 leading-tight">
              Crafted in Ethiopia,
              <span className="block text-secondary-600">
                brewed for the world.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary max-w-xl mb-8 text-balance">
              Immerse yourself in the heritage of Ethiopian coffee — from highland farms to jebena
              ceremonies — through a modern, guided training experience designed for baristas,
              roasters, and coffee lovers.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Button
                as={Link}
                to="/register"
                className="bg-primary-700 hover:bg-primary-800 text-cream px-6 py-3 rounded-2xl shadow-soft flex items-center space-x-2 text-sm sm:text-base"
              >
                <span>Start your journey</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                as={Link}
                to="/login"
                variant="outline"
                className="rounded-2xl border-primary-300 text-primary-700 hover:bg-primary-50 flex items-center space-x-2 text-sm sm:text-base"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Continue as trainee</span>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-[0.8rem] sm:text-sm text-text-secondary">
              <div>
                <div className="font-semibold text-primary-800">Highland Sourced</div>
                <p>Modules rooted in Ethiopia&apos;s coffee origins and terroir.</p>
              </div>
              <div>
                <div className="font-semibold text-primary-800">Hands-on Training</div>
                <p>Sessions, exams, and certificates tailored to real workflows.</p>
              </div>
              <div>
                <div className="font-semibold text-primary-800">Global Standards</div>
                <p>Modern UX, analytics, and verifiable digital certificates.</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Card className="relative p-6 sm:p-8 rounded-3xl bg-white/90 glass aroma-wave">
              <div className="absolute -top-10 right-6 w-20 h-20 rounded-full bg-secondary-500/80 blur-xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-gradient-coffee shadow-soft">
                    <Coffee className="w-7 h-7 text-cream" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">
                      Selam, welcome
                    </p>
                    <p className="font-display text-lg text-primary-900">
                      Coffee Training Center
                    </p>
                  </div>
                </div>
                <Mountain className="w-8 h-8 text-highland-green opacity-80" />
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Today&apos;s roast journey</span>
                  <span className="text-[0.8rem] font-medium text-primary-700">
                    Washed · Natural · Experimental
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200/60">
                  <div className="h-full w-3/5 bg-gradient-to-r from-highland-green via-secondary-500 to-coffee-bean animate-[pulse_3s_ease-in-out_infinite]" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="border-ethiopian bg-cream/90 rounded-2xl p-4">
                  <p className="font-semibold text-primary-900 mb-1">Structured learning</p>
                  <p className="text-text-secondary">
                    Follow guided paths through sessions, queues, exams, and certificates.
                  </p>
                </div>
                <div className="border-ethiopian bg-white/90 rounded-2xl p-4">
                  <p className="font-semibold text-primary-900 mb-1">Rooted in ceremony</p>
                  <p className="text-text-secondary">
                    Inspired by Ethiopian coffee ceremony — slow, intentional, communal.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Story / Heritage */}
      <section className="bg-white/60 border-t border-neutral-200/60">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16 grid gap-10 lg:grid-cols-[1.1fr,1fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-primary-900 mb-3">
              From Ethiopian highlands to your bar.
            </h2>
            <p className="text-text-secondary mb-4">
              Ethiopia is the birthplace of coffee. CTC honors that legacy by blending traditional
              knowledge with modern training workflows.
            </p>
            <p className="text-text-secondary mb-6">
              Whether you&apos;re a trainee, trainer, or administrator, the platform guides you
              through immersive learning journeys — from queue management to examination and
              certification — all wrapped in a warm, ceremony-inspired experience.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-primary-800 mb-1">Sessions</p>
                <p className="text-text-secondary">Plan, join, and track practical training.</p>
              </div>
              <div>
                <p className="font-semibold text-primary-800 mb-1">Exams</p>
                <p className="text-text-secondary">Calm, focused exam flows with auto-save.</p>
              </div>
              <div>
                <p className="font-semibold text-primary-800 mb-1">Certificates</p>
                <p className="text-text-secondary">Gold-framed, QR-verifiable certificates.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 rounded-3xl border-ethiopian bg-cream/90">
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-3">
                Designed for
              </p>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-coffee-cherry" />
                  <span>Training centers & academies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-highland-green" />
                  <span>Professional baristas & roasters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-500" />
                  <span>Cooperatives & coffee projects</span>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  as={Link}
                  to="/register"
                  className="rounded-2xl bg-highland-green hover:bg-highland-green/90 text-cream px-4 py-2 text-sm"
                >
                  Begin as trainee
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline"
                  className="rounded-2xl border-primary-200 text-primary-700 text-sm"
                >
                  Trainer / Admin login
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing


