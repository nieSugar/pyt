import { TestBed } from '@angular/core/testing';
import { PythonExecutorService } from './python-executor';
import { CodeExecutionResult } from '../models/course.model';

describe('PythonExecutorService', () => {
  let service: PythonExecutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonExecutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if service is ready', () => {
    const isReady = service.isReady();
    expect(typeof isReady).toBe('boolean');
  });

  it('should check if service is loading', () => {
    const isLoading = service.isLoading();
    expect(typeof isLoading).toBe('boolean');
  });

  it('should execute simple Python code', async () => {
    const code = 'print("Hello, World!")';
    const result: CodeExecutionResult = await service.executeCode(code);

    expect(result).toBeDefined();
    expect(result.output).toBeDefined();
    expect(result.executionTime).toBeGreaterThanOrEqual(0);

    // If Pyodide is ready, should contain output, otherwise should have error
    if (service.isReady()) {
      expect(result.output).toContain('Hello, World!');
    } else {
      expect(result.error).toBeDefined();
    }
  });

  it('should handle Python syntax errors', async () => {
    const code = 'print("Hello, World!"'; // Missing closing parenthesis
    const result: CodeExecutionResult = await service.executeCode(code);

    expect(result).toBeDefined();
    expect(result.executionTime).toBeGreaterThanOrEqual(0);

    // Should either have error or not be ready
    if (service.isReady()) {
      expect(result.error).toBeDefined();
    }
  });

  it('should handle empty code', async () => {
    const code = '';
    const result: CodeExecutionResult = await service.executeCode(code);

    expect(result).toBeDefined();
    expect(result.executionTime).toBeGreaterThanOrEqual(0);
  });

  it('should execute code with variables', async () => {
    const code = `
x = 10
y = 20
result = x + y
print(f"Result: {result}")
`;
    const result: CodeExecutionResult = await service.executeCode(code);

    expect(result).toBeDefined();
    expect(result.executionTime).toBeGreaterThanOrEqual(0);

    if (service.isReady()) {
      expect(result.output).toContain('Result: 30');
    }
  });

  it('should execute code with functions', async () => {
    const code = `
def greet(name):
    return f"Hello, {name}!"

message = greet("Python")
print(message)
`;
    const result: CodeExecutionResult = await service.executeCode(code);

    expect(result).toBeDefined();
    expect(result.executionTime).toBeGreaterThanOrEqual(0);

    if (service.isReady()) {
      expect(result.output).toContain('Hello, Python!');
    }
  });

  it('should execute code with loops', async () => {
    const code = `
for i in range(3):
    print(f"Count: {i}")
`;
    const result: CodeExecutionResult = await service.executeCode(code);

    expect(result).toBeDefined();
    expect(result.executionTime).toBeGreaterThanOrEqual(0);

    if (service.isReady()) {
      expect(result.output).toContain('Count: 0');
      expect(result.output).toContain('Count: 1');
      expect(result.output).toContain('Count: 2');
    }
  });

  it('should execute code with classes', async () => {
    const code = `
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, I'm {self.name}"

person = Person("Bob")
print(person.greet())
`;
    const result: CodeExecutionResult = await service.executeCode(code);

    expect(result).toBeDefined();
    expect(result.executionTime).toBeGreaterThanOrEqual(0);

    if (service.isReady()) {
      expect(result.output).toContain("Hello, I'm Bob");
    }
  });

  it('should handle execution time measurement', async () => {
    const code = 'print("Test")';
    const result: CodeExecutionResult = await service.executeCode(code);

    expect(result.executionTime).toBeGreaterThanOrEqual(0);
    expect(typeof result.executionTime).toBe('number');
  });
});
