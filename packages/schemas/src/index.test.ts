import { describe, expect, it } from "vitest";
import { createLeadSchema } from "./index";

describe("createLeadSchema", () => {
  it("accepts a valid lead payload", () => {
    const result = createLeadSchema.safeParse({
      fullName: "Nguyen Van A",
      phone: "0901234567",
      email: "lead@example.com",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty full name", () => {
    const result = createLeadSchema.safeParse({
      fullName: "",
      phone: "0901234567",
    });

    expect(result.success).toBe(false);
  });
});
