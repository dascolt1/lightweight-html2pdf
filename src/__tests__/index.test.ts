import { htmlToPdf, HtmlToPdfOptions } from '../index';

describe('htmlToPdf', () => {
  it('should convert HTML to PDF successfully', async () => {
    const options: HtmlToPdfOptions = {
      id: 'test-element',
      outputPath: 'thisisawesome.pdf'
    };

    const result = await htmlToPdf(options);

    expect(result.success).toBe(true);
    expect(result.outputPath).toBe('thisisawesome.pdf');
    expect(result.error).toBeUndefined();
  });

  it('should handle empty ID', async () => {
    const options: HtmlToPdfOptions = {
      id: '',
      outputPath: 'thisisawesome.pdf'
    };

    const result = await htmlToPdf(options);

    expect(result.success).toBe(false);
    expect(result.error).toBe('The id of the html element is required');
  });

  it('should use default values when options are not provided', async () => {
    const options: HtmlToPdfOptions = {
      id: 'test-element',
      outputPath: 'thisisawesome.pdf'
    };

    const result = await htmlToPdf(options);

    expect(result.success).toBe(true);
    expect(result.outputPath).toBe('thisisawesome.pdf');
    expect(result.error).toBeUndefined();
  });

  it('should handle custom page settings', async () => {
    const options: HtmlToPdfOptions = {
      id: 'test-element',
      outputPath: 'thisisawesome.pdf',
      pageSize: 'A3',
      orientation: 'landscape',
      widthOffset: 20,
      heightOffset: 10
    };

    const result = await htmlToPdf(options);

    expect(result.success).toBe(true);
  });

  it('should handle width and height offsets', async () => {
    const options: HtmlToPdfOptions = {
      id: 'test-element',
      outputPath: 'thisisawesome.pdf',
      widthOffset: 50,
      heightOffset: 25
    };

    const result = await htmlToPdf(options);

    expect(result.success).toBe(true);
  });
});

 