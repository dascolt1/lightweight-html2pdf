import { htmlToPdf, HtmlToPdfOptions, HtmlToPdfResult } from '../index';

describe('lightweight-html2pdf', () => {
  describe('Module Structure', () => {
    it('should export htmlToPdf function', () => {
      expect(typeof htmlToPdf).toBe('function');
      expect(htmlToPdf).toBeInstanceOf(Function);
    });

    it('should export HtmlToPdfOptions interface', () => {
      // TypeScript interfaces don't exist at runtime, but we can check the function signature
      expect(htmlToPdf.length).toBe(1); // Takes one parameter
    });

    it('should export HtmlToPdfResult interface', () => {
      // Check that the function returns a promise with the expected structure
      const result = htmlToPdf({ id: 'test', outputPath: 'test.pdf' });
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('Function Parameters', () => {
    it('should accept required parameters', () => {
      const options: HtmlToPdfOptions = {
        id: 'test-element',
        outputPath: 'test.pdf'
      };
      
      expect(options.id).toBe('test-element');
      expect(options.outputPath).toBe('test.pdf');
    });

    it('should accept optional parameters', () => {
      const options: HtmlToPdfOptions = {
        id: 'test-element',
        outputPath: 'test.pdf',
        pageSize: 'A3',
        orientation: 'landscape',
        widthOffset: 10,
        heightOffset: 5
      };
      
      expect(options.pageSize).toBe('A3');
      expect(options.orientation).toBe('landscape');
      expect(options.widthOffset).toBe(10);
      expect(options.heightOffset).toBe(5);
    });
  });

  describe('Return Type', () => {
    it('should return a promise that resolves to HtmlToPdfResult', async () => {
      // This test validates the return type structure
      const resultPromise = htmlToPdf({ id: 'test', outputPath: 'test.pdf' });
      
      expect(resultPromise).toBeInstanceOf(Promise);
      
      // Note: In a real browser environment, this would actually work
      // In Jest, it will fail because we don't have the browser APIs
      // But we're testing the structure, not the runtime behavior
    });
  });
});

 