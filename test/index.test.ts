import { phrase } from "../src/index";

test('the phrase includes "hello"', () => {
  expect(phrase).toMatch(/[Hh][Ee][Ll][Ll][Oo]/);
});
