// Jest setup file for browser API mocking

// Mock the libraries before any imports
jest.mock('html2canvas', () => {
  return jest.fn().mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mock-data'),
    width: 800,
    height: 600
  });
});

jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth: jest.fn().mockReturnValue(595),
        getHeight: jest.fn().mockReturnValue(842)
      }
    },
    addImage: jest.fn(),
    save: jest.fn()
  }));
});

// Set up global browser APIs
global.document = {
  getElementById: jest.fn().mockReturnValue({
    offsetWidth: 800,
    offsetHeight: 600
  })
};

global.window = {
  html2canvas: jest.fn().mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mock-data'),
    width: 800,
    height: 600
  }),
  jsPDF: jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth: jest.fn().mockReturnValue(595),
        getHeight: jest.fn().mockReturnValue(842)
      }
    },
    addImage: jest.fn(),
    save: jest.fn()
  }))
}; 