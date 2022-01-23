const mainjs = require("../index");

test('the phrase includes "hello"', () => {
  expect(mainjs.phrase).toMatch(/[Hh][Ee][Ll][Ll][Oo]/);
});
