import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../../../../common/Forms/login";
import "@testing-library/jest-dom"; 
import React from "react";
describe("LoginForm Component", () => {
  let mockOnSubmit;

  beforeEach(() => {
    mockOnSubmit = jest.fn();
  });

  test("renderiza campos de email e senha", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  test("atualiza os campos de email e senha ao mudar", () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("user@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("mostra mensagem de sucesso ao fazer login com sucesso", async () => {
    mockOnSubmit.mockResolvedValue(true);
    render(<LoginForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/login realizado com sucesso/i)).toBeInTheDocument();
    });
  });

  test("mostra mensagem de erro ao falhar no login", async () => {
    mockOnSubmit.mockResolvedValue(false);
    render(<LoginForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/erro ao fazer login/i)).toBeInTheDocument();
    });
  });
});
