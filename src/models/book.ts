import Client from "../database";

export type Book = {
  id: number
  title: string;
  author: string;
  total_pages: number;
  summary: string;
  type: string;
};

export class BookStore {
  async index(): Promise<Book[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM books";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM books WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }

  async create(b: {title: string, author: string, total_pages: number, summary: string, type: string}): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO books (title, author, total_pages, summary, type) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const result = await conn.query(sql, [b.title, b.author, b.total_pages, b.summary, b.type]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
    }
  }

  async destroy(id: string): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM books WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }
}
