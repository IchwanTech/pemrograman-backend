// Core Modules
// fs = file system
// fs adalah core module yang digunakan untuk membaca, menulis, dan menghapus file di Node.js.
const fs = require("fs");

// console.log(fs);

// menuliskan string ke file (synchronous)

// try {
//   fs.writeFileSync("data/test.txt", "Hello World secara synchronous!");
// } catch (error) {
//   console.log(error);
// }

// menuliskan file (asynchronous)
// fs.writestring ke File("data/test.txt", "Hello World secara asynchronous!", (error) => {
//   console.log(error);
// });

// membaca isi file (synchronous)
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// membaca isi file (asynchronous)
// const data = fs.readFile("data/test.txt", "utf-8", (error, data) => {
//   if (error) throw error;
//   console.log(data);
// });

// Readline
// Readline adalah core module yang digunakan untuk membaca input dari user.
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("Masukan nama anda: ", (nama) => {
  rl.question("Masukan nomor HP anda: ", (nomor) => {
    // kita akan menyimpan data yang diinputkan ke dalam file contacts.json
    const contact = { nama, nomor };
    // readFileSync digunakan untuk membaca file secara synchronous
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    // parse data dari file contacts.json
    const contacts = JSON.parse(file);
    // kemudian push data baru ke contact array
    contacts.push(contact);
    // console.log(contacts);
    // writeFileSync digunakan untuk menulis file secara synchronous
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

    console.log("Terima kasih sudah memasukkan data.");

    rl.close();
  });
});
