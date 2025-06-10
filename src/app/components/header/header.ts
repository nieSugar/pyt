import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ThemeService, Theme } from '../../services/theme';
import { ProgressService } from '../../services/progress.service';
import { NotificationService } from '../../services/notification.service';
import { KeyboardShortcutsService } from '../../services/keyboard-shortcuts.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  mobileMenuOpen = false;
  showProgress = false;
  progressText = '';
  progressPercentage = 0;
  currentRoute = '';

  private themeSubscription?: Subscription;
  private routerSubscription?: Subscription;
  private progressSubscription?: Subscription;
  private isBrowser: boolean;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private progressService: ProgressService,
    private notificationService: NotificationService,
    private keyboardShortcuts: KeyboardShortcutsService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // 主题订阅
    this.themeSubscription = this.themeService.currentTheme$.subscribe(
      theme => this.currentTheme = theme
    );

    // 路由订阅
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.closeMobileMenu();
      });

    // 进度订阅
    this.progressSubscription = this.progressService.overallProgress$.subscribe(
      progress => {
        this.showProgress = progress.totalLessons > 0;
        this.progressPercentage = progress.percentage;
        this.progressText = `${progress.completedLessons}/${progress.totalLessons}`;
      }
    );

    // 注册键盘快捷键
    this.registerKeyboardShortcuts();
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
    this.progressSubscription?.unsubscribe();
  }

  // 主题相关
  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.notificationService.showSuccess(
      `已切换到${this.isDarkMode ? '浅色' : '深色'}主题`,
      '主题切换'
    );
  }

  get isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  get themeIcon(): string {
    return this.isDarkMode ? 'light_mode' : 'dark_mode';
  }

  get themeTooltip(): string {
    return this.isDarkMode ? '切换到浅色主题' : '切换到深色主题';
  }

  // 移动端菜单
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (this.isBrowser) {
      // 防止背景滚动
      document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;

    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  // 路由检查
  isCurrentRoute(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }

  // 进度相关
  get progressCircumference(): number {
    return 2 * Math.PI * 10; // r=10
  }

  get progressOffset(): number {
    const circumference = this.progressCircumference;
    return circumference - (this.progressPercentage / 100) * circumference;
  }

  // 用户操作
  openProfile(): void {
    this.notificationService.showInfo('个人资料功能即将推出', '敬请期待');
  }

  openSettings(): void {
    this.notificationService.showInfo('设置功能即将推出', '敬请期待');
  }

  showHelp(): void {
    this.showKeyboardShortcuts();
  }

  showAbout(): void {
    this.notificationService.showInfo(
      'Python学习平台 v1.0.0\n一个现代化的交互式编程学习平台',
      '关于我们'
    );
  }

  showKeyboardShortcuts(): void {
    this.keyboardShortcuts.showShortcutsDialog();
  }

  // 键盘快捷键
  private registerKeyboardShortcuts(): void {
    this.keyboardShortcuts.register([
      {
        key: 'F1',
        description: '显示帮助',
        callback: () => this.showKeyboardShortcuts()
      },
      {
        key: 'ctrl+p',
        description: '打开个人资料',
        callback: () => this.openProfile()
      },
      {
        key: 'ctrl+comma',
        description: '打开设置',
        callback: () => this.openSettings()
      },
      {
        key: 'alt+h',
        description: '返回首页',
        callback: () => this.router.navigate(['/home'])
      }
    ]);
  }

  // 监听ESC键关闭移动端菜单
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
      event.preventDefault();
    }
  }

  // 监听点击外部关闭移动端菜单
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const mobileMenu = target.closest('.mobile-nav');
    const menuToggle = target.closest('.mobile-menu-toggle');

    if (this.mobileMenuOpen && !mobileMenu && !menuToggle) {
      this.closeMobileMenu();
    }
  }
}
