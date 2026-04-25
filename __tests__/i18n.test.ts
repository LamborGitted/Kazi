import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { t, getTranslations } from '../config/i18n/translations';
import { defaultLocale, localeNames, type Locale } from '../config/i18n/locales';

describe('i18n locales', () => {
  it('has correct defaultLocale', () => {
    expect(defaultLocale).toBe('en');
  });

  it('has correct localeNames', () => {
    expect(localeNames.en).toBe('EN');
    expect(localeNames.zh).toBe('中文');
  });

  it('has valid Locale type', () => {
    const locales: Locale[] = ['en', 'zh'];
    expect(locales).toContain('en');
    expect(locales).toContain('zh');
  });
});

describe('i18n translations', () => {
  describe('getTranslations', () => {
    it('returns English translations for en', () => {
      const translations = getTranslations('en');
      expect(translations.nav.home).toBe('HOME');
      expect(translations.base.title).toBe('Lantxx Personal Homepage');
    });

    it('returns Chinese translations for zh', () => {
      const translations = getTranslations('zh');
      expect(translations.nav.home).toBe('HOME');
      expect(translations.base.title).toBe('Lantxx 个人主页');
    });
  });

  describe('t function', () => {
    it('translates nested path en', () => {
      expect(t('en', 'nav.home')).toBe('HOME');
      expect(t('en', 'nav.blog')).toBe('BLOG');
    });

    it('translates nested path zh', () => {
      expect(t('zh', 'nav.home')).toBe('HOME');
      expect(t('zh', 'about.whoAmI')).toBe('我是谁');
    });

    it('returns path as fallback for invalid key', () => {
      expect(t('en', 'invalid.path')).toBe('invalid.path');
      expect(t('en', 'nav.nonexistent')).toBe('nav.nonexistent');
    });

    it('translates hero subtitle', () => {
      expect(t('en', 'hero.subtitle')).toBe('Endless Curiosity, Boundless Creation');
      expect(t('zh', 'hero.subtitle')).toBe('认知无限，创造无穷');
    });

    it('translates contact form fields', () => {
      expect(t('en', 'contact.name')).toBe('Name');
      expect(t('zh', 'contact.name')).toBe('姓名');
      expect(t('en', 'contact.email')).toBe('Email');
      expect(t('zh', 'contact.email')).toBe('邮箱');
    });

    it('falls back to defaultLocale for missing translations', () => {
      expect(t('fr', 'nav.home')).toBe('HOME');
    });
  });
});