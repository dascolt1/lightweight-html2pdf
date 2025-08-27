// Jest setup file for browser API mocking
global.document = {
  querySelector: jest.fn().mockReturnValue({
    offsetWidth: 800,
    offsetHeight: 600
  }),
  getElementById: jest.fn().mockReturnValue({
    offsetWidth: 800,
    offsetHeight: 600
  })
};

global.window = {};

// Mock html2canvas
jest.mock('html2canvas', () => {
  return jest.fn().mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mock-data'),
    width: 800,
    height: 600
  });
});

// Mock jsPDF
jest.mock('jspdf', () => {
  return jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth: jest.fn().mockReturnValue(595),
        getHeight: jest.fn().mockReturnValue(842)
      }
    },
    getImageProperties: jest.fn().mockReturnValue({
      width: 800,
      height: 600
    }),
    addImage: jest.fn(),
    save: jest.fn()
  }));
}); 