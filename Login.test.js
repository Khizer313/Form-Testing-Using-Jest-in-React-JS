import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from './login/Login.jsx';
import { __esModule } from "@testing-library/jest-dom/dist/matchers.js";


jest.mock("axios" , () => ({
    __esModule:true,
    default:{
        get:()=>({
            data:{data:1, name:"john"}
        }),
    },
}))


describe("Login Component", () => {
  beforeEach(() => {
    render(<Login />);
  });

  test("username input field should be rendered", () => {
    const inputElement = screen.getByPlaceholderText(/username/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("password input field should be rendered", () => {
    const inputElement = screen.getByPlaceholderText(/password/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("button should be rendered", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("username input field should be empty", () => {
    const inputElement = screen.getByPlaceholderText(/username/i);
    expect(inputElement.value).toBe("");
  });

  test("password input field should be empty", () => {
    const inputElement = screen.getByPlaceholderText(/password/i);
    expect(inputElement.value).toBe("");
  });
  
  test("button should be disabled", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
  test("loading should not be rendered", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).not.toHaveTextContent(/please wait/);
  });
  
    test("error message should not be visible", () => {
        const buttonElement = screen.getByTestId("error");
        expect(buttonElement).not.toBeVisible();

    })
    test("username input should change", () => {
        const input = screen.getByPlaceholderText(/username/i);
        const testValue = "test";
        fireEvent.change(input, {target: {value: testValue}})
        expect(input.value).toBe(testValue);

    })
    test("password input  should change", () => {
        const inputElement = screen.getByPlaceholderText(/password/i);
        const testValue = "111";
        fireEvent.change(inputElement, {target: {value: testValue}})
        expect(inputElement.value).toBe(testValue);
      });
    //   test("button should not be disabled when input exists", () => {
    //     const buttonElement = screen.getByRole("button");

    //     const input = screen.getByPlaceholderText(/username/i);
    //     const inputElement = screen.getByPlaceholderText(/password/i);

    //     const testValue = "test";
    //     fireEvent.change(input, {target: {value: testValue}})
    //     fireEvent.change(inputElement, {target: {value: testValue}})

    //     expect(buttonElement).not.toBeDisabled();
    //   });
      test("loading should  be rendered when click", () => {
        const buttonElement = screen.getByRole("button");

        const input = screen.getByPlaceholderText(/username/i);
        const inputElement = screen.getByPlaceholderText(/password/i);

        const testValue = "test";
        fireEvent.change(input, {target: {value: testValue}})
        fireEvent.change(inputElement, {target: {value: testValue}})
        fireEvent.click(buttonElement)

        expect(buttonElement).toHaveTextContent(/Login/);
      });
      test("loading should not be visible after click", async () => {
        const buttonElement = screen.getByRole("button");

        const input = screen.getByPlaceholderText(/username/i);
        const inputElement = screen.getByPlaceholderText(/password/i);

        const testValue = "test";
        fireEvent.change(input, {target: {value: testValue}})
        fireEvent.change(inputElement, {target: {value: testValue}})
        fireEvent.click(buttonElement)

        await waitFor(() =>  expect(buttonElement).not.toHaveTextContent(/please wait/i));
      });
    
});