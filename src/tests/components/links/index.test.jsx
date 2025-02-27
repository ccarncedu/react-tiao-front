import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Links from "../../../components/links";
import { AuthContext } from "../../../providers/AuthProvider";
import { fetchLinks, addLink } from "../../../services/links.service";

jest.mock("../../../services/links.service", () => ({
  fetchLinks: jest.fn(),
  addLink: jest.fn(),
  deleteLink: jest.fn(),
  editLink: jest.fn(),
  approveLink: jest.fn(),
}));

const mockLinks = [
  { id: 1, title: "Vídeo 1", url: "https://youtube.com/1", views: 10, approved: false },
  { id: 2, title: "Vídeo 2", url: "https://youtube.com/2", views: 5, approved: true },
];

const mockAuthContext = {
  token: "fake-token",
  user: { id: 1, name: "Test User" },
};

describe("Links Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza corretamente o título", async () => {
    fetchLinks.mockResolvedValue({ data: mockLinks, total_pages: 1 });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Links />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Tião Carreiro & Pardinho")).toBeInTheDocument();
    });
  });

  test("carrega e exibe os links corretamente", async () => {
    fetchLinks.mockResolvedValue({ data: mockLinks, total_pages: 1 });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Links />
      </AuthContext.Provider>
    );

    await waitFor(() => expect(fetchLinks).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(screen.getByText("Vídeo 1")).toBeInTheDocument();
    });
  });

  test("adiciona um novo link", async () => {
    addLink.mockResolvedValue({});
    fetchLinks.mockResolvedValue({ data: [...mockLinks, { id: 3, title: "Novo Vídeo", url: "https://youtube.com/3", views: 0, approved: false }], total_pages: 1 });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <Links />
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByLabelText("Adicione aqui a URL do seu vídeo do YouTube"), { target: { value: "https://youtube.com/3" } });
    fireEvent.click(screen.getByRole("button", { name: /adicionar link/i }));

    await waitFor(() => expect(addLink).toHaveBeenCalledWith("", "https://youtube.com/3", "fake-token"));
    await waitFor(() => expect(fetchLinks).toHaveBeenCalledTimes(2));

    await waitFor(() => {
      expect(screen.getByText("Novo Vídeo")).toBeInTheDocument();
    });
  });
});