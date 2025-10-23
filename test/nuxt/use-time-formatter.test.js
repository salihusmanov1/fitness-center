import { describe, it, expect, beforeEach } from "vitest";
import { useTimeFormatter } from "~/composables/use-time-formatter";

describe("useTimeFormatter", () => {
  let formatter;

  beforeEach(() => {
    formatter = useTimeFormatter();
  });

  // -------------------------------
  // CORE FUNCTIONALITY TESTS
  // -------------------------------
  describe("formatTime - core behavior", () => {
    it("formats a valid ISO string correctly", () => {
      const result = formatter.formatTime("2024-01-15T14:30:00.000Z");
      expect(result.time).toBe("14:30");
      expect(typeof result.date).toBe("string");
    });

    it.each([
      ["midnight", "2024-01-15T00:00:00.000Z", "00:00"],
      ["noon", "2024-01-15T12:00:00.000Z", "12:00"],
      ["end of day", "2024-01-15T23:59:00.000Z", "23:59"],
      ["single-digit minutes", "2024-01-15T14:05:00.000Z", "14:05"],
      ["single-digit hours", "2024-01-15T09:30:00.000Z", "09:30"],
    ])("handles %s correctly", (_, input, expected) => {
      expect(formatter.formatTime(input).time).toBe(expected);
    });

    it("returns UTC time regardless of local timezone", () => {
      const result = formatter.formatTime("2024-01-15T14:30:00.000Z");
      expect(result.time).toBe("14:30");
    });

    it("handles milliseconds gracefully", () => {
      const result = formatter.formatTime("2024-01-15T14:30:45.123Z");
      expect(result.time).toBe("14:30");
    });

    it("handles leap year date", () => {
      const result = formatter.formatTime("2024-02-29T12:00:00.000Z");
      expect(result.time).toBe("12:00");
      expect(result.date).toBeDefined();
    });
  });

  // -------------------------------
  // MULTIPLE INPUT TESTS
  // -------------------------------
  describe("formatTime - various inputs", () => {
    it.each([
      ["2024-01-15T14:00:00.000Z", "14:00"],
      ["2024-01-15T14:15:00.000Z", "14:15"],
      ["2024-01-15T14:45:00.000Z", "14:45"],
      ["2024-01-15T14:59:00.000Z", "14:59"],
    ])("handles various minutes: %s", (input, expected) => {
      expect(formatter.formatTime(input).time).toBe(expected);
    });

    it.each([
      ["2024-01-15T00:30:00.000Z", "00:30"],
      ["2024-01-15T01:30:00.000Z", "01:30"],
      ["2024-01-15T12:30:00.000Z", "12:30"],
      ["2024-01-15T18:30:00.000Z", "18:30"],
      ["2024-01-15T23:30:00.000Z", "23:30"],
    ])("handles various hours: %s", (input, expected) => {
      expect(formatter.formatTime(input).time).toBe(expected);
    });

    it("handles different ISO formats and offsets", () => {
      const result1 = formatter.formatTime("2024-01-15T14:30:00.000Z");
      const result2 = formatter.formatTime("2024-01-15T14:30:00.000+00:00");
      expect(result1.time).toBe(result2.time);
    });
  });

  // -------------------------------
  // ERROR HANDLING TESTS
  // -------------------------------
  describe("error handling", () => {
    it.each([
      null,
      undefined,
      "",
      123,
      {},
      "invalid-date-string",
      "2024-13-45T25:70:00.000Z",
    ])("handles invalid input gracefully: %s", (input) => {
      expect(() => formatter.formatTime(input)).not.toThrow();
    });
  });

  // -------------------------------
  // RETURN STRUCTURE TESTS
  // -------------------------------
  describe("return value", () => {
    it("always returns object with date and time", () => {
      const result = formatter.formatTime("2024-01-15T14:30:00.000Z");
      expect(result).toHaveProperty("date");
      expect(result).toHaveProperty("time");
      expect(typeof result.date).toBe("string");
      expect(result.time).toMatch(/^\d{2}:\d{2}$/);
    });

    it("has consistent structure for multiple calls", () => {
      const iso = "2024-01-15T14:30:00.000Z";
      const r1 = formatter.formatTime(iso);
      const r2 = formatter.formatTime(iso);
      expect(r1).toEqual(r2);
    });
  });

  // -------------------------------
  // COMPOSABLE STRUCTURE TESTS
  // -------------------------------
  describe("composable structure", () => {
    it("returns an object with formatTime function", () => {
      expect(formatter).toBeInstanceOf(Object);
      expect(typeof formatter.formatTime).toBe("function");
    });

    it("is callable multiple times with consistent results", () => {
      const r1 = formatter.formatTime("2024-01-15T14:30:00.000Z");
      const r2 = formatter.formatTime("2024-01-15T15:45:00.000Z");
      expect(r1.time).not.toBe(r2.time);
      expect(r1.time).toBe("14:30");
      expect(r2.time).toBe("15:45");
    });
  });

  // -------------------------------
  // EDGE CASES
  // -------------------------------
  describe("edge cases", () => {
    it.each([
      ["very old date", "1900-01-01T12:00:00.000Z", "12:00"],
      ["future date", "2030-12-31T23:59:00.000Z", "23:59"],
      ["leap year", "2024-02-29T12:00:00.000Z", "12:00"],
    ])("handles %s", (_, input, expected) => {
      const result = formatter.formatTime(input);
      expect(result.time).toBe(expected);
      expect(result.date).toBeDefined();
    });

    it("handles timezone offset properly", () => {
      const result = formatter.formatTime("2024-01-15T14:30:00.000+05:30");
      expect(result.time).toBe("09:00");
    });
  });
});
