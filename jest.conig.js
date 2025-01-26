module.exports = {
    // Enable coverage collection
    collectCoverage: true,
  
    // Specify which files to collect coverage from
    collectCoverageFrom: [
      "src/**/*.{js,jsx}",  // Collect coverage from all JS and JSX files in the src folder
      "!src/index.js",      // Optionally exclude index.js file (usually entry point)
      "!src/setupTests.js", // Optionally exclude setupTests.js (usually for setup only)
    ],
  
    // Directory where Jest should output coverage reports
    coverageDirectory: "coverage", // Default is "coverage", but you can customize the output location
  
    // Formats for coverage report
    coverageReporters: [
      "html",    // HTML report (open `coverage/lcov-report/index.html` in a browser)
      "text",    // Text summary (shown in terminal)
      "lcov",    // Detailed lcov report (useful for integration with code coverage services)
      "json",    // JSON report (can be used for integration with other tools)
    ],
  
    // Optionally configure which files should be ignored by tests
    testPathIgnorePatterns: [
      "/node_modules/",  // Ignore node_modules (Jest ignores this by default)
      "/build/",         // Ignore build directory (for production files)
    ],
  
    // Ensure Jest recognizes JSX/TSX files if using React or TypeScript
    moduleFileExtensions: [
      "js",
      "jsx", // Add jsx extension for React
      "ts",  // If you're using TypeScript
      "tsx", // If you're using TypeScript with React
    ],
  
    // Configure Babel for JSX or TypeScript support (if needed)
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest", // Transpile JS and JSX using Babel
    },
  
    // Set up global variables or setup files for testing (e.g., Enzyme, React Testing Library, etc.)
    setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect", // Extend expect for RTL matchers (if using React Testing Library)
    ],
  
    // Optional configuration for Jest's test environment (use jsdom for browser-like environment)
    testEnvironment: "jsdom",
  
    // You can adjust timeout, verbose output, or other settings
    verbose: true,
  };
  