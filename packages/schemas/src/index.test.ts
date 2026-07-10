import { describe, expect, it } from "vitest";
import { createLeadSchema } from "./index";

describe("createLeadSchema", () => {
  it("accepts a valid quote form lead", () => {
    const result = createLeadSchema.safeParse({
      fullName: "Nguyen Van A",
      phone: "0901234567",
      email: "lead@example.com",
      subject: "van-ep-phu-phim",
      quantity: "500 tấm",
      message: "Cần báo giá",
      source: "quote_form",
    });

    expect(result.success).toBe(true);
  });

  it("accepts a valid contact page lead", () => {
    const result = createLeadSchema.safeParse({
      fullName: "Nguyen Van A",
      phone: "0901234567",
      company: "Công ty ABC",
      subject: "van-ep-noi-that",
      quantity: "100 tấm",
      message: "Giao hàng tại Hà Nội",
      source: "contact_page",
    });

    expect(result.success).toBe(true);
  });

  it("accepts minimal payload (only required fields)", () => {
    const result = createLeadSchema.safeParse({
      fullName: "Nguyen Van A",
      phone: "0901234567",
      source: "consultation_form",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty full name", () => {
    const result = createLeadSchema.safeParse({
      fullName: "",
      phone: "0901234567",
      source: "quote_form",
    });

    expect(result.success).toBe(false);
  });

  it("rejects when source is missing", () => {
    const result = createLeadSchema.safeParse({
      fullName: "Nguyen Van A",
      phone: "0901234567",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid source value", () => {
    const result = createLeadSchema.safeParse({
      fullName: "Nguyen Van A",
      phone: "0901234567",
      source: "invalid_source",
    });

    expect(result.success).toBe(false);
  });
});
