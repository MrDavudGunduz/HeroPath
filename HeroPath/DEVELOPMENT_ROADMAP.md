# HeroPath - Development Roadmap

## 1-Month Agile Sprint Plan

> **Project Vision**: A gamified task management application - Users earn XP, level up, and feel progress as they complete their tasks.

---

## 📋 Table of Contents

1. [Phase 1: Core Infrastructure & Setup (Week 1)](#phase-1-core-infrastructure--setup-week-1)
2. [Phase 2: Core Features & State Management (Week 2)] (#phase-2-core-features--state-management-week-2)
3. [Phase 3: Gamification Mechanics (Week 3)](#phase-3-gamification-mechanics-week-3)
4. [Phase 4: Polish, Testing & Deployment (Week 4)](#phase-4-polish-testing--deployment-week-4)
5. [Phase 4.5: Backend & Cloud Data Persistence (Critical - Before Post-MVP)](#phase-45-backend--cloud-data-persistence-critical---before-post-mvp-features)
6. [Phase 5: Unique & Innovative Features (Post-MVP)](#phase-5-unique--innovative-features-post-mvp)
7. [Technical Competency Goals](#technical-competency-goals)
8. [UX & Value Goals](#ux--value-goals)
9. [MVP Definition of Done](#mvp-definition-of-done)

---

## Phase 1: Core Infrastructure & Setup (Week 1)

### 🎯 Sprint Goals

- Modern React + TypeScript project setup
- Tailwind CSS integration
- Project architecture and folder structure
- Basic UI component library creation

### 📦 Technical Tasks

#### 1.1 Project Setup (Day 1-2)

```bash
# To-dos:
- [x] Vite + React + TypeScript template setup
- [x] ESLint + Prettier configuration
- [x] Tailwind CSS installation and configuration
- [x] Git repository initialization
- [x] .gitignore and README.md preparation
```

**File Structure:**

```
HeroPath/
├── src/
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-based modules
│   │   ├── tasks/         # Task management feature
│   │   ├── gamification/  # XP, Level, Progress
│   │   └── narrative/     # Story & journey system
│   ├── hooks/             # Custom React hooks
│   ├── store/             # State management
│   ├── utils/             # Helper functions
│   ├── types/             # TypeScript type definitions
│   ├── services/          # External services (AI, etc.)
│   └── App.tsx
├── public/
└── package.json
```

#### 1.2 Design System & Component Library (Day 3-4)

- [x] **Design Tokens**: Color palette, typography, spacing system
- [x] **Base Components**:
  - Button (primary, secondary, ghost variants)
  - Input/Textarea
  - Card
  - Badge
  - ProgressBar
  - Modal/Dialog
  - Avatar/Character (for hero progression)
- [x] **Layout Components**:
  - Container
  - Header/Navbar
  - Sidebar (optional)

- [ ] **Mobile-First Component Considerations**:
  - **Touch Targets**: Minimum 44x44px (iOS) / 48x48px (Material) for all interactive elements
  - **Button Sizes**: 
    - Mobile: Larger touch targets, full-width on small screens
    - Desktop: Compact sizes, auto-width
  - **Input Fields**:
    - Mobile: Full-width, larger font size (16px+ to prevent zoom on iOS)
    - Proper input types for mobile keyboards (email, tel, number)
    - Autocomplete attributes
  - **Modal/Dialog**:
    - Mobile: Full-screen or bottom sheet style
    - Desktop: Centered modal with backdrop
    - Swipe-to-dismiss on mobile
  - **Card Components**:
    - Mobile: Stack vertically, full-width
    - Desktop: Grid layout, flexible widths
  - **Navigation**:
    - Mobile: Bottom navigation bar or hamburger menu
    - Desktop: Top navigation or sidebar
  - **Typography**:
    - Mobile: Larger base font (16px+), increased line-height
    - Responsive font sizes using `clamp()` or Tailwind responsive classes
  - **Spacing**:
    - Mobile: Tighter spacing, but maintain touch target sizes
    - Desktop: More generous spacing

**Tailwind Customization:**

```typescript
// tailwind.config.js - Gamification theme colors
theme: {
  extend: {
    colors: {
      'hero-primary': '#6366f1',    // Indigo
      'hero-success': '#10b981',    // Emerald
      'hero-warning': '#f59e0b',    // Amber
      'hero-danger': '#ef4444',     // Red
      'hero-xp': '#8b5cf6',         // Purple (for XP)
      'hero-level': '#f97316',      // Orange (for Level)
      'hero-narrative': '#ec4899',  // Pink (for story elements)
    }
  }
}
```

#### 1.3 State Management Setup (Day 5)

- [x] **Zustand** or **Jotai** installation (lightweight and modern)
- [x] Store structure design:

  ```typescript
  // store/types.ts
  interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
    xpValue: number; // XP earned when task is completed
    difficulty: 'easy' | 'medium' | 'hard';
    category?: string;
    emotionalState?: 'excited' | 'calm' | 'challenged' | 'satisfied';
    storyChapter?: string; // Links to narrative system
  }

  interface UserProgress {
    level: number;
    currentXP: number;
    totalXP: number;
    xpToNextLevel: number;
    completedTasksCount: number;
    streak: number;
    heroCharacter: HeroCharacter; // Visual character progression
    skillTree: SkillTree; // Skill development system
  }

  interface HeroCharacter {
    level: number;
    appearance: string; // Character visual state
    unlockedOutfits: string[];
    currentOutfit: string;
  }

  interface SkillTree {
    productivity: number;
    creativity: number;
    health: number;
    learning: number;
    social: number;
  }
  ```

**State Management Choice:**

- **Zustand** (Recommended): Minimal, TypeScript-friendly, middleware support
- **Jotai**: Atomic state management, React-native approach

#### 1.4 LocalStorage Service (Day 5)

- [x] LocalStorage wrapper utility
- [x] Data persistence strategy
- [x] Migration system (for future versions)

```typescript
// utils/storage.ts
export const storage = {
  get: <T>(key: string): T | null => { ... },
  set: <T>(key: string, value: T): void => { ... },
  remove: (key: string): void => { ... },
  clear: (): void => { ... }
};
```

### ✅ Definition of Done - Phase 1

- [x] Project runs successfully (`npm run dev`)
- [x] Tailwind CSS works correctly
- [x] At least 5 base components ready and usable (10 components created)
- [x] State management setup completed
- [x] LocalStorage utility ready

---

## Phase 2: Core Features & State Management (Week 2)

> **📝 Testing Reminder**: Write tests **alongside** each feature. Don't wait until Phase 4!

### 🎯 Sprint Goals

- Task add/delete/edit functionality
- State management implementation
- LocalStorage integration
- Basic UI/UX flows

### 📦 Technical Tasks

#### 2.1 Task Management Feature (Day 1-3)

- [ ] **Task Store** implementation:

  ```typescript
  // store/taskStore.ts
  interface TaskStore {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
    deleteTask: (id: string) => void;
    toggleTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    getTasksByCategory: (category: string) => Task[];
    getTasksByDifficulty: (difficulty: string) => Task[];
  }
  ```

- [ ] **Task Components**:
  - `TaskForm`: New task creation form
  - `TaskList`: Task list
  - `TaskItem`: Individual task card
  - `TaskFilters`: Filtering (All, Active, Completed, By Category, By Difficulty)

- [ ] **Form Validation**:
  - Title required (min 3 characters)
  - XP value auto-calculation (based on difficulty level)
  - Category selection (optional but recommended)

#### 2.2 LocalStorage Persistence (Day 3-4)

- [ ] Synchronize stores with LocalStorage
- [ ] Debounced save (for performance)
- [ ] Error handling (quota exceeded, etc.)
- [ ] Data migration utility

```typescript
// hooks/usePersistedStore.ts
// Automatic persistence with Zustand middleware
```

#### 2.3 UI/UX Implementation (Day 4-5)

- [ ] **Main Page Layout**:
  - Header (HeroPath logo, user level display, hero character avatar)
  - Task input area (quick add)
  - Task list (scrollable)
  - Progress indicator (XP bar, level, skill tree preview)

- [ ] **Mobile-First Responsive Design**:

  **Breakpoints** (Tailwind defaults):
  ```css
  sm: 640px   /* Small tablets */
  md: 768px   /* Tablets */
  lg: 1024px  /* Small laptops */
  xl: 1280px  /* Desktops */
  2xl: 1536px /* Large desktops */
  ```

  **Mobile Layout (< 768px)**:
  - [ ] Single column layout
  - [ ] Bottom navigation bar (Tasks, Progress, Profile)
  - [ ] Collapsible header (scroll to hide/show)
  - [ ] Full-width task cards
  - [ ] Floating action button (FAB) for "Add Task"
  - [ ] Swipe gestures for task actions (swipe to complete/delete)
  - [ ] Pull-to-refresh for task list
  - [ ] Sticky task input at top or bottom

  **Tablet Layout (768px - 1024px)**:
  - [ ] Two-column layout (task list + detail view)
  - [ ] Side navigation drawer
  - [ ] Grid layout for task cards (2 columns)

  **Desktop Layout (> 1024px)**:
  - [ ] Three-column layout (sidebar + task list + detail view)
  - [ ] Persistent sidebar navigation
  - [ ] Hover states and tooltips
  - [ ] Keyboard shortcuts support

- [ ] **Touch Interactions** (Mobile):
  - [ ] Swipe left on task → Delete action
  - [ ] Swipe right on task → Complete action
  - [ ] Long press → Context menu
  - [ ] Pull down → Refresh
  - [ ] Tap outside modal → Close
  - [ ] Smooth scroll behavior
  - [ ] Momentum scrolling (iOS)

- [ ] **Mobile-Specific UX**:
  - [ ] Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes">`
  - [ ] Safe area insets for notched devices (iOS)
  - [ ] Prevent zoom on input focus (font-size: 16px+)
  - [ ] Bottom sheet modals (better than center modals on mobile)
  - [ ] Haptic feedback (if available)
  - [ ] Loading skeletons instead of spinners

- [ ] **Animations**:
  - Task add/delete animations (Framer Motion or CSS transitions)
  - Smooth transitions
  - Loading states
  - Reduced motion support (`prefers-reduced-motion`)

- [ ] **Performance on Mobile**:
  - [ ] Lazy loading for images
  - [ ] Virtual scrolling for long task lists
  - [ ] Debounced search/filter
  - [ ] Optimized bundle size
  - [ ] Code splitting for routes

#### 2.4 Error Handling & Edge Cases (Day 5)

- [ ] Empty state (when no tasks)
- [ ] Error boundaries
- [ ] Toast notifications (success/error messages)
- [ ] Input validation feedback

### ✅ Definition of Done - Phase 2

- [ ] Task add/delete/edit working
- [ ] Data persisted in LocalStorage
- [ ] Data preserved on page refresh
- [ ] Basic UI/UX flows completed
- [ ] **Mobile-First Responsive Design**:
  - [ ] Mobile layout (< 768px) working correctly
  - [ ] Tablet layout (768px - 1024px) working correctly
  - [ ] Desktop layout (> 1024px) working correctly
  - [ ] Touch interactions (swipe, long press) working on mobile
  - [ ] All interactive elements meet minimum touch target sizes (44x44px)
  - [ ] No horizontal scrolling on mobile
  - [ ] Forms work correctly on mobile (no zoom on input focus)

---

## Phase 3: Gamification Mechanics (Week 3)

> **📝 Testing Reminder**: Write tests **alongside** each feature. Test edge cases (negative XP, level boundaries, etc.) as you build!

### 🎯 Sprint Goals

- XP (Experience Points) system
- Level system
- Progress tracking
- Motivational feedback mechanisms

### 📦 Technical Tasks

#### 3.1 Gamification Store (Day 1-2)

- [ ] **Progress Store** implementation:

  ```typescript
  // store/progressStore.ts
  interface ProgressStore {
    level: number;
    currentXP: number;
    totalXP: number;
    xpToNextLevel: number;
    completedTasksCount: number;
    streak: number;
    skillTree: SkillTree;
    heroCharacter: HeroCharacter;

    addXP: (amount: number, skillCategory?: string) => void;
    levelUp: () => void;
    calculateXPToNextLevel: () => number;
    updateSkill: (category: string, amount: number) => void;
    unlockCharacterOutfit: (outfit: string) => void;
  }
  ```

- [ ] **XP Calculation Logic**:
  ```typescript
  // utils/xpCalculator.ts
  // XP calculation based on task difficulty
  // Example: Easy: 10 XP, Medium: 25 XP, Hard: 50 XP
  // Bonus multipliers for streaks, time-based challenges
  ```

#### 3.2 Level System (Day 2-3)

- [ ] **Level Progression Formula**:

  ```typescript
  // Level 1: 0-100 XP
  // Level 2: 100-250 XP
  // Level 3: 250-450 XP
  // Exponential growth formula
  const xpForLevel = (level: number) => {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  };
  ```

- [ ] **Level Up Animation**:
  - Celebration modal
  - Confetti effect (optional)
  - Sound effect (optional)
  - Character visual update

#### 3.3 Progress Visualization (Day 3-4)

- [ ] **XP Progress Bar**:
  - Current XP / Next Level XP
  - Animated progress bar
  - Level badge display

- [ ] **Statistics Dashboard**:
  - Total completed tasks
  - Current level
  - Total earned XP
  - Completion rate
  - Skill tree visualization
  - Hero character progression

- [ ] **Achievement System** (Optional - Post-MVP):
  - First task completion
  - 10 tasks completed
  - Reaching Level 5
  - etc.

#### 3.4 Task Completion Flow (Day 4-5)

- [ ] When task is completed:
  1. Task transitions to completed state
  2. XP is earned
  3. Skill points are added to relevant category
  4. Progress bar updates
  5. Level up check is performed
  6. Celebration feedback is shown
  7. Hero character visual updates (if level up)

- [ ] **Completion Animation**:
  - Task checkmark animation
  - XP gain popup
  - Progress bar animation
  - Skill point notification

#### 3.5 Motivational Elements (Day 5)

- [ ] **Daily Goals** (Optional):
  - Daily target task count
  - Streak tracking

- [ ] **Encouraging Messages**:
  - Level up messages
  - Milestone messages
  - Empty state motivational messages
  - Context-aware encouragement based on time of day

### ✅ Definition of Done - Phase 3

- [ ] XP system working
- [ ] Level system implemented
- [ ] Progress bar working correctly
- [ ] XP earned when task is completed
- [ ] Level up mechanic working
- [ ] All data persisted in LocalStorage

---

## Phase 4: Polish, Testing & Deployment (Week 4)

> **📝 Testing Note**: This phase should focus on **test coverage gaps** and **integration tests**, not writing all tests from scratch. Most tests should already exist from Phases 2-3!

### 🎯 Sprint Goals

- Code quality improvements
- Performance optimizations
- Test coverage review and gap filling
- Integration and E2E tests
- Production deployment

### 📦 Technical Tasks

#### 4.1 Code Quality (Day 1-2)

- [ ] **TypeScript Strict Mode**:
  - Remove all `any` types
  - Type safety check
  - Complete interface/type definitions

- [ ] **Code Organization**:
  - Component refactoring
  - Custom hooks extraction
  - Utility functions organization
  - Dead code removal

- [ ] **Accessibility (a11y)**:
  - ARIA labels
  - Keyboard navigation
  - Focus management
  - Screen reader support

#### 4.2 Performance Optimization (Day 2-3)

- [ ] **React Optimization**:
  - `React.memo` usage (when needed)
  - `useMemo` and `useCallback` optimizations
  - Code splitting (lazy loading)
  - Bundle size analysis

- [ ] **LocalStorage Optimization**:
  - Debounced saves
  - Data compression (optional)
  - Cleanup old data

- [ ] **Rendering Performance**:
  - Virtual scrolling (if many tasks)
  - Animation performance
  - Re-render optimization

#### 4.3 Testing (Ongoing - Write Tests Alongside Features)

> **⚠️ Critical Best Practice**: Tests should be written **alongside feature development**, not left to the end. Writing tests during development ensures:
> - Edge cases are caught early
> - Tests cover real usage patterns, not just happy paths
> - Better code quality and maintainability
> - Confidence in refactoring

**Testing Strategy**:

- [ ] **Unit Tests** (Vitest) - Write as you build utilities:
  - Utility functions (✅ xpCalculator.test.ts exists)
  - XP calculation logic (✅ covered)
  - Level progression logic (✅ covered)
  - Storage utilities
  - Form validation logic

- [ ] **Component Tests** (React Testing Library) - Write as you build components:
  - TaskForm component
  - TaskList component
  - Progress components (✅ ProgressBar.test.tsx exists)
  - TaskItem component (✅ TaskItem.test.tsx exists - excellent edge case coverage!)

- [ ] **Integration Tests** - Write as you integrate features:
  - Task CRUD operations
  - XP/Level flow
  - LocalStorage persistence
  - Store interactions

- [ ] **E2E Tests** (Playwright/Cypress - Optional):
  - Critical user flows

**Test Coverage Goals**:
- Aim for >80% coverage on critical business logic
- Focus on edge cases, not just happy paths
- Test error handling and boundary conditions
- Use `npm run test:watch` during development for instant feedback

#### 4.4 UI/UX Polish (Day 4)

- [ ] **Visual Polish**:
  - Consistent spacing
  - Color contrast check
  - Typography refinement
  - Icon consistency

- [ ] **Micro-interactions**:
  - Hover states
  - Click feedback
  - Loading states
  - Error states

- [ ] **Dark Mode** (Optional):
  - Theme toggle
  - System preference detection

#### 4.5 Deployment (Day 5)

- [ ] **Build Optimization**:
  - Production build
  - Environment variables
  - Asset optimization

- [ ] **Deployment Options**:
  - **Vercel** (Recommended - easy and fast)
  - **Netlify**
  - **GitHub Pages**

- [ ] **CI/CD Setup** (Optional):
  - GitHub Actions
  - Automated testing
  - Automated deployment

- [ ] **Documentation**:
  - README.md update
  - Code comments
  - Component documentation

### ✅ Definition of Done - Phase 4

- [ ] All tests passing
- [ ] Production build successful
- [ ] Application deployed
- [ ] Performance metrics acceptable
- [ ] Code quality standards met
- [ ] README and documentation completed

---

## Phase 4.5: Backend & Cloud Data Persistence (Critical - Before Post-MVP Features)

> **⚠️ Critical Architecture Decision**: MVP tamamen client-side (LocalStorage) üzerine kurulu. Bu faz, Post-MVP özelliklerinden (özellikle Collaborative Quests) **önce** tamamlanmalıdır.

### 🎯 Sprint Goals

- Cloud-based data persistence
- User authentication & accounts
- Multi-device synchronization
- Data migration from LocalStorage
- API infrastructure for future features

### 📦 Technical Tasks

#### 4.5.1 Backend Infrastructure Setup (Week 1)

**Technology Stack**:
- **Backend**: Node.js + Express (veya Fastify)
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt (veya Auth0/Firebase Auth)
- **ORM**: Prisma (veya TypeORM)
- **Hosting**: Railway, Render, Fly.io, veya AWS

**Project Structure**:
```
heropath-backend/
├── src/
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── models/          # Database models
│   ├── middleware/      # Auth, validation, etc.
│   ├── services/        # External services
│   ├── utils/           # Helper functions
│   └── types/           # TypeScript types
├── prisma/
│   └── schema.prisma    # Database schema
├── tests/               # Backend tests
└── package.json
```

**Database Schema Design**:

```prisma
// prisma/schema.prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  tasks         Task[]
  progress      UserProgress?
  achievements  Achievement[]
  quests        QuestParticipant[]
}

model Task {
  id            String   @id @default(uuid())
  userId        String
  title         String
  description   String?
  completed     Boolean  @default(false)
  createdAt     DateTime @default(now())
  completedAt   DateTime?
  xpValue       Int
  difficulty    String   // 'easy' | 'medium' | 'hard'
  category      String?
  
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([userId, completed])
}

model UserProgress {
  id                String   @id @default(uuid())
  userId            String   @unique
  level             Int      @default(1)
  currentXP         Int      @default(0)
  totalXP           Int      @default(0)
  completedTasksCount Int    @default(0)
  streak            Int      @default(0)
  lastActiveDate    DateTime?
  
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

model Achievement {
  id          String   @id @default(uuid())
  userId      String
  type        String   // 'first_task', 'level_5', etc.
  unlockedAt  DateTime @default(now())
  
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

// For future Collaborative Quests feature
model Quest {
  id          String   @id @default(uuid())
  title       String
  description String
  createdBy   String
  createdAt   DateTime @default(now())
  deadline    DateTime?
  
  participants QuestParticipant[]
}

model QuestParticipant {
  id        String   @id @default(uuid())
  questId   String
  userId    String
  joinedAt  DateTime @default(now())
  
  quest     Quest    @relation(fields: [questId], references: [id], onDelete: Cascade)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([questId, userId])
  @@index([userId])
}
```

#### 4.5.2 Authentication System (Week 1-2)

- [ ] **User Registration**:
  - Email/password signup
  - Email verification (optional but recommended)
  - Password strength validation
  - Duplicate email handling

- [ ] **User Login**:
  - JWT token generation
  - Refresh token mechanism
  - Session management
  - "Remember me" functionality

- [ ] **Password Management**:
  - Secure password hashing (bcrypt)
  - Password reset flow
  - Password change functionality

- [ ] **API Security**:
  - JWT middleware for protected routes
  - Rate limiting
  - CORS configuration
  - Input validation & sanitization
  - **Environment Variables**: API keys (OpenAI, etc.) stored in `.env`, never in code
  - **Secret Management**: Use secure secret management (Railway/Render secrets, AWS Secrets Manager)

**API Endpoints**:
```typescript
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

#### 4.5.3 Data Sync API (Week 2)

- [ ] **Task Management API**:
  ```typescript
  GET    /api/tasks              // Get all user tasks
  POST   /api/tasks              // Create task
  GET    /api/tasks/:id          // Get single task
  PUT    /api/tasks/:id          // Update task
  DELETE /api/tasks/:id          // Delete task
  PATCH  /api/tasks/:id/toggle   // Toggle completion
  ```

- [ ] **Progress API**:
  ```typescript
  GET    /api/progress            // Get user progress
  POST   /api/progress/xp         // Add XP
  POST   /api/progress/level-up   // Handle level up
  ```

- [ ] **AI Service API** (For Phase 5.2):
  ```typescript
  POST   /api/ai/suggest-tasks    // Get AI task suggestions
  // Requires: JWT authentication
  // Security: API key stored server-side only
  ```

- [ ] **Sync Strategy**:
  - Optimistic updates (client updates immediately)
  - Conflict resolution (last-write-wins or merge strategy)
  - Batch operations for offline sync
  - Timestamp-based sync (sync only changed data)

#### 4.5.4 Migration from LocalStorage (Week 2-3)

- [ ] **Migration Service with Schema Versioning**:
  ```typescript
  // Client-side migration utility
  interface MigrationService {
    detectLocalStorageData(): boolean;
    getDataVersion(): number;
    exportLocalStorageData(): UserData;
    importToCloud(data: UserData): Promise<void>;
    clearLocalStorage(): void;
  }

  // Schema version tracking
  interface DataSchema {
    version: number; // Increment on schema changes
    tasks: Task[];
    progress: UserProgress;
    metadata: {
      createdAt: string;
      lastModified: string;
      schemaVersion: number;
    };
  }
  ```

- [ ] **Schema Migration System**:
  ```typescript
  // Migration functions for each schema version
  interface Migration {
    fromVersion: number;
    toVersion: number;
    migrate: (data: unknown) => unknown;
  }

  // Example: Adding new field to Task model
  const migrations: Migration[] = [
    {
      fromVersion: 1,
      toVersion: 2,
      migrate: (data: TaskV1[]): TaskV2[] => {
        // Add new 'priority' field with default value
        return data.map(task => ({
          ...task,
          priority: 'medium' // New field with default
        }));
      }
    },
    {
      fromVersion: 2,
      toVersion: 3,
      migrate: (data: TaskV2[]): TaskV3[] => {
        // Rename 'xpValue' to 'xpReward'
        return data.map(task => {
          const { xpValue, ...rest } = task;
          return {
            ...rest,
            xpReward: xpValue // Renamed field
          };
        });
      }
    }
  ];
  ```

- [ ] **Migration Flow**:
  1. User signs up/logs in
  2. Check for LocalStorage data
  3. **Detect schema version** from stored data
  4. **Run migration chain** if version mismatch:
     - Load data with current version
     - Apply migrations sequentially (v1→v2→v3→...→current)
     - Validate migrated data
  5. Prompt user: "We found existing data. Import to cloud?"
  6. Export LocalStorage data (after migration)
  7. Send to backend API with schema version info
  8. Backend validates and imports data
  9. Backend handles any server-side schema differences
  10. Clear LocalStorage (or keep as backup)
  11. Switch to cloud sync

- [ ] **Data Validation & Error Handling**:
  ```typescript
  interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: string[];
  }

  function validateData(data: unknown, schemaVersion: number): ValidationResult {
    // Validate data structure
    // Check required fields
    // Validate data types
    // Check data ranges (e.g., XP >= 0)
    // Return detailed validation results
  }
  ```
  - Validate exported data structure
  - Handle corrupted data gracefully
  - Preserve all user progress (XP, level, tasks)
  - **Backward compatibility**: Support multiple schema versions
  - **Migration rollback**: If migration fails, keep original data
  - **Partial migration**: Migrate what's possible, report failures

- [ ] **Backend Schema Migration**:
  - [ ] Database migrations (Prisma migrations)
  - [ ] API versioning for backward compatibility
  - [ ] Data transformation on import
  - [ ] Validation against current schema
  - [ ] Default values for missing fields

#### 4.5.5 Offline-First Architecture & PWA (Week 3)

- [ ] **PWA Setup**:

  **Web App Manifest** (`public/manifest.json`):
  ```json
  {
    "name": "HeroPath",
    "short_name": "HeroPath",
    "description": "Gamified task management",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#6366f1",
    "orientation": "portrait-primary",
    "icons": [
      {
        "src": "/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any maskable"
      }
    ],
    "categories": ["productivity", "games"],
    "screenshots": [
      {
        "src": "/screenshot-mobile.png",
        "sizes": "390x844",
        "type": "image/png",
        "form_factor": "narrow"
      }
    ]
  }
  ```

  **PWA Features**:
  - [ ] Install prompt (custom install button)
  - [ ] App icons (multiple sizes: 192x192, 512x512, maskable icons)
  - [ ] Splash screen
  - [ ] Standalone mode (no browser UI)
  - [ ] Add to home screen (iOS/Android)

- [ ] **Service Worker** (PWA):
  ```typescript
  // Service worker strategy: Network First, Cache Fallback
  // For API calls: Network First
  // For static assets: Cache First
  ```

  **Caching Strategy**:
  - [ ] Cache API responses (with expiration)
  - [ ] Cache static assets (CSS, JS, images)
  - [ ] Cache app shell (HTML, critical CSS/JS)
  - [ ] Queue offline actions
  - [ ] Background sync when online
  - [ ] Cache versioning for updates

  **Service Worker Features**:
  - [ ] Offline page fallback
  - [ ] Background sync for queued actions
  - [ ] Push notifications (optional, for future)
  - [ ] Update detection and prompt

- [ ] **Mobile PWA Optimizations**:
  - [ ] **iOS Safari PWA**:
    - [ ] Apple touch icons
    - [ ] Status bar styling (`apple-mobile-web-app-status-bar-style`)
    - [ ] Prevent bounce scrolling
    - [ ] Viewport fit cover for notched devices
  - [ ] **Android PWA**:
    - [ ] Maskable icons for adaptive icons
    - [ ] Shortcuts (quick actions from home screen)
    - [ ] Share target API (receive shared content)
  - [ ] **Performance**:
    - [ ] Lazy load images
    - [ ] Optimize images (WebP, responsive images)
    - [ ] Minimize JavaScript bundle
    - [ ] Preload critical resources

- [ ] **Client-Side Sync Manager**:
  ```typescript
  interface SyncManager {
    sync(): Promise<void>;
    isOnline(): boolean;
    queueAction(action: SyncAction): void;
    processQueue(): Promise<void>;
    resolveConflicts(): Promise<void>;
    getSyncStatus(): SyncStatus;
  }

  interface SyncAction {
    id: string;
    type: 'create' | 'update' | 'delete';
    entity: 'task' | 'progress';
    data: unknown;
    timestamp: number;
    retryCount: number;
  }
  ```

- [ ] **Hybrid Storage Strategy**:
  - LocalStorage: Cache + offline queue
  - IndexedDB: For larger data (optional, if LocalStorage insufficient)
  - Cloud: Source of truth
  - Sync on app start, on reconnect, periodically
  - **Conflict Resolution**:
    - Last-write-wins (with timestamp)
    - Or merge strategy (for progress data)
    - User prompt for critical conflicts

- [ ] **Offline UX**:
  - [ ] Offline indicator (banner/icon)
  - [ ] Show queued actions count
  - [ ] Disable online-only features gracefully
  - [ ] Offline mode messaging
  - [ ] Sync status indicator

#### 4.5.6 API Client Integration (Week 3-4)

- [ ] **API Client Service**:
  ```typescript
  // src/services/apiClient.ts
  class ApiClient {
    async getTasks(): Promise<Task[]>;
    async createTask(task: CreateTaskDto): Promise<Task>;
    async updateTask(id: string, updates: UpdateTaskDto): Promise<Task>;
    async deleteTask(id: string): Promise<void>;
    async syncProgress(progress: ProgressUpdate): Promise<UserProgress>;
  }
  ```

- [ ] **Store Integration**:
  - Update Zustand stores to use API client
  - Fallback to LocalStorage if offline
  - Optimistic updates with rollback on error

- [ ] **Error Handling**:
  - Network error handling
  - Retry logic with exponential backoff
  - User-friendly error messages
  - Offline indicator

#### 4.5.7 Testing & Security (Week 4)

- [ ] **Backend Tests**:
  - Unit tests for controllers
  - Integration tests for API endpoints
  - Database tests
  - Authentication tests

- [ ] **Security Audit**:
  - SQL injection prevention (Prisma handles this)
  - XSS prevention
  - CSRF protection
  - Rate limiting
  - Input validation
  - **API Key Security**: 
    - ✅ All API keys (OpenAI, etc.) in environment variables
    - ✅ Never expose keys to client-side code
    - ✅ Use serverless functions or backend proxy for AI calls
    - ✅ Implement API key rotation strategy
    - ✅ Monitor API usage and costs

- [ ] **Performance**:
  - Database indexing
  - Query optimization
  - API response caching
  - Connection pooling

### ✅ Definition of Done - Phase 4.5

- [ ] Backend API deployed and accessible
- [ ] User authentication working (register/login)
- [ ] All MVP features work with cloud backend
- [ ] **LocalStorage Migration**:
  - [ ] Migration flow working end-to-end
  - [ ] Schema versioning system implemented
  - [ ] Migration chain handles version upgrades
  - [ ] Data validation and error handling working
  - [ ] Backward compatibility for old schema versions
  - [ ] User data preserved during migration
- [ ] Multi-device sync working
- [ ] **PWA & Offline Support**:
  - [ ] Web App Manifest configured
  - [ ] Service Worker implemented
  - [ ] Offline functionality working
  - [ ] Install prompt working
  - [ ] App works in standalone mode
  - [ ] Mobile PWA optimizations (iOS/Android)
- [ ] All tests passing (backend + frontend)
- [ ] Security best practices implemented
  - [ ] API keys stored in environment variables (never in code)
  - [ ] AI service endpoints ready (for Phase 5.2)
  - [ ] Rate limiting implemented
- [ ] API documentation completed

### 🚨 Critical Notes

1. **Timing**: Bu faz **mutlaka** Phase 5 (Post-MVP features) öncesinde tamamlanmalı
2. **Collaborative Quests**: Backend olmadan imkansız - bu faz tamamlanmadan Phase 5.7'ye geçilmemeli
3. **AI Security**: AI özellikleri (Phase 5.2) için API key'ler **ASLA** client-side'da kullanılmamalı. Serverless functions veya backend proxy zorunludur.
4. **User Experience**: Migration sırasında kullanıcı verisi kaybedilmemeli
5. **Backward Compatibility**: Mevcut LocalStorage kullanıcıları için smooth migration

---

## Phase 5: Unique & Innovative Features (Post-MVP)

> **⚠️ Prerequisites**: 
> - Phase 4.5 (Backend & Cloud Data Persistence) **tamamlanmış olmalı**
> - Collaborative Quests (5.7) için backend zorunludur
> - AI-Powered Features (5.2) için backend/serverless functions zorunludur (API key güvenliği)

### 🚀 Market-Differentiating Features

These features set HeroPath apart from standard todo apps and create a unique value proposition.

### 📦 Innovative Feature Set

#### 5.1 Narrative Journey System ⭐⭐⭐⭐⭐

**What it is**: Each task is part of a larger story. Users progress through chapters, and completing tasks advances the narrative.

**Implementation**:

- [ ] **Story Chapters**:

  ```typescript
  interface StoryChapter {
    id: string;
    title: string;
    description: string;
    requiredTasks: number;
    completedTasks: number;
    unlocked: boolean;
    rewards: {
      xp: number;
      outfit?: string;
      title?: string;
    };
  }
  ```

- [ ] **Narrative Progression**:
  - Tasks grouped into story chapters
  - Chapter completion unlocks next chapter
  - Visual story map showing progress
  - Narrative text that evolves based on user choices

- [ ] **Story Visualization**:
  - Interactive journey map
  - Chapter completion animations
  - Story milestones celebration

**Why it's unique**: No todo app tells a story. Users become the hero of their own productivity journey.

---

#### 5.2 AI-Powered Task Suggestions ⭐⭐⭐⭐⭐

> **⚠️ Security Critical**: OpenAI API key'leri **ASLA** client-side'da kullanılmamalıdır. Tüm AI çağrıları backend üzerinden yapılmalıdır (Serverless Function veya Proxy sunucusu).

**What it is**: Intelligent task recommendations based on user behavior, time of day, and context.

**Implementation**:

- [ ] **Backend AI Service** (Required - Phase 4.5+):

  ```typescript
  // Backend: src/services/aiService.ts
  interface TaskSuggestion {
    title: string;
    description: string;
    suggestedDifficulty: 'easy' | 'medium' | 'hard';
    category: string;
    reasoning: string; // Why this task is suggested
    estimatedTime: number;
    contextFactors: string[]; // Time, weather, mood, etc.
  }

  // Backend endpoint - OpenAI API key server-side'da saklanır
  async function suggestTasks(
    userId: string,
    userHistory: Task[],
    currentTime: Date,
    userMood?: string
  ): Promise<TaskSuggestion[]> {
    // OpenAI API çağrısı backend'de yapılır
    // API key environment variable'dan alınır
  }
  ```

- [ ] **Backend API Endpoint**:
  ```typescript
  POST   /api/ai/suggest-tasks
  // Request body: { userHistory, currentTime, userMood? }
  // Response: { suggestions: TaskSuggestion[] }
  // Authentication: JWT token required
  ```

- [ ] **Serverless Function Option** (Alternative):
  ```typescript
  // Vercel/Netlify Serverless Function
  // api/ai/suggest-tasks.ts
  export default async function handler(req, res) {
    // Verify JWT token
    // Call OpenAI API with server-side key
    // Return suggestions
  }
  ```

- [ ] **Security Implementation**:
  - ✅ API key stored in environment variables (never in code)
  - ✅ Rate limiting per user
  - ✅ Request authentication (JWT)
  - ✅ Input validation & sanitization
  - ✅ Cost monitoring & limits
  - ❌ Never expose API key to client

- [ ] **Client-Side Integration**:
  ```typescript
  // Frontend: src/services/aiClient.ts
  class AIClient {
    async getTaskSuggestions(context: TaskContext): Promise<TaskSuggestion[]> {
      // Backend API'ye istek atar (API key yok)
      const response = await fetch('/api/ai/suggest-tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(context)
      });
      return response.json();
    }
  }
  ```

- [ ] **Context-Aware Suggestions**:
  - Time-based (morning routines, evening tasks)
  - Weather-based (indoor tasks on rainy days)
  - Mood-based (easier tasks when stressed)
  - Pattern recognition (frequently completed tasks)

- [ ] **Smart Task Generation**:
  - "I notice you often do X on Mondays, want to add it?"
  - "Based on your goals, here's a task that might help"
  - "You haven't done Y in a while, want to revisit it?"

- [ ] **Cost Optimization**:
  - Cache suggestions (avoid repeated API calls)
  - Batch requests when possible
  - Use cheaper models for simple suggestions
  - Implement request debouncing

**Why it's unique**: Proactive, intelligent assistance that learns from user behavior.

**Technical Requirements**:
- ✅ Backend API (Phase 4.5)
- ✅ Environment variable management
- ✅ Rate limiting
- ✅ Authentication middleware

---

#### 5.3 Emotional State Tracking ⭐⭐⭐⭐

**What it is**: Users can log their emotional state when completing tasks, creating emotional intelligence insights.

**Implementation**:

- [ ] **Emotional State System**:

  ```typescript
  interface EmotionalState {
    taskId: string;
    beforeState: 'excited' | 'anxious' | 'calm' | 'motivated' | 'tired';
    afterState:
      | 'satisfied'
      | 'accomplished'
      | 'relieved'
      | 'proud'
      | 'energized';
    timestamp: Date;
  }

  interface EmotionalInsights {
    mostProductiveMood: string;
    tasksThatBoostMood: Task[];
    moodPatterns: {
      timeOfDay: Record<string, string[]>;
      dayOfWeek: Record<string, string[]>;
    };
  }
  ```

- [ ] **Mood Visualization**:
  - Emotional journey timeline
  - Mood heatmap (by time/day)
  - Tasks that consistently improve mood
  - Personalized recommendations based on emotional patterns

- [ ] **Wellness Integration**:
  - Suggest breaks when stress detected
  - Recommend easier tasks when anxious
  - Celebrate emotional wins

**Why it's unique**: First todo app to track and optimize for emotional well-being, not just productivity.

---

#### 5.4 Visual Hero Character Progression ⭐⭐⭐⭐⭐

**What it is**: A visual character that evolves and changes appearance based on user progress, level, and achievements.

**Implementation**:

- [ ] **Character System**:

  ```typescript
  interface HeroCharacter {
    baseAppearance: string; // SVG or image path
    level: number;
    unlockedOutfits: Outfit[];
    currentOutfit: Outfit;
    accessories: Accessory[];
    animations: {
      idle: string;
      levelUp: string;
      taskComplete: string;
    };
  }

  interface Outfit {
    id: string;
    name: string;
    unlockLevel: number;
    unlockCondition: string;
    visual: string;
  }
  ```

- [ ] **Character Evolution**:
  - Character grows/evolves with level
  - Unlock new outfits at milestones
  - Accessories for achievements
  - Customizable character (name, colors)

- [ ] **Character Interactions**:
  - Character appears in celebrations
  - Motivational messages from character
  - Character reacts to task completion
  - Character shows in journey map

**Why it's unique**: Visual representation of progress creates emotional connection and motivation.

---

#### 5.5 Skill Tree System ⭐⭐⭐⭐

**What it is**: Tasks contribute to different skill categories, creating a visual skill tree that grows over time.

**Implementation**:

- [ ] **Skill Categories**:

  ```typescript
  interface SkillTree {
    productivity: Skill;
    creativity: Skill;
    health: Skill;
    learning: Skill;
    social: Skill;
    finance: Skill;
  }

  interface Skill {
    level: number;
    currentXP: number;
    xpToNextLevel: number;
    unlockedAbilities: string[];
    nextAbility: string;
  }
  ```

- [ ] **Task-Skill Mapping**:
  - Tasks automatically contribute to relevant skills
  - Users can manually assign skill categories
  - Skill-specific challenges and goals

- [ ] **Skill Visualization**:
  - Interactive skill tree UI
  - Skill level badges
  - Ability unlocks celebration
  - Skill-based recommendations

**Why it's unique**: RPG-style skill progression makes productivity feel like character development.

---

#### 5.6 Context-Aware Task Recommendations ⭐⭐⭐⭐

**What it is**: Tasks suggested based on real-world context: time, location, weather, calendar, and more.

**Implementation**:

- [ ] **Context Detection**:

  ```typescript
  interface Context {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    dayOfWeek: string;
    weather?: 'sunny' | 'rainy' | 'cold' | 'hot';
    location?: string; // If geolocation enabled
    calendarEvents?: CalendarEvent[];
    deviceActivity?: 'active' | 'idle';
  }

  function getContextualTasks(context: Context, availableTasks: Task[]): Task[];
  ```

- [ ] **Smart Recommendations**:
  - "It's 9 AM, perfect time for your morning routine"
  - "It's raining, here are some indoor tasks"
  - "You have a meeting in 30 min, here's a quick task"
  - "Weekend detected, suggesting lighter tasks"

- [ ] **Integration Points**:
  - Calendar integration (Google Calendar, etc.)
  - Weather API integration
  - Time-based task scheduling
  - Location-based suggestions (optional)

**Why it's unique**: Proactive, context-aware assistance that adapts to real life.

---

#### 5.7 Collaborative Quests ⭐⭐⭐

> **⚠️ Backend Required**: Bu özellik **mutlaka** Phase 4.5 (Backend & Cloud Data Persistence) tamamlandıktan sonra implement edilmelidir. LocalStorage tabanlı bir sistemde collaborative features imkansızdır.

**What it is**: Friends can join together to complete shared quests and challenges.

**Implementation**:

- [ ] **Quest System** (Backend API Required):

  ```typescript
  interface CollaborativeQuest {
    id: string;
    title: string;
    description: string;
    participants: string[]; // User IDs
    sharedTasks: Task[];
    progress: number;
    deadline?: Date;
    rewards: {
      xp: number;
      specialTitle?: string;
    };
  }
  ```

- [ ] **Backend API Endpoints**:
  ```typescript
  POST   /api/quests                    // Create quest
  GET    /api/quests                    // List available quests
  GET    /api/quests/:id                // Get quest details
  POST   /api/quests/:id/join           // Join quest
  POST   /api/quests/:id/leave          // Leave quest
  GET    /api/quests/:id/progress       // Get quest progress
  POST   /api/quests/:id/complete-task  // Complete shared task
  ```

- [ ] **Real-time Updates** (Optional - WebSocket):
  - Live progress updates
  - Participant notifications
  - Quest completion celebrations

- [ ] **Social Features**:
  - Friend system (optional, privacy-focused)
  - Shared quest boards
  - Progress comparison (opt-in)
  - Team achievements

- [ ] **Privacy-First Design**:
  - All social features opt-in
  - No data sharing without consent
  - User controls visibility settings

**Why it's unique**: Social productivity without compromising privacy.

**Technical Requirements**:
- ✅ Backend API (Phase 4.5)
- ✅ User authentication
- ✅ Real-time sync (WebSocket optional)
- ✅ Database relationships (Quest ↔ Users)

---

#### 5.8 Visual Journey Map ⭐⭐⭐⭐⭐

**What it is**: An interactive, visual map showing the user's productivity journey with landmarks, milestones, and paths.

**Implementation**:

- [ ] **Journey Map System**:

  ```typescript
  interface JourneyMap {
    currentLocation: MapNode;
    visitedNodes: MapNode[];
    unlockedPaths: Path[];
    landmarks: Landmark[];
  }

  interface MapNode {
    id: string;
    position: { x: number; y: number };
    type: 'task' | 'milestone' | 'chapter' | 'achievement';
    unlocked: boolean;
    visual: string;
  }

  interface Landmark {
    id: string;
    name: string;
    description: string;
    unlockLevel: number;
    visual: string;
  }
  ```

- [ ] **Map Features**:
  - Interactive SVG/Canvas map
  - Zoom and pan
  - Animated path progression
  - Landmark discovery animations
  - Different map themes per level range

- [ ] **Map Progression**:
  - New areas unlock with levels
  - Special landmarks for achievements
  - Visual representation of skill tree on map
  - Character appears on map

**Why it's unique**: Visual storytelling of productivity journey creates long-term engagement.

---

#### 5.9 Dynamic Difficulty Adjustment ⭐⭐⭐

**What it is**: System learns user patterns and automatically adjusts task difficulty and XP rewards.

**Implementation**:

- [ ] **Adaptive System**:

  ```typescript
  interface DifficultyProfile {
    userId: string;
    averageCompletionTime: Record<string, number>;
    successRate: Record<string, number>;
    preferredDifficulty: 'easy' | 'medium' | 'hard';
    suggestedDifficulty: 'easy' | 'medium' | 'hard';
  }

  function calculateAdaptiveXP(
    baseXP: number,
    userProfile: DifficultyProfile,
    taskHistory: Task[]
  ): number;
  ```

- [ ] **Learning Algorithm**:
  - Tracks completion times
  - Monitors success rates
  - Adjusts XP multipliers
  - Suggests optimal difficulty

- [ ] **User Control**:
  - Users can override suggestions
  - Manual difficulty selection always available
  - Transparency in difficulty calculations

**Why it's unique**: Personalized difficulty that grows with the user.

---

#### 5.10 Time-Based Challenges & Events ⭐⭐⭐⭐

**What it is**: Limited-time challenges, seasonal events, and time-sensitive quests that create urgency and excitement.

**Implementation**:

- [ ] **Challenge System**:

  ```typescript
  interface TimeChallenge {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    requiredTasks: Task[];
    rewards: {
      xp: number;
      exclusiveOutfit?: string;
      specialTitle?: string;
    };
    progress: number;
  }
  ```

- [ ] **Event Types**:
  - Daily challenges
  - Weekly quests
  - Seasonal events (holidays, etc.)
  - Personal milestones
  - Community challenges (if social features enabled)

- [ ] **Challenge Features**:
  - Countdown timers
  - Progress tracking
  - Exclusive rewards
  - Celebration on completion

**Why it's unique**: Creates engagement through time-sensitive content and FOMO (healthy version).

---

#### 5.11 Real-World Habit Integration ⭐⭐⭐

**What it is**: Connect with real-world habits, health apps, and life goals beyond just tasks.

**Implementation**:

- [ ] **Integration Points**:
  - Health apps (steps, workouts)
  - Calendar apps (meetings, events)
  - Finance apps (budget goals)
  - Learning platforms (courses, reading)

- [ ] **Habit Tracking**:

  ```typescript
  interface Habit {
    id: string;
    name: string;
    type: 'daily' | 'weekly' | 'custom';
    target: number;
    current: number;
    linkedTasks: string[]; // Task IDs
    integration?: {
      type: 'health' | 'calendar' | 'finance' | 'learning';
      source: string;
    };
  }
  ```

- [ ] **Cross-Platform Sync**:
  - Optional API integrations
  - Privacy-first design
  - Local-first, sync optional

**Why it's unique**: Bridges digital productivity with real-world life goals.

---

#### 5.12 Story Mode & Narrative Choices ⭐⭐⭐⭐⭐

**What it is**: Tasks are part of an interactive story where user choices affect the narrative and outcomes.

**Implementation**:

- [ ] **Narrative System**:

  ```typescript
  interface NarrativeChoice {
    id: string;
    prompt: string;
    options: ChoiceOption[];
    consequences: {
      xp: number;
      storyBranch: string;
      characterChange?: string;
    };
  }

  interface StoryBranch {
    id: string;
    title: string;
    description: string;
    requiredChoices: string[];
    unlocked: boolean;
  }
  ```

- [ ] **Interactive Storytelling**:
  - Multiple story paths
  - Choice consequences
  - Branching narratives
  - Replayability (different paths)

- [ ] **Story Integration**:
  - Tasks unlock story chapters
  - Choices affect available tasks
  - Character development through story
  - Multiple endings based on productivity patterns

**Why it's unique**: First productivity app with interactive storytelling that makes task completion feel like an adventure.

---

### 🎯 Implementation Priority

**⚠️ CRITICAL - Must Complete Before Phase 5**

**Phase 4.5 - Backend & Cloud Data Persistence** (Month 2, Week 1-4)
- **MUST** be completed before any Phase 5 features
- Required for: Collaborative Quests, Multi-device sync, Data persistence
- Without this, users lose all data on browser clear/device switch

**Phase 5.1 - High Priority (Month 2-3, After Phase 4.5)**

1. Visual Hero Character Progression
2. Skill Tree System
3. Narrative Journey System (basic)

**Phase 5.2 - Medium Priority (Month 3-4)**

4. **AI-Powered Task Suggestions** (Requires Phase 4.5 ✅ + Serverless/Backend for API key security)
5. Visual Journey Map
6. Emotional State Tracking

**Phase 5.3 - Future Enhancements (Month 4+)**

7. Context-Aware Recommendations
8. Time-Based Challenges
9. **Collaborative Quests** (Requires Phase 4.5 ✅)
10. Dynamic Difficulty Adjustment
11. Real-World Habit Integration
12. Story Mode & Narrative Choices

---

## Technical Competency Goals

### 🎯 Muscles to Strengthen in This Project

#### 1. **State Management Architecture** ⭐⭐⭐⭐⭐

- **Goal**: Scalable and maintainable state management
- **Learnings**:
  - Modern state management with Zustand/Jotai
  - Store organization patterns
  - Middleware usage (persistence, logging)
  - Type-safe state management

#### 2. **TypeScript Mastery** ⭐⭐⭐⭐⭐

- **Goal**: Type-safe, error-free code
- **Learnings**:
  - Advanced TypeScript patterns
  - Generic types
  - Utility types
  - Type inference optimization

#### 3. **Component Architecture** ⭐⭐⭐⭐

- **Goal**: Reusable, maintainable component structure
- **Learnings**:
  - Feature-based folder structure
  - Component composition
  - Custom hooks patterns
  - Props design

#### 4. **Performance Optimization** ⭐⭐⭐⭐

- **Goal**: Fast and responsive application
- **Learnings**:
  - React performance best practices
  - Bundle optimization
  - Lazy loading
  - Memoization strategies

#### 5. **Data Persistence** ⭐⭐⭐

- **Goal**: Reliable data storage
- **Learnings**:
  - LocalStorage best practices
  - Data migration strategies
  - Error handling
  - Data validation

#### 5.5. **Backend Development** ⭐⭐⭐⭐⭐ (Phase 4.5)

- **Goal**: Full-stack development with cloud persistence
- **Learnings**:
  - Node.js/Express API development
  - PostgreSQL database design
  - RESTful API design
  - Authentication & authorization (JWT)
  - Database migrations
  - API testing
  - Security best practices
  - Offline-first architecture
  - Data synchronization strategies

#### 6. **AI/ML Integration** ⭐⭐⭐⭐ (Post-MVP)

- **Goal**: Intelligent features
- **Learnings**:
  - API integration (OpenAI, etc.)
  - Context processing
  - Recommendation algorithms
  - Privacy-first AI

#### 7. **Mobile & PWA Development** ⭐⭐⭐⭐ (Phase 2.3, 4.5.5)

- **Goal**: Native-like mobile experience
- **Learnings**:
  - Mobile-first responsive design
  - Touch interactions and gestures
  - PWA implementation (Service Worker, Manifest)
  - Offline-first architecture
  - Mobile performance optimization
  - iOS/Android PWA specific features
  - App installation and update flows

#### 8. **Data Migration & Schema Evolution** ⭐⭐⭐⭐ (Phase 4.5.4)

- **Goal**: Safe data migration without data loss
- **Learnings**:
  - Schema versioning strategies
  - Migration chain implementation
  - Backward compatibility patterns
  - Data validation and error handling
  - Rollback strategies
  - Database migration tools (Prisma)

#### 9. **Advanced Animations** ⭐⭐⭐ (Post-MVP)

- **Goal**: Delightful user experience
- **Learnings**:
  - Framer Motion advanced patterns
  - SVG animations
  - Canvas rendering
  - Performance optimization for animations

---

## UX & Value Goals

### 🎯 Primary Emotion Users Should Feel

**"Accomplished and Progressed"** + **"Entertained"**

### 🎨 UX Principles

#### 1. **Progress Visibility** (Progress Visibility)

- User should always know where they are
- XP bar, level badge, statistics always visible
- Instant feedback when task is completed

#### 2. **Instant Gratification** (Instant Reward)

- When task is completed:
  - ✅ Checkmark animation
  - 💎 XP popup
  - 📊 Progress bar update
  - 🎉 Level up celebration (if applicable)
  - 🎭 Character reaction

#### 3. **Visual Delight** (Visual Pleasure)

- Modern, clean UI
- Smooth animations
- Colorful and vibrant design
- Micro-interactions

#### 4. **Sense of Achievement** (Achievement Feeling)

- Level ups should be specially celebrated
- Milestones should be highlighted
- Statistics dashboard to view past achievements
- Visual character progression

#### 5. **Effortless Experience** (Frictionless Usage)

- Quick task addition (minimal clicks)
- Keyboard shortcuts (optional)
- Smooth transitions
- No friction

#### 6. **Emotional Connection** (Emotional Bond)

- Character that users care about
- Story that users want to continue
- Personal journey visualization
- Emotional state awareness

### 📊 Success Metrics (Post-MVP)

- Daily Active Users (DAU)
- Task completion rate
- Average session duration
- User retention (7-day, 30-day)
- Emotional state improvement
- Skill tree progression
- Story chapter completion rate

---

## MVP Definition of Done

### ✅ Required Features (Must Have)

#### Core Functionality

- [ ] Task addition (title, description, XP value, difficulty)
- [ ] Task deletion
- [ ] Task completion (toggle)
- [ ] Task editing (optional but recommended)

#### Gamification

- [ ] XP system (earn XP when task completed)
- [ ] Level system (level calculation based on XP)
- [ ] Progress bar (current XP / next level XP)
- [ ] Level badge display

#### Data Persistence

- [ ] LocalStorage integration
- [ ] Data preserved on page refresh
- [ ] Error handling (quota exceeded, etc.)

#### UI/UX

- [ ] Modern, responsive design
- [ ] Basic animations
- [ ] Empty states
- [ ] Error states
- [ ] Loading states

### 🎁 Nice to Have (Post-MVP)

#### Phase 5 Features (Unique & Innovative)

- [ ] Visual Hero Character Progression
- [ ] Skill Tree System
- [ ] Narrative Journey System
- [ ] AI-Powered Task Suggestions
- [ ] Emotional State Tracking
- [ ] Visual Journey Map
- [ ] Context-Aware Recommendations
- [ ] Time-Based Challenges
- [ ] Collaborative Quests
- [ ] Dynamic Difficulty Adjustment
- [ ] Real-World Habit Integration
- [ ] Story Mode & Narrative Choices

#### Standard Enhancements

- [ ] Dark mode
- [ ] Task categories/tags
- [ ] Task priority levels
- [ ] Due dates
- [ ] Daily goals
- [ ] Streak tracking
- [ ] Achievement system
- [ ] Statistics dashboard
- [ ] Export/Import data
- [ ] Keyboard shortcuts
- [ ] Sound effects
- [ ] Confetti animations
- [ ] Task search/filter
- [ ] Task sorting

---

## 📅 Weekly Milestones

### Week 1 Milestone

- [ ] Project setup completed
- [ ] Design system ready
- [ ] Base components created
- [ ] State management set up

### Week 2 Milestone

- [ ] Task add/delete working
- [ ] LocalStorage integration completed
- [ ] Basic UI/UX flows ready

### Week 3 Milestone

- [ ] XP system working
- [ ] Level system implemented
- [ ] Progress visualization completed

### Week 4 Milestone

- [ ] Code quality improved
- [ ] Testing completed
- [ ] Production deployment done

### Post-MVP Milestones

- [ ] Unique features implementation
- [ ] Market differentiation achieved
- [ ] User engagement optimization

---

## 🛠️ Technology Stack

### Frontend (MVP)

- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling

### State Management

- **Zustand** - State management (with LocalStorage persistence)

### Development Tools

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

### Frontend Deployment (MVP)

- **Vercel** (Recommended) - Hosting

### Backend (Phase 4.5 - Required for Post-MVP)

- **Node.js** - Runtime
- **Express** or **Fastify** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM (type-safe database access)
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Backend Deployment (Phase 4.5)

- **Railway** (Recommended - easy PostgreSQL + Node.js)
- **Render** - Alternative option
- **Fly.io** - Alternative option
- **AWS** - Enterprise option

### AI Service Deployment Options (Phase 5.2)

- **Vercel Serverless Functions** (Recommended for frontend on Vercel)
  - Edge functions for low latency
  - Environment variables for API keys
  - Built-in rate limiting
- **Netlify Functions** (If using Netlify)
- **Backend API Endpoint** (If using Railway/Render)
  - Dedicated `/api/ai/*` routes
  - More control over caching and rate limiting

### PWA & Mobile (Phase 4.5.5)

- **Workbox** (Recommended) - Service Worker library
- **vite-plugin-pwa** - PWA plugin for Vite
- **Web App Manifest** - PWA configuration
- **IndexedDB** (Optional) - For larger offline storage if needed

### Optional Frontend Libraries

- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Schema validation (already in use)
- **OpenAI API** - AI features (Post-MVP)
- **Canvas API** - Journey map rendering (Post-MVP)
- **SVG** - Character and map visuals (Post-MVP)
- **WebSocket** (Socket.io) - Real-time features (Post-MVP)

### Mobile Development Tools

- **Chrome DevTools** - Mobile device emulation
- **Lighthouse** - PWA audit
- **WebPageTest** - Mobile performance testing
- **BrowserStack / Sauce Labs** - Real device testing (optional)

---

## 📚 Learning Resources

### State Management

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Jotai Documentation](https://jotai.org/)

### React Best Practices

- [React Beta Docs](https://react.dev/)
- [Kent C. Dodds Blog](https://kentcdodds.com/blog)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Performance

- [Web.dev Performance](https://web.dev/performance/)

### Backend Development (Phase 4.5)

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT Authentication Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [REST API Design](https://restfulapi.net/)
- [Database Design Principles](https://www.postgresql.org/docs/current/ddl.html)

### AI Integration

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [AI Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [OpenAI API Security Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [Serverless Functions Security](https://vercel.com/docs/functions/security)
- [API Key Management Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/API_Security_Cheat_Sheet.html)
- **Critical**: Never expose API keys in client-side code. Always use backend/serverless functions.

### Game Design & Gamification

- [Gamification Design Patterns](https://www.gamified.uk/gamification-examples/)
- [Game Design Principles](https://www.gamedeveloper.com/design)

### PWA & Mobile Development

- [PWA Documentation (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Mobile-First Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Touch Events API](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [iOS PWA Best Practices](https://webkit.org/blog/8042/progressive-web-apps/)
- [Android PWA Best Practices](https://web.dev/add-to-home-screen/)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

### Data Migration & Schema Versioning

- [Database Migration Best Practices](https://www.prisma.io/docs/guides/migrate)
- [Schema Evolution Strategies](https://martinfowler.com/articles/evodb.html)
- [Data Versioning Patterns](https://www.martinfowler.com/articles/schemaless/)

---

## 🎯 Conclusion

This roadmap contains all the steps needed to complete the HeroPath MVP in **1 month**, plus a comprehensive plan for **unique, market-differentiating features** that set HeroPath apart from standard todo applications.

Each phase builds upon the previous one, and each week ends with a working, deployable increment.

**Agile approach** ensures testable, deployable increments at the end of each week.

### ⚠️ Critical Architecture Note

**Phase 4.5 (Backend & Cloud Data Persistence)** is **mandatory** before implementing Post-MVP features. The MVP uses LocalStorage, which means:
- ❌ Users lose data on browser clear
- ❌ No multi-device sync
- ❌ Collaborative features impossible
- ❌ Data not backed up

**Phase 4.5 solves these issues** and enables:
- ✅ Cloud persistence
- ✅ Multi-device sync
- ✅ User accounts
- ✅ Collaborative Quests
- ✅ Data backup & recovery

### 🚀 Unique Features (Phase 5)

The unique features in Phase 5 create a compelling value proposition that no other todo app offers:

- Narrative storytelling
- Visual character progression
- Emotional intelligence
- AI-powered assistance
- Skill-based development
- Interactive journey maps
- **Collaborative Quests** (requires Phase 4.5)

**Good luck! 🚀**
