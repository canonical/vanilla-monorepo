import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Component from "./Button.js";

describe("Button component", () => {
  it("renders", () => {
    render(<Component label={"Hello world!"} />);
    expect(screen.getByText("Hello world!")).toBeDefined();
  });

  it("applies className", () => {
    render(<Component label={"Hello world!"} className="test-class" />);
    expect(screen.getByText("Hello world!").classList).toContain("test-class");
  });
});
