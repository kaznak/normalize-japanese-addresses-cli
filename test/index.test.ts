import phrase from "lib/phrase";

test('the phrase includes "hello"', () => {
  expect(phrase).toMatch(/[Hh][Ee][Ll][Ll][Oo]/);
});
