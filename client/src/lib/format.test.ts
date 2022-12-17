import { describe, expect, test } from "@jest/globals";
import { formatPrice } from "./format";

describe("価格のフォーマット（カンマ付与）", () => {
  test("500 -> 500", () => {
    expect(formatPrice(500)).toBe("500");
  });
  test("-500 -> -500", () => {
    expect(formatPrice(-500)).toBe("-500");
  });
  test("5000 -> 5,000", () => {
    expect(formatPrice(5000)).toBe("5,000");
  });
  test("5000000000 -> 5,000,000,000", () => {
    expect(formatPrice(5000)).toBe("5,000");
  });
  test("-5000 -> -5,000", () => {
    expect(formatPrice(5000)).toBe("5,000");
  });
  test("-5000000000 -> -5,000,000,000", () => {
    expect(formatPrice(5000)).toBe("5,000");
  });

  test("5000.28 -> 5,000", () => {
    expect(formatPrice(5000.28)).toBe("5,000");
  });
  test("-5000.28 -> -5,000", () => {
    expect(formatPrice(-5000.28)).toBe("-5,000");
  });
  test("5000.68 -> 5,001", () => {
    expect(formatPrice(5000.68)).toBe("5,001");
  });
  test("-5000.68 -> -5,001", () => {
    expect(formatPrice(-5000.68)).toBe("-5,001");
  });
});
