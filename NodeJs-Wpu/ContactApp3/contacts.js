const fs = require("fs");
// mengimport chalk
const chalk = require("chalk");

const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  //existsSync adalah fungsi yang digunakan untuk mengecek apakah sebuah folder sudah ada atau belum
  fs.mkdirSync(dirPath); //mkdirSync adalah fungsi yang digunakan untuk membuat folder
}

const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8"); //writeFileSync adalah fungsi yang digunakan untuk membuat file
}

const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, nomor) => {
  const contact = { nama, email, nomor };
  // const file = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(file);
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold(
        "Contact sudah terdaftar sebelumnya, gunakan nama lain!"
      )
    );
    return false;
  }

  //  cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  // cek nomor
  if (!validator.isMobilePhone(nomor, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));
    return false;
  }

  contacts.push(contact);
  // console.log(contacts);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("Terima kasih sudah memasukkan data."));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("Daftar Kontak:"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.nomor}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(
      chalk.red.inverse.bold(`${nama} tidak ditemukan dalam daftar kontak!`)
    );
    return false;
  }

  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.nomor);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  if (contacts.length === newContacts.length) {
    console.log(
      chalk.red.inverse.bold(`${nama} tidak ditemukan dalam daftar kontak!`)
    );
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(
    chalk.green.inverse.bold(`Data kontak ${nama} berhasil dihapus.`)
  );
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
