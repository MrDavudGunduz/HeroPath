import { useState } from 'react';
import { Header, Container, Card, Button, Badge, ProgressBar, Input, Textarea, Modal } from './components';

/**
 * Main Application Component
 * 
 * This is the root component of the HeroPath application.
 * It provides the main layout structure with header, main content area, and footer.
 * 
 * Future features will be integrated into this component:
 * - Task management module
 * - Gamification system (XP, levels, progress)
 * - Narrative journey system
 * - User progress dashboard
 */
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        userLevel={5}
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
          {/* Welcome Section */}
          <section className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-glow animate-float">
              <span className="gradient-text">Welcome to HeroPath!</span> 🚀
            </h2>
            <p className="text-xl text-gray-300">
              Transform your productivity into an epic journey
            </p>
          </section>

          {/* Component Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card Component */}
            <Card
              title="Card Component"
              subtitle="Flexible container for content"
              hover
            >
              <p className="text-gray-600 mb-4">
                This is a Card component with title, subtitle, and hover effect.
              </p>
              <div className="flex gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="xp">XP</Badge>
              </div>
            </Card>

            {/* Progress Bar */}
            <Card title="Progress Bar" hover>
              <div className="space-y-4">
                <ProgressBar value={65} variant="xp" showLabel label="Experience Points" />
                <ProgressBar value={45} variant="level" showLabel label="Level Progress" />
                <ProgressBar value={80} variant="success" showLabel />
              </div>
            </Card>

            {/* Buttons */}
            <Card title="Button Variants" hover>
              <div className="space-y-3">
                <Button variant="primary" fullWidth>
                  Primary Button
                </Button>
                <Button variant="secondary" fullWidth>
                  Secondary Button
                </Button>
                <Button variant="ghost" fullWidth>
                  Ghost Button
                </Button>
              </div>
            </Card>

            {/* Input Components */}
            <Card title="Form Components" hover>
              <div className="space-y-4">
                <Input
                  label="Task Title"
                  placeholder="Enter task title..."
                  fullWidth
                />
                <Textarea
                  label="Description"
                  placeholder="Enter description..."
                  fullWidth
                />
              </div>
            </Card>

            {/* Badges */}
            <Card title="Badge Variants" hover>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="xp">XP</Badge>
                <Badge variant="level">Level</Badge>
                <Badge variant="narrative">Story</Badge>
              </div>
            </Card>

            {/* Modal Trigger */}
            <Card title="Modal Component" hover>
              <p className="text-gray-600 mb-4">
                Click the button below to open a modal dialog.
              </p>
              <Button
                variant="primary"
                fullWidth
                onClick={() => setIsModalOpen(true)}
              >
                Open Modal
              </Button>
            </Card>
          </div>
        </Container>
      </main>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </div>
        }
      >
        <p className="text-gray-600">
          This is an example modal dialog. You can add any content here, including forms,
          images, or other components.
        </p>
      </Modal>

      {/* Application Footer */}
      <footer className="bg-slate-900/50 border-t border-purple-500/30 backdrop-blur-lg py-6 relative z-10">
        <Container>
          <div className="text-center text-sm text-gray-400">
            <p>&copy; 2025 HeroPath - Design System & Component Library Ready</p>
            <p className="mt-2 text-xs text-gray-500">Level up your productivity! 🎮</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default App;