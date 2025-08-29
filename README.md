# lightweight-html2pdf

A lightweight, fast browser module for converting HTML to PDF with advanced styling support, customizable options, and comprehensive testing.

**🚀 All dependencies bundled together - no external scripts needed!**

## Features

- Convert HTML elements to PDF files
- Customizable page size, orientation, and margins
- Works with both **TypeScript** and **vanilla JavaScript**
- TypeScript support with full type definitions (optional)
- Promise-based API
- Comprehensive error handling
- Browser compatible (client-side)

## Installation

```bash
npm install lightweight-html2pdf
```

## Usage

### Basic Usage

#### Sample HTML
```
<html>
  <body id="convert_to_pdf">
    <h1>Hello World!</h1>
    <p>This is a test document.</p>
  </body>
</html>
```

#### TypeScript/ES6 Modules
```typescript
import { htmlToPdf } from 'lightweight-html2pdf';

const result = await htmlToPdf({
  id: "convert_to_pdf",
  outputPath: 'output.pdf',
  pageSize: 'A4',
  orientation: 'portrait'
});

if (result.success) {
  console.log(`PDF created successfully: ${result.outputPath}`);
} else {
  console.error(`Error: ${result.error}`);
}
```

#### Vanilla JavaScript (CommonJS)
```javascript
const { htmlToPdf } = require('lightweight-html2pdf');

async function convertToPdf() {
  const result = await htmlToPdf({
    id: "convert_to_pdf",
    outputPath: 'output.pdf',
    pageSize: 'A4',
    orientation: 'portrait'
  });

  if (result.success) {
    console.log(`PDF created successfully: ${result.outputPath}`);
  } else {
    console.error(`Error: ${result.error}`);
  }
}

convertToPdf();
```

### Advanced Usage with Custom Options

#### TypeScript/ES6 Modules
```typescript
import { htmlToPdf } from 'lightweight-html2pdf';

const result = await htmlToPdf({
  id: "convert_to_pdf",
  outputPath: 'custom.pdf',
  pageSize: 'A3',
  orientation: 'landscape',
  widthOffset: 10,
  heightOffset: 10
});
```

#### Vanilla JavaScript (CommonJS)
```javascript
const { htmlToPdf } = require('lightweight-html2pdf');

async function convertWithOptions() {
  const result = await htmlToPdf({
    id: "convert_to_pdf",
    outputPath: 'custom.pdf',
    pageSize: 'A3',
    orientation: 'landscape',
    widthOffset: 10,
    heightOffset: 10
  });
  
  return result;
}
```

### Browser Usage (Direct)

For direct browser usage without build tools:

```html
<!DOCTYPE html>
<html>
<head>
    <title>HTML to PDF</title>
    <!-- All dependencies bundled - no external scripts needed! -->
</head>
<body>
    <div id="content-to-convert">
        <h1>Hello World!</h1>
        <p>This will be converted to PDF</p>
    </div>
    
    <button onclick="convertToPdf()">Download PDF</button>
    
    <script type="module">
        import { htmlToPdf } from 'https://unpkg.com/lightweight-html2pdf/dist/index.js';
        
        window.convertToPdf = async function() {
            const result = await htmlToPdf({
                id: 'content-to-convert',
                outputPath: 'my-document.pdf'
            });
            
            if (result.success) {
                console.log('PDF downloaded!');
            }
        };
    </script>
</body>
</html>
```

**Note**: This package is designed specifically for browser environments. All dependencies (html2canvas and jsPDF) are bundled together - no external scripts needed!

### React Usage

For React applications, you can easily integrate the PDF conversion.

#### Simple Function Component
```jsx
import React from 'react';
import { htmlToPdf } from 'lightweight-html2pdf';

function MyComponent() {
  const handleDownloadPDF = async () => {
    const result = await htmlToPdf({
      id: 'pdf-content',
      outputPath: 'my-react-document.pdf',
      pageSize: 'A4',
      orientation: 'portrait'
    });
    
    if (result.success) {
      console.log('PDF downloaded successfully!');
    } else {
      console.error('Failed to generate PDF:', result.error);
    }
  };

  return (
    <div>
      <div id="pdf-content">
        <h1>My React Content</h1>
        <p>This content will be converted to PDF</p>
        <div style={{ color: 'blue', fontSize: '18px' }}>
          Styled content works too!
        </div>
      </div>
      
      <button onClick={handleDownloadPDF}>
        Download as PDF
      </button>
    </div>
  );
}

export default MyComponent;
```

#### Custom Hook for Reusability
```jsx
import { useState } from 'react';
import { htmlToPdf } from 'lightweight-html2pdf';

// Custom hook for PDF generation
function usePdfGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generatePdf = async (elementId, filename = 'document.pdf', options = {}) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await htmlToPdf({
        id: elementId,
        outputPath: filename,
        pageSize: 'A4',
        orientation: 'portrait',
        ...options
      });
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generatePdf, isGenerating, error };
}

// Usage in component
function DocumentComponent() {
  const { generatePdf, isGenerating, error } = usePdfGenerator();

  const handleExport = async () => {
    try {
      await generatePdf('document-content', 'my-report.pdf', {
        pageSize: 'A3',
        orientation: 'landscape'
      });
      alert('PDF downloaded successfully!');
    } catch (err) {
      alert('Failed to generate PDF');
    }
  };

  return (
    <div>
      <div id="document-content">
        <h2>Report Content</h2>
        <p>Your report data here...</p>
      </div>
      
      <button onClick={handleExport} disabled={isGenerating}>
        {isGenerating ? 'Generating PDF...' : 'Export to PDF'}
      </button>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
```

#### Reusable TypeScript Component
```tsx
import React from 'react';
import { htmlToPdf, HtmlToPdfOptions, HtmlToPdfResult } from 'lightweight-html2pdf';

interface PDFButtonProps {
  elementId: string;
  filename?: string;
  options?: Partial<HtmlToPdfOptions>;
  onSuccess?: (result: HtmlToPdfResult) => void;
  onError?: (error: string) => void;
}

const PDFButton: React.FC<PDFButtonProps> = ({
  elementId,
  filename = 'document.pdf',
  options = {},
  onSuccess,
  onError
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    
    try {
      const result = await htmlToPdf({
        id: elementId,
        outputPath: filename,
        pageSize: 'A4',
        orientation: 'portrait',
        ...options
      });

      if (result.success) {
        onSuccess?.(result);
      } else {
        onError?.(result.error || 'Unknown error');
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Generating...' : 'Download PDF'}
    </button>
  );
};

// Usage - Just pass the element ID!
function App() {
  return (
    <div>
      <div id="my-content">
        <h1>Hello from React!</h1>
        <p>This will be converted to PDF</p>
      </div>
      
      <PDFButton
        elementId="my-content"
        filename="react-document.pdf"
        options={{ pageSize: 'A4', orientation: 'portrait' }}
        onSuccess={() => console.log('PDF generated!')}
        onError={(error) => console.error('Error:', error)}
      />
    </div>
  );
}
```

## API Reference

### `htmlToPdf(options: HtmlToPdfOptions): Promise<HtmlToPdfResult>`

Converts HTML content to PDF format.

#### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | **required** | ID of html element to convert to PDF |
| `outputPath` | `string` | **required** | Output file path |
| `pageSize` | `'A4' \| 'A3' \| 'Letter' \| 'Legal'` | `'A4'` | Page size |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Page orientation |
| `widthOffset` | `number` | `0` | Offset from page width |
| `heightOffset` | `number` | `0` | Offset from page height |

#### Return Value

Returns a promise that resolves to an object with:

- `success: boolean` - Whether the conversion was successful
- `outputPath?: string` - Path to the generated PDF file (if successful)
- `error?: string` - Error message (if failed)

## Architecture

This package is designed with simplicity in mind:

- **Single Implementation**: One clean, browser-focused implementation
- **No Node.js Dependencies**: Designed exclusively for browser environments
- **Self-Contained**: All dependencies bundled together
- **TypeScript Support**: Full type definitions included
- **ES6 Modules**: Modern JavaScript module system

## Development

- Modern web browser with ES6 module support
- npm or yarn (for installation)
- html2canvas and jsPDF (automatically installed as dependencies)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

**Note**: This package is designed for browser environments. The development setup includes testing infrastructure but the core functionality works immediately since all dependencies are bundled together.

### Available Scripts

- `npm run build` - Build the TypeScript code
- `npm run dev` - Watch mode for development
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build directory

### Building

```bash
npm run build
```

The compiled JavaScript will be output to the `dist/` directory.

## Testing

This project includes comprehensive testing with both automated Jest tests and browser-based testing capabilities.

### Automated Testing (Jest)

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

#### Test Cases

The test suite covers the following scenarios:

| Test Case | Description | Expected Result |
|-----------|-------------|-----------------|
| **Basic Conversion** | Tests successful HTML to PDF conversion | ✅ Success with `lightweight-html2pdf.pdf` |
| **Empty ID Validation** | Tests error handling for missing element ID | ❌ Error: "The id of the html element is required" |
| **Default Values** | Tests default option handling | ✅ Success with default settings |
| **Custom Page Settings** | Tests A3 landscape with offsets | ✅ Success with custom page configuration |
| **Width/Height Offsets** | Tests margin offset functionality | ✅ Success with offset calculations |

#### Test Environment

- **Test Framework**: Jest with TypeScript support
- **Environment**: jsdom (simulates browser DOM)
- **Testing Approach**: Structure validation and interface testing
- **Coverage**: Validates module structure, parameters, and return types

### Browser Testing

For manual testing and visual verification, use the included HTML test files:

#### 1. Simple Test (`simple-test.html`)

A comprehensive test page with advanced CSS styling:

- **Features**: Gradients, typography, layouts, shadows, tables
- **Content**: Feature cards, data tables, technical information
- **Styling**: CSS Grid, Flexbox, responsive design, animations
- **Output**: Generates `lightweight-html2pdf.pdf`

**Access**: `http://localhost:8080/simple-test.html`

#### 2. Demo Test (`demo.html`)

Advanced testing interface with multiple conversion options:

- **Controls**: Page size, orientation, offset adjustments
- **Real-time**: Live preview and conversion testing
- **Debugging**: Comprehensive console logging

**Access**: `http://localhost:8080/demo.html`

#### Browser Testing Setup

1. **Start Local Server**:
   ```bash
   npx http-server . -p 8080 -c-1
   ```

2. **Access Test Pages**:
   - Simple Test: `http://localhost:8080/simple-test.html`
   - Demo: `http://localhost:8080/demo.html`

3. **Test PDF Generation**:
   - Click "Test Module Import" button
   - Check browser console for detailed logs
   - Verify PDF download with filename `thisisawesome.pdf`

#### Browser Testing Features

- **CORS Compliance**: Local HTTP server bypasses file:// restrictions
- **Library Loading**: Bundled html2canvas and jsPDF
- **Error Handling**: Comprehensive error logging and user feedback
- **Cross-Browser**: Tested on Chrome, Firefox, Edge
- **Responsive**: Mobile-friendly test interfaces

### Testing Dependencies

```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "@types/jest": "^29.0.0"
  }
}
```

**Testing Philosophy**: Since this is a browser-only package, tests focus on validating the module structure, TypeScript interfaces, and function signatures rather than complex runtime behavior that requires browser APIs.

### Quick Testing Workflow

1. **Run Automated Tests**:
   ```bash
   npm test                    # Run all tests
   npm test -- --watch        # Watch mode for development
   npm test -- --coverage     # Generate coverage report
   ```

2. **Start Browser Testing**:
   ```bash
   npx http-server . -p 8080 -c-1
   ```

3. **Test in Browser**:
   - Navigate to `http://localhost:8080/simple-test.html`
   - Click "Test Module Import" button
   - Verify PDF download: `lightweight-html2pdf.pdf`
   - Check browser console for detailed logs

4. **Verify Results**:
   - ✅ All Jest tests pass (structure validation)
   - ✅ PDF downloads successfully in browser
   - ✅ Console shows no errors
   - ✅ Generated PDF maintains styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## TODO

- [x] Implement actual HTML to PDF conversion logic
- [x] Add comprehensive testing suite (Jest + Browser)
- [x] Add advanced CSS styling support
- [x] Add page size and orientation options
- [x] Add width/height offset controls
- [x] Add more page size options (A0, A1, A2, etc.)
- [ ] Add watermark support
- [ ] Add password protection
- [ ] Add compression options

## Dependencies

### Runtime Dependencies

**All dependencies are bundled together!** No need to install html2canvas or jsPDF separately:

- **html2canvas** - Converts HTML elements to canvas images (bundled)
- **jsPDF** - Generates PDF documents from images and data (bundled)

### Development Dependencies (Optional)

These are only needed if you're contributing to the package or want TypeScript support:

- **TypeScript** - Type safety and compilation (optional for end users)
- **Jest** - Testing framework with jsdom environment
- **ESLint** - Code quality and consistency
- **ts-jest** - TypeScript support for Jest

### Installation

```bash
# Install the package (includes all dependencies)
npm install lightweight-html2pdf

# For development/contributing only:
npm install --save-dev typescript jest ts-jest jest-environment-jsdom @types/jest eslint
```

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/dascolt1/lightweight-html2pdf/issues) on GitHub. 