import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("check that the blog's URL and likes are shown when the view button is clicked", async () => {
  let container = render(<Blog blog={blog} />).container;

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".blogDetails");
  expect(div).not.toHaveStyle("display: none");
});

test('test that button is clicked twice', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>);

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
