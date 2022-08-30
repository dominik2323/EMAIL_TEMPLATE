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
    replacement: "-",
    trim: true,
    lower: true,
  });
}

let stackedHtml = "";
let markup = "";
data.forEach((person, i) => {
  const html = compiledFunction({
    api: api,
    title: person.title,
    surname: person.surname,
    name: person.name,
    position: person.position,
    photo: makeSlug(person.photoFileName),
    phone: `${person.code || "+420"} ${person.phone}`,
    web: person.web,
    email: person.email,
  });

  if (i === 0) {
    markup = html;
    console.log(html);
  }
  const currentHtml = html.match(/<body[^>]*>(.*?)<\/body>/)[0];
  console.log(currentHtml);
  stackedHtml = stackedHtml + currentHtml;
});

let finalMarkup = markup.replace(/<body[^>]*>(.*?)<\/body>/, stackedHtml);

inlineCss(finalMarkup, { url: `file://${__dirname}/` }).then((html) => {
  // const fileName = `${i}_${makeSlug(person.surname || ``)}_${makeSlug(
  //   person.name || ``
  // )}`;
  const fileName = `all`;
  fs.writeFile(`export/${fileName}.html`, html, (err) => {
    if (err) console.log(err);
  });
});
