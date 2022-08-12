import { BookStore } from "../book";

const store = new BookStore();

describe("Book Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should add a book", async () => {
    const result = await store.create({
      title: "Bridge to Terabithia",
      total_pages: 250,
      author: "Katherine Paterson",
      summary: "Childrens"
    });
    expect(result).toEqual({
      id: 1,
      title: "Bridge to Terabithia",
      total_pages: 250,
      author: "Katherine Paterson",
      summary: "Childrens"
    });
  });
});
