import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("-------PUT to database-------");

  //--Creating a connection to the jate database and specifying version--
  const jateDb = await openDB("jate", 1);

  //--Establishing a new transaction by specifying the database and version--
  const tx = jateDb.transaction("jate", "readwrite");

  //--Opening the desired object store--
  const store = tx.objectStore("jate");

  //--Using .put() method to update the editor--
  const request = store.put({ id: 1, value: content });

  //--Getting results--
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("---GETTING from database---");

  //--Creating a connection to the jate database and specifying version--
  const jateDb = await openDB("jate", 1);

  //--Establishing a new transaction by specifying the database and version--
  const tx = jateDb.transaction("jate", "readonly");

  //--Opening the desired object store--
  const store = tx.objectStore("jate");

  //--Using .getAll() to get all the data in the jate database--
  const request = store.getAll();

  //--Getting results--
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
