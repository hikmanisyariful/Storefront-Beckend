import Client from "../database";

export type Weapon = {
  id: number;
  name: string;
  type: string;
  weight: number;
};

export class MythicalWeaponStore {
  async index(): Promise<Weapon[]> {
    try {
      // open connection
      const conn = await Client.connect();

      // write sql which will get run on the table
      const sql = "SELECT * FROM mythical_weapons";

      // run query on the database
      const result = await conn.query(sql);

      // close database connection
      conn.release();

      // return the rows contained in the result from the database query
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get weapons ${err}`);
    }
  }

  async show(id: string): Promise<Weapon> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM mythical_weapons WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find weapon ${id}. Error: ${err}`);
    }
  }

  async create(w: Weapon): Promise<Weapon> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO mythical_weapons (name, type, weight) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [w.name, w.type, w.weight]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new weapon ${w.name}. Error: ${err}`);
    }
  }

  async destroy(id: string): Promise<Weapon> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM mythical_weapons WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete weapon ${id}. Error: ${err}`);
    }
  }
}
