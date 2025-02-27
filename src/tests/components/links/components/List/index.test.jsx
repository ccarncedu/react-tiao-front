import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LinkItem from "../../../../../components/links/components/List";

const mockHandleDeleteLink = jest.fn();
const mockHandleApproveLink = jest.fn();
const mockHandleEditLink = jest.fn();

const link = {
  id: 1,
  title: "Example Link",
  url: "https://example.com",
  thumbnail: "https://via.placeholder.com/100",
  views: 1000,
  likes: 500,
  is_approved: false,
};

const user = { is_admin: true };

describe("LinkItem Component", () => {
  test("renders link information correctly", () => {
    render(
      <LinkItem
        link={link}
        user={user}
        handleDeleteLink={mockHandleDeleteLink}
        handleApproveLink={mockHandleApproveLink}
        handleEditLink={mockHandleEditLink}
      />
    );

    expect(screen.getByText("Example Link")).toBeInTheDocument();
    expect(screen.getByText("https://example.com")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", link.thumbnail);
  });

  test("calls handleDeleteLink when delete button is clicked", () => {
    render(
      <LinkItem
        link={link}
        user={user}
        handleDeleteLink={mockHandleDeleteLink}
        handleApproveLink={mockHandleApproveLink}
        handleEditLink={mockHandleEditLink}
      />
    );

    fireEvent.click(screen.getByLabelText("delete"));
    expect(mockHandleDeleteLink).toHaveBeenCalledWith(link.id);
  });

  test("calls handleApproveLink when approve button is clicked", async () => {
    render(
      <LinkItem
        link={link}
        user={user}
        handleDeleteLink={mockHandleDeleteLink}
        handleApproveLink={mockHandleApproveLink}
        handleEditLink={mockHandleEditLink}
      />
    );

    fireEvent.click(screen.getByLabelText("approve"));
    expect(mockHandleApproveLink).toHaveBeenCalledWith(link.id);
  });

  test("enters edit mode and updates the link URL", () => {
    render(
      <LinkItem
        link={link}
        user={user}
        handleDeleteLink={mockHandleDeleteLink}
        handleApproveLink={mockHandleApproveLink}
        handleEditLink={mockHandleEditLink}
      />
    );

    fireEvent.click(screen.getByLabelText("edit"));
    const input = screen.getByDisplayValue(link.url);
    fireEvent.change(input, { target: { value: "https://new-url.com" } });

    fireEvent.click(screen.getByText("Salvar"));
    expect(mockHandleEditLink).toHaveBeenCalledWith(link.id, { url: "https://new-url.com" });
  });
});
