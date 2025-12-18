export interface HeroCharacter {
  level: number;
  appearance: string; // Character visual state
  unlockedOutfits: string[];
  currentOutfit: string;
}

export interface SkillTree {
  productivity: number;
  creativity: number;
  health: number;
  learning: number;
  social: number;
}

export interface UserProgress {
  level: number;
  currentXP: number;
  totalXP: number;
  xpToNextLevel: number;
  completedTasksCount: number;
  streak: number;
  heroCharacter: HeroCharacter; // Visual character progression
  skillTree: SkillTree; // Skill development system
}
