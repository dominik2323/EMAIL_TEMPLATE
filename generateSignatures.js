var inlineCss = require("inline-css");
const pug = require("pug");
const fs = require("fs");
const data = require("./data_source.json");
const slugify = require("slugify");

const api =
  "https://cdn.jsdelivr.net/gh/dominik2323/labona_email_signature@latest";

const compiledFunction = pug.compileFile("index.pug");

function makeSlug(str) {
  return slugify(str, {
    replacement: "_",
    trim: true,
    lower: true,
  });
}

data.forEach((person, i) => {
  const html = compiledFunction({
    api: api,
    title: person.title,
    surname: person.surname,
    name: person.name,
    positon: person.position,
    photo: person.photoFileName,
    phone: `${person.code || "+420"} ${person.phone}`,
    web: person.web,
    email: person.email,
  });

  inlineCss(html, { url: `file://${__dirname}/` }).then((html) => {
    const fileName = `${i}_${makeSlug(person.surname || ``)}_${makeSlug(
      person.name || ``
    )}`;
    fs.writeFile(`export/${fileName}.html`, html, (err) => {
      if (err) console.log(err);
    });
  });
});
