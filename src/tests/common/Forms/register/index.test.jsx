import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterForm from "../../../../common/Forms/register";

const mockOnSubmit = jest.fn();

describe("Componente RegisterForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test("Renderiza os campos corretamente", () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Registrar/i })).toBeInTheDocument();
  });

  test("Permite preencher os campos de entrada", () => {
    render(<RegisterForm onSubmit={mockOnSubmit} />);
    
    const nomeInput = screen.getByLabelText(/Nome/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const senhaInput = screen.getByLabelText(/Senha/i);

    fireEvent.change(nomeInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "joao@example.com" } });
    fireEvent.change(senhaInput, { target: { value: "123456" } });

    expect(nomeInput.value).toBe("João Silva");
    expect(emailInput.value).toBe("joao@example.com");
    expect(senhaInput.value).toBe("123456");
  });

  test("Chama a função de submissão ao enviar o formulário", async () => {
    mockOnSubmit.mockResolvedValueOnce(true);
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "Maria Souza" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "maria@example.com" } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: "abcdef" } });
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledWith("Maria Souza", "maria@example.com", "abcdef"));
  });

  test("Exibe mensagem de sucesso quando o cadastro for bem-sucedido", async () => {
    mockOnSubmit.mockResolvedValueOnce(true);
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "Carlos Lima" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "carlos@example.com" } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: "123abc" } });
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    expect(await screen.findByText(/Cadastro realizado com sucesso!/i)).toBeInTheDocument();
  });

  test("Exibe mensagem de erro quando o cadastro falhar", async () => {
    mockOnSubmit.mockResolvedValueOnce(false);
    render(<RegisterForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "Ana Paula" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "ana@example.com" } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: "654321" } });
    fireEvent.click(screen.getByRole("button", { name: /Registrar/i }));

    expect(await screen.findByText(/Erro ao cadastrar. Tente novamente./i)).toBeInTheDocument();
  });
});
