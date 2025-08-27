/**
 * HTML to PDF Converter
 * A simple module to convert HTML content to PDF format
 */

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface HtmlToPdfOptions {
  /** ID of html content to convert */
  id: string;
  /** Output file path (optional) */
  outputPath: string;
  /** Page size (default: 'A4') */
  pageSize?: 'A4' | 'A3' | 'Letter' | 'Legal';
  /** Page orientation (default: 'portrait') */
  orientation?: 'portrait' | 'landscape';
  /** Width offset (default: 0) */
  widthOffset?: number;
  /** Height offset (default: 0) */
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
      outputPath = `output-${Date.now()}.pdf`,
      pageSize = 'A4',
      orientation = 'portrait',
      widthOffset = 0,
      heightOffset = 0
    } = options;

    // Validate input
    if (!id || id.trim().length === 0) {
      throw new Error('The id of the html element is required');
    }

    const pdf = new jsPDF(orientation, "pt", pageSize);
    const data = await html2canvas(document.querySelector(id)! as HTMLElement);
    const imgData = data.toDataURL("image/png", 1.0);
    const imgProperties = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - widthOffset;
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(outputPath);
    
    return {
      success: true,
      outputPath
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}



// Default export
export default htmlToPdf; 