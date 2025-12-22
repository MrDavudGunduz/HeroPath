import { Header, Container, ProgressBar, Badge } from './components';
import { TaskForm, TaskList } from './features/tasks';
import { useProgressStore } from './store/useProgressStore';

/**
 * Main Application Component
 * 
 * This is the root component of the HeroPath application.
 * It provides the main layout structure with header, main content area, and footer.
 * 
 * Features integrated:
 * - Task management module (TaskForm + TaskList)
 * - Gamification system (XP, levels, progress)
 * - Progress visualization
 */
const App = () => {
  const progress = useProgressStore((s) => s.progress);

  // Calculate XP progress percentage
  const xpProgress = progress.xpToNextLevel > 0 
    ? Math.round((progress.currentXP / progress.xpToNextLevel) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Application Header */}
      <Header
        userLevel={progress.level}
        userName="Hero"
        navItems={[
          { label: 'Dashboard', active: true },
          { label: 'Tasks' },
          { label: 'Progress' },
        ]}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-8 relative z-10">
        <Container>
          {/* Welcome Section with Progress */}
          <section className="text-center mb-8">
            <h2 className="text-5xl font-bold mb-4 text-glow animate-float">
              <span className="gradient-text">Welcome to HeroPath!</span> 🚀
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Transform your productivity into an epic journey
            </p>

            {/* Progress Summary */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Badge variant="level" size="lg">
                  Level {progress.level}
                </Badge>
                <Badge variant="xp" size="lg">
                  {progress.totalXP} Total XP
                </Badge>
                <Badge variant="primary" size="lg">
                  {progress.completedTasksCount} Tasks Completed
                </Badge>
                {progress.streak > 0 && (
                  <Badge variant="success" size="lg">
                    🔥 {progress.streak} Day Streak
                  </Badge>
                )}
              </div>
              <ProgressBar
                value={xpProgress}
                variant="xp"
                showLabel
                label={`${progress.currentXP} / ${progress.xpToNextLevel} XP to Level ${progress.level + 1}`}
                size="lg"
              />
            </div>
          </section>

          {/* Task Management Dashboard */}
          <div className="space-y-6">
            <TaskForm />
            <TaskList />
          </div>
        </Container>
      </main>

      {/* Application Footer */}
      <footer className="bg-slate-900/50 border-t border-purple-500/30 backdrop-blur-lg py-6 relative z-10">
        <Container>
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2025 HeroPath - Your Epic Productivity Journey</p>
            <p className="mt-2 text-xs text-gray-500">Level up your productivity! 🎮</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default App;