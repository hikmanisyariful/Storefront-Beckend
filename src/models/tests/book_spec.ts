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
      summary: "Childrens",
      type: "Science"
    });
    expect(result).toEqual({
      id: 17,
      title: "Bridge to Terabithia",
      total_pages: 250,
      author: "Katherine Paterson",
      summary: "Childrens",
      type: "Science"
    });
  });

  it('show method should return the correct book', async () => {
    const result = await store.show("17");
    expect(result).toEqual({
      id: 17,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      summary: 'Childrens',
      type: 'Science'
    });
  });
});
