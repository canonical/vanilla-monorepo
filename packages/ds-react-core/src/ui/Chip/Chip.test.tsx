import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Component from "./Chip.js";

describe("Chip component", () => {
  it("renders", () => {
    render(<Component lead={"Cloud"} value={"AWS"} />);
    expect(screen.getByText("AWS")).toBeDefined();
  });

  it("applies className", () => {
    render(
      <Component
        id={"chip"}
        lead={"Cloud"}
        value={"AWS"}
        className={"test-class"}
      />,
    );
    const chip = screen.getByText("Cloud").parentElement;
    expect(chip?.classList).toContain("chip");
    expect(chip?.classList).toContain("test-class");
  });

  it("applies lead", () => {
    render(<Component lead={"Cloud"} value={"AWS"} />);
    expect(screen.getByText("Cloud")).toBeDefined();
  });

  it("applies value", () => {
    render(<Component lead={"Cloud"} value={"AWS"} />);
    expect(screen.getByText("AWS")).toBeDefined();
  });

  it("applies lead & value", () => {
    render(<Component lead={"Cloud"} value={"AWS"} />);
    expect(screen.getByText("AWS")).toBeDefined();
    expect(screen.getByText("Cloud")).toBeDefined();
  });

  it("applies appearance", () => {
    render(<Component lead={"Cloud"} value={"AWS"} appearance={"positive"} />);
    expect(screen.getByText("Cloud").parentElement?.classList).toContain(
      "positive",
    );
  });

  it("calls onClick", () => {
    const onClick = vi.fn();
    render(<Component lead={"Cloud"} value={"AWS"} onClick={onClick} />);
    screen.getByText("AWS").click();
    expect(onClick).toHaveBeenCalled();
  });

  it("calls onDismiss", () => {
    const onDismiss = vi.fn();
    render(<Component lead={"Cloud"} value={"AWS"} onDismiss={onDismiss} />);
    screen.getByLabelText("Dismiss").click();
    expect(onDismiss).toHaveBeenCalled();
  });
});
