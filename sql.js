import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// const result  =await pool.query("select * from person")
// const row =result[0]
// console.log(row);

export async function getNotes() {
  const [rows] = await pool.query('select * from branch');
  return rows;
}
const notes = await getNotes();
console.log(notes);

export const getNote = async (id) => {
  const result = await pool.query(
    `
  select * from branch 
  where branch_id = ?`,
    [id]
  );
  const res = result[0];
  return res;
};

const note = await getNote(1);
console.log(note);

export const createNotes = async (branch_id, br_name, addr) => {
  const [result] = await pool.query(
    `
    INSERT INTO branch (branch_id,br_name,addr)
    VALUES (?,?,?)
    `,
    [branch_id, br_name, addr]
  );
  //   return{
  //     branch_id:result.insertId,
  //     br_name,
  //     addr
  // };
  const id = result.insertId;
  console.log(id);
  return getNote(id);
};

// const res = await createNotes(12, 'thanjavur', '6000 big temble');
// console.log(res);
