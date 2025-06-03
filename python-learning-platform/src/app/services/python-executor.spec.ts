import { TestBed } from '@angular/core/testing';
import { PythonExecutorService } from './python-executor';

describe('PythonExecutorService', () => {
  let service: PythonExecutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonExecutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize pyodide', async () => {
    const isReady = await service.initializePyodide();
    expect(isReady).toBe(true);
    expect(service.isReady()).toBe(true);
  });

  it('should execute simple python code', async () => {
    await service.initializePyodide();
    
    const code = 'print("Hello, World!")';
    const result = await service.executeCode(code);
    
    expect(result.success).toBe(true);
    expect(result.output).toContain('Hello, World!');
    expect(result.error).toBe('');
  });

  it('should handle python syntax errors', async () => {
    await service.initializePyodide();
    
    const code = 'print("Hello, World!"'; // Missing closing parenthesis
    const result = await service.executeCode(code);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('SyntaxError');
  });

  it('should handle python runtime errors', async () => {
    await service.initializePyodide();
    
    const code = 'print(undefined_variable)'; // Undefined variable
    const result = await service.executeCode(code);
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('NameError');
  });

  it('should execute code with variables', async () => {
    await service.initializePyodide();
    
    const code = `
x = 10
y = 20
result = x + y
print(f"Result: {result}")
`;
    const result = await service.executeCode(code);
    
    expect(result.success).toBe(true);
    expect(result.output).toContain('Result: 30');
  });

  it('should execute code with functions', async () => {
    await service.initializePyodide();
    
    const code = `
def greet(name):
    return f"Hello, {name}!"

message = greet("Python")
print(message)
`;
    const result = await service.executeCode(code);
    
    expect(result.success).toBe(true);
    expect(result.output).toContain('Hello, Python!');
  });

  it('should execute code with loops', async () => {
    await service.initializePyodide();
    
    const code = `
for i in range(3):
    print(f"Count: {i}")
`;
    const result = await service.executeCode(code);
    
    expect(result.success).toBe(true);
    expect(result.output).toContain('Count: 0');
    expect(result.output).toContain('Count: 1');
    expect(result.output).toContain('Count: 2');
  });

  it('should handle multiple print statements', async () => {
    await service.initializePyodide();
    
    const code = `
print("Line 1")
print("Line 2")
print("Line 3")
`;
    const result = await service.executeCode(code);
    
    expect(result.success).toBe(true);
    expect(result.output).toContain('Line 1');
    expect(result.output).toContain('Line 2');
    expect(result.output).toContain('Line 3');
  });

  it('should clear output between executions', async () => {
    await service.initializePyodide();
    
    // First execution
    let result = await service.executeCode('print("First")');
    expect(result.output).toContain('First');
    
    // Second execution should not contain first output
    result = await service.executeCode('print("Second")');
    expect(result.output).toContain('Second');
    expect(result.output).not.toContain('First');
  });

  it('should handle empty code', async () => {
    await service.initializePyodide();
    
    const result = await service.executeCode('');
    expect(result.success).toBe(true);
    expect(result.output).toBe('');
    expect(result.error).toBe('');
  });

  it('should handle whitespace-only code', async () => {
    await service.initializePyodide();
    
    const result = await service.executeCode('   \n  \t  ');
    expect(result.success).toBe(true);
    expect(result.output).toBe('');
    expect(result.error).toBe('');
  });

  it('should measure execution time', async () => {
    await service.initializePyodide();
    
    const code = `
import time
time.sleep(0.1)  # Sleep for 100ms
print("Done")
`;
    const result = await service.executeCode(code);
    
    expect(result.success).toBe(true);
    expect(result.executionTime).toBeGreaterThan(0);
  });
});
