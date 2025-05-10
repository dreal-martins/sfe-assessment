import { render, screen } from "@testing-library/react";
import TextField from "./index";

describe("TextField", () => {
  it("renders correctly with label and placeholder", () => {
    render(<TextField placeholder="Enter text" value="" onChange={() => {}} />);

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("displays a required asterisk when required prop is true", () => {
    render(
      <TextField
        label="Username"
        placeholder="Enter username"
        required
        value=""
        onChange={() => {}}
      />
    );

    const label = screen.getByText("Username");
    expect(label).toHaveTextContent("*");
  });

  it("does not display a required asterisk when required prop is false", () => {
    render(
      <TextField
        label="Username"
        placeholder="Enter username"
        required={false}
        value=""
        onChange={() => {}}
      />
    );

    const label = screen.getByText("Username");
    expect(label).not.toHaveTextContent("*");
  });

  it("displays the correct value", () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <TextField
        label="Username"
        placeholder="Enter username"
        value="initial value"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toHaveValue("initial value");

    rerender(
      <TextField
        label="Username"
        placeholder="Enter username"
        value="updated value"
        onChange={mockOnChange}
      />
    );

    expect(input).toHaveValue("updated value");
  });
});
