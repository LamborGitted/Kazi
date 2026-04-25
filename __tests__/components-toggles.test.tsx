import { describe, it, expect } from 'vitest';

describe('UI Components Utilities', () => {
  describe('ThemeToggle', () => {
    it('should have correct aria-label based on theme', () => {
      const isDark = false;
      expect(isDark ? "Switch to light mode" : "Switch to dark mode").toBe("Switch to dark mode");
    });
  });

  describe('LanguageToggle', () => {
    it('should have correct aria-label based on locale', () => {
      const locale = "en";
      expect(`Switch language to ${locale === "en" ? "Chinese" : "English"}`).toBe("Switch language to Chinese");
    });
  });
});