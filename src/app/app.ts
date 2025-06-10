import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected title = 'python-learning-platform';
  sidebarOpen = false;

  private navigationSubscription?: Subscription;
  private isBrowser: boolean;

  constructor(
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // 订阅导航服务的侧边栏状态
    this.navigationSubscription = this.navigationService.sidebarOpen$.subscribe(
      isOpen => {
        this.sidebarOpen = isOpen;

        if (this.isBrowser) {
          // 防止背景滚动
          document.body.style.overflow = isOpen ? 'hidden' : '';
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.navigationSubscription?.unsubscribe();

    if (this.isBrowser) {
      // 清理样式
      document.body.style.overflow = '';
    }
  }

  closeSidebar(): void {
    this.navigationService.closeSidebar();
  }

  // 监听ESC键关闭侧边栏
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.sidebarOpen) {
      this.closeSidebar();
      event.preventDefault();
    }
  }

  // 监听窗口大小变化
  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isBrowser && window.innerWidth > 768 && this.sidebarOpen) {
      // 在大屏幕上自动关闭移动端侧边栏
      this.closeSidebar();
    }
  }
}
