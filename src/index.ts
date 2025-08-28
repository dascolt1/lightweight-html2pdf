/**
 * HTML to PDF Converter
 * A lightweight, fast browser module for converting HTML to PDF
 * Dependencies are bundled with the library
 */
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface HtmlToPdfOptions {
  /** ID of the HTML element to convert */
  id: string;
  /** Output file path */
  outputPath: string;
  /** Page size (default: 'A4') */
  pageSize?: 'A4' | 'A3' | 'Letter' | 'Legal';
  /** Page orientation (default: 'portrait') */
  orientation?: 'portrait' | 'landscape';
  /** Width offset in pixels (default: 0) */
  widthOffset?: number;
  /** Height offset in pixels (default: 0) */
  heightOffset?: number;
}

export interface HtmlToPdfResult {
  /** Success status */
  success: boolean;
  /** Output file path if successful */
  outputPath?: string;
  /** Error message if failed */
  error?: string;
}

/**
 * Converts HTML content to PDF
 * @param options - Configuration options for the conversion
 * @returns Promise that resolves to the conversion result
 */
export async function htmlToPdf(options: HtmlToPdfOptions): Promise<HtmlToPdfResult> {
  try {
    const {
      id,
      outputPath,
      pageSize = 'A4',
      orientation = 'portrait',
      widthOffset = 0,
      heightOffset = 0
    } = options;

    // Validate input
    if (!id || id.trim().length === 0) {
      throw new Error('The id of the html element is required');
    }

    if (!outputPath || outputPath.trim().length === 0) {
      throw new Error('Output path is required');
    }

    // Get the HTML element by ID
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Element with id '${id}' not found`);
    }

    console.log('Converting element:', element);
    console.log('Element dimensions:', element.offsetWidth, 'x', element.offsetHeight);

    // Convert HTML to canvas using html2canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      width: element.offsetWidth + widthOffset,
      height: element.offsetHeight + heightOffset,
      useCORS: true,
      allowTaint: true,
      logging: true
    });

    // Create PDF document
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'pt',
      format: pageSize
    });

    // Get PDF dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth() - widthOffset;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    console.log('PDF dimensions:', pdfWidth, 'x', pdfHeight);

    // Add the image to PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save(outputPath);

    console.log('PDF saved successfully:', outputPath);

    return {
      success: true,
      outputPath
    };

  } catch (error) {
    console.error('PDF conversion error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Default export
export default htmlToPdf; 