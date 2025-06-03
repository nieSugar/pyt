import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
    document.documentElement.classList.remove('dark-theme', 'light-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light theme by default', () => {
    expect(service.isDarkMode()).toBe(false);
  });

  it('should toggle theme', () => {
    // Initially light mode
    expect(service.isDarkMode()).toBe(false);
    
    // Toggle to dark mode
    service.toggleTheme();
    expect(service.isDarkMode()).toBe(true);
    
    // Toggle back to light mode
    service.toggleTheme();
    expect(service.isDarkMode()).toBe(false);
  });

  it('should set dark theme', () => {
    service.setTheme('dark');
    expect(service.isDarkMode()).toBe(true);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
  });

  it('should set light theme', () => {
    // First set to dark
    service.setTheme('dark');
    expect(service.isDarkMode()).toBe(true);

    // Then set to light
    service.setTheme('light');
    expect(service.isDarkMode()).toBe(false);
    expect(document.documentElement.classList.contains('light-theme')).toBe(true);
  });

  it('should persist theme preference in localStorage', () => {
    // Set dark mode
    service.setTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    // Set light mode
    service.setTheme('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should load theme from localStorage on initialization', () => {
    // Set dark theme in localStorage
    localStorage.setItem('theme', 'dark');

    // Create new service instance
    const newService = new ThemeService();
    expect(newService.isDarkMode()).toBe(true);
  });

  it('should handle invalid localStorage values', () => {
    // Set invalid theme in localStorage
    localStorage.setItem('theme', 'invalid');

    // Create new service instance - should default to light
    const newService = new ThemeService();
    expect(newService.isDarkMode()).toBe(false);
  });

  it('should emit theme changes', () => {
    let emittedValue: string | undefined;

    service.currentTheme$.subscribe((theme: string) => {
      emittedValue = theme;
    });

    service.setTheme('dark');
    expect(emittedValue).toBe('dark');

    service.setTheme('light');
    expect(emittedValue).toBe('light');
  });

  it('should apply theme class to document element', () => {
    service.setTheme('dark');
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
    expect(document.documentElement.classList.contains('light-theme')).toBe(false);

    service.setTheme('light');
    expect(document.documentElement.classList.contains('light-theme')).toBe(true);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
  });

  it('should get current theme as string', () => {
    expect(service.getCurrentTheme()).toBe('light');

    service.setTheme('dark');
    expect(service.getCurrentTheme()).toBe('dark');
  });

  it('should handle multiple theme changes', () => {
    const changes: string[] = [];

    service.currentTheme$.subscribe((theme: string) => {
      changes.push(theme);
    });

    service.toggleTheme(); // to dark
    service.toggleTheme(); // to light
    service.toggleTheme(); // to dark

    expect(changes).toEqual(['light', 'dark', 'light', 'dark']);
  });
});
