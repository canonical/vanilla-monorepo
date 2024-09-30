// Test usage of shared TS & lint configs

// Unused variables
const unusedVar = 'This is unused';

// Use of var
var shouldUseLet = 'This should use let';

// Missing semicolon
const missingSemicolon = 'This is missing a semicolon'

// Unused function argument
function greet(name: string, unusedArg: string) {
  return `Hello, ${name}`;
}

// Incorrect array format
const array = [1, 2, 3, 4];

// Long line length
const longString = 'This is a very long string that should trigger a lint error because it exceeds the maximum allowed line length and is way way way too long for any reasonable codebase';

// No trailing commas
const obj = {
  name: 'John',
  age: 30
}

// Using == instead of ===, no-constant-condition
if ('somestr' == 'This should use ===') {
  // Console statement
  console.log('Incorrect equality check');
}
// no EOL at end of file