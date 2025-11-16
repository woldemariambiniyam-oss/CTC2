import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
  Target,
  BarChart3,
  Coffee,
  GraduationCap,
  FileText,
  Clock,
  Activity,
  AlertTriangle
} from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Card, Button } from '../components/ui'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [queueStatus, setQueueStatus] = useState({ myQueues: [], totalQueues: 0 })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [statsRes, myQueueRes] = await Promise.all([
        api.get('/reports/dashboard'),
        api.get('/queue/my/queues')
      ])
      setStats(statsRes.data)

      const myQueues = myQueueRes.data || []
      setQueueStatus({
        myQueues,
        totalQueues: myQueues.length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const StatCard = ({ icon: Icon, title, value, color, bgColor, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
            <p className={`text-3xl font-display font-bold ${color}`}>{value || 0}</p>
          </div>
          <div className={`p-3 rounded-xl ${bgColor}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>
    </motion.div>
  )

  const QuickActionCard = ({ to, icon: Icon, title, description, color, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link to={to}>
        <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-text-secondary">{description}</p>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-text-secondary mt-1">
            Here's what's happening with your training today
          </p>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="hidden md:flex items-center space-x-2 bg-gradient-coffee text-white px-4 py-2 rounded-full"
        >
          <Coffee className="w-4 h-4" />
          <span className="text-sm font-medium">CTC Dashboard</span>
        </motion.div>
      </motion.div>

      {/* Queue Status Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="p-4 md:p-5 border-ethiopian aroma-wave">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-highland-green/90 text-cream shadow-soft">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted mb-1">
                  Queue status
                </p>
                {queueStatus.totalQueues > 0 ? (
                  <p className="text-sm text-text-secondary">
                    You&apos;re currently in{' '}
                    <span className="font-semibold text-primary-800">
                      {queueStatus.totalQueues} training queue
                      {queueStatus.totalQueues > 1 && 's'}
                    </span>
                    . Stay ready — your turn is coming soon.
                  </p>
                ) : (
                  <p className="text-sm text-text-secondary flex items-center space-x-1">
                    <AlertTriangle className="w-4 h-4 text-secondary-600" />
                    <span>No active queues. Join a session to enter the queue.</span>
                  </p>
                )}
              </div>
            </div>

            {queueStatus.totalQueues > 0 && (
              <div className="flex-1 md:max-w-xs">
                {/* Show first queue as highlight */}
                {queueStatus.myQueues.slice(0, 1).map((q) => {
                  const total = q.total_in_queue || q.queue_length || queueStatus.totalQueues
                  const position = q.queue_position || 1
                  const progress = Math.max(0, Math.min(100, (1 - (position - 1) / Math.max(total, 1)) * 100))
                  return (
                    <div key={q.id} className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span className="truncate max-w-[70%]">
                          {q.session_title || 'Current session queue'}
                        </span>
                        <span className="font-medium text-primary-700">
                          Position {position}/{total}
                        </span>
                      </div>
                      <Progress value={progress} max={100} className="h-2" />
                      <p className="text-[0.75rem] text-text-muted">
                        Estimated wait:{' '}
                        <span className="font-medium text-text-secondary">
                          {Math.ceil(position / 2)} hour{Math.ceil(position / 2) > 1 && 's'}
                        </span>
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex justify-end md:justify-start">
              <Link to="/queue">
                <Button
                  variant="outline"
                  className="rounded-2xl text-sm"
                >
                  Manage queue
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {user?.role === 'trainee' ? (
          <>
            <StatCard
              icon={BookOpen}
              title="My Enrollments"
              value={stats?.totalEnrollments}
              color="text-primary-600"
              bgColor="bg-primary-500"
              delay={0.1}
            />
            <StatCard
              icon={CheckCircle}
              title="Completed Sessions"
              value={stats?.completedSessions}
              color="text-green-600"
              bgColor="bg-green-500"
              delay={0.2}
            />
            <StatCard
              icon={Award}
              title="Certificates Earned"
              value={stats?.certificates}
              color="text-secondary-600"
              bgColor="bg-secondary-500"
              delay={0.3}
            />
            <StatCard
              icon={Target}
              title="Exam Attempts"
              value={stats?.examAttempts}
              color="text-orange-600"
              bgColor="bg-orange-500"
              delay={0.4}
            />
            <StatCard
              icon={GraduationCap}
              title="Passed Exams"
              value={stats?.passedExams}
              color="text-blue-600"
              bgColor="bg-blue-500"
              delay={0.5}
            />
          </>
        ) : (
          <>
            <StatCard
              icon={Calendar}
              title="Total Sessions"
              value={stats?.totalSessions}
              color="text-primary-600"
              bgColor="bg-primary-500"
              delay={0.1}
            />
            <StatCard
              icon={Clock}
              title="Active Sessions"
              value={stats?.activeSessions}
              color="text-green-600"
              bgColor="bg-green-500"
              delay={0.2}
            />
            <StatCard
              icon={Users}
              title="Total Trainees"
              value={stats?.totalTrainees}
              color="text-secondary-600"
              bgColor="bg-secondary-500"
              delay={0.3}
            />
            <StatCard
              icon={Award}
              title="Certificates Issued"
              value={stats?.totalCertificates}
              color="text-orange-600"
              bgColor="bg-orange-500"
              delay={0.4}
            />
            <StatCard
              icon={FileText}
              title="Total Exams"
              value={stats?.totalExams}
              color="text-purple-600"
              bgColor="bg-purple-500"
              delay={0.5}
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-display font-bold text-text-primary mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickActionCard
              to="/sessions"
              icon={Calendar}
              title="Training Sessions"
              description="Browse and enroll in upcoming sessions"
              color="bg-primary-500"
              delay={0.7}
            />
            <QuickActionCard
              to="/exams"
              icon={FileText}
              title="Examinations"
              description="Take exams and view your results"
              color="bg-green-500"
              delay={0.8}
            />
            <QuickActionCard
              to="/certificates"
              icon={Award}
              title="My Certificates"
              description="View and download your certificates"
              color="bg-secondary-500"
              delay={0.9}
            />
            {user?.role !== 'trainee' && (
              <QuickActionCard
                to="/queue"
                icon={Users}
                title="Queue Management"
                description="Manage training session queues"
                color="bg-orange-500"
                delay={1.0}
              />
            )}
            {(user?.role === 'admin' || user?.role === 'trainer') && (
              <QuickActionCard
                to="/reports"
                icon={BarChart3}
                title="Reports & Analytics"
                description="View detailed analytics and reports"
                color="bg-purple-500"
                delay={1.1}
              />
            )}
            {user?.role === 'admin' && (
              <QuickActionCard
                to="/users"
                icon={Users}
                title="User Management"
                description="Manage system users and roles"
                color="bg-indigo-500"
                delay={1.2}
              />
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Dashboard


