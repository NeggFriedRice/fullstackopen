import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "chai";

const blog = {
  title: "Test title",
  author: "Test author",
  url: "http://testurl.com",
  likes: 5,
};

test("render blog title and author", () => {
  render(<Blog blog={blog} />);

  expect(screen.getByText("Test title Test author")).toBeInTheDocument();
});

test("url and likes are hidden at start", () => {
  let container = render(<Blog blog={blog} />).container;

  const div = container.querySelector(".blogDetails");
  expect(div).toHaveStyle("display: none");
});
