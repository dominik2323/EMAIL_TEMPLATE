var inlineCss = require("inline-css");
const pug = require("pug");
const fs = require("fs");
const data = require("./data_source.json");
const api =
  "https://cdn.jsdelivr.net/gh/dominik2323/labona_email_signature@latest";

const compiledFunction = pug.compileFile("index.pug");

data.forEach((person) => {
  const html = compiledFunction({
    api: api,
    name: `${`${person.title} ` || ``}${person.name} ${person.surname}`,
    positon: person.position,
    photo: person.photoFileName,
    phone: `${person.code || "+420"} ${person.phone}`,
    web: person.web,
    email: person.email,
  });

  inlineCss(html, { url: `file://${__dirname}/` }).then((html) => {
    fs.writeFile(
      `export/${person.name}_${person.surname}.html`,
      html,
      (err) => {
        if (err) console.log(err);
      }
    );
  });
});

// fs.readFile("index.html", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   inlineCss(data, { url: `file://${__dirname}/` })
//     .then(function (html) {
//       console.log("build done");
//       fs.writeFile("index.inlined-css.html", html, (err) => {
//         if (err) console.log(err);
//       });
//     })
//     .catch((e) => console.log(e));
// });
