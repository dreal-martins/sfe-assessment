import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button Component", () => {
  it("renders the label correctly", () => {
    render(<Button label="Click Me" />);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} disabled />);
    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies primary variant styles by default", () => {
    render(<Button label="Primary" />);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(button).toHaveClass("bg-[#ffb616]");
  });

  it("applies secondary variant styles", () => {
    render(<Button label="Secondary" variant="secondary" />);
    const button = screen.getByRole("button", { name: /secondary/i });
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("text-gray-900");
  });

  it("applies size styles correctly", () => {
    const { rerender } = render(<Button label="Small" size="small" />);
    expect(screen.getByRole("button")).toHaveClass("text-sm");

    rerender(<Button label="Medium" size="medium" />);
    expect(screen.getByRole("button")).toHaveClass("text-base");

    rerender(<Button label="Large" size="large" />);
    expect(screen.getByRole("button")).toHaveClass("text-lg");
  });

  it("renders icon correctly and places it on the right by default", () => {
    const Icon = <span data-testid="icon">🌟</span>;
    render(<Button label="With Icon" icon={Icon} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies fullWidth class when fullWidth is true", () => {
    render(<Button label="Full Width" fullWidth />);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("renders icon on the left when iconPosition is left", () => {
    const Icon = <span data-testid="icon">🌟</span>;
    render(<Button label="Icon Left" icon={Icon} iconPosition="left" />);
    expect(screen.getByRole("button")).toHaveClass("flex-row");
  });

  it("renders icon on the right when iconPosition is right", () => {
    const Icon = <span data-testid="icon">🌟</span>;
    render(<Button label="Icon Right" icon={Icon} iconPosition="right" />);
    expect(screen.getByRole("button")).toHaveClass("flex-row-reverse");
  });
});
