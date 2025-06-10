import { Injectable } from '@angular/core';
import { Module } from '../../models/course.model';
import { FundamentalsModule } from './modules/fundamentals.module';
import { ControlFlowModule } from './modules/control-flow.module';
import { DataStructuresModule } from './modules/data-structures.module';
import { FunctionsModule } from './modules/functions.module';
import { ExceptionHandlingModule } from './modules/exception-handling.module';
import { FileOperationsModule } from './modules/file-operations.module';
import { ObjectOrientedModule } from './modules/object-oriented.module';
import { ProjectsModule } from './modules/projects.module';
import { WebScrapingModule } from './modules/web-scraping.module';
import { DataVisualizationModule } from './modules/data-visualization.module';
import { DatabaseOperationsModule } from './modules/database-operations.module';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {

  constructor(
    private fundamentalsModule: FundamentalsModule,
    private controlFlowModule: ControlFlowModule,
    private dataStructuresModule: DataStructuresModule,
    private functionsModule: FunctionsModule,
    private exceptionHandlingModule: ExceptionHandlingModule,
    private fileOperationsModule: FileOperationsModule,
    private objectOrientedModule: ObjectOrientedModule,
    private projectsModule: ProjectsModule,
    private webScrapingModule: WebScrapingModule,
    private dataVisualizationModule: DataVisualizationModule,
    private databaseOperationsModule: DatabaseOperationsModule
  ) {}

  /**
   * 获取所有课程模块
   */
  getAllModules(): Module[] {
    return [
      this.fundamentalsModule.getModule(),
      this.controlFlowModule.getModule(),
      this.dataStructuresModule.getModule(),
      this.functionsModule.getModule(),
      this.exceptionHandlingModule.getModule(),
      this.fileOperationsModule.getModule(),
      this.objectOrientedModule.getModule(),
      this.projectsModule.getModule(),
      this.webScrapingModule.getModule(),
      this.dataVisualizationModule.getModule(),
      this.databaseOperationsModule.getModule()
    ];
  }

  /**
   * 根据ID获取特定模块
   */
  getModuleById(moduleId: string): Module | null {
    const modules = this.getAllModules();
    return modules.find(module => module.id === moduleId) || null;
  }
}
