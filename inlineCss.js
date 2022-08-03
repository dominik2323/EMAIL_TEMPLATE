var inlineCss = require("inline-css");
const pug = require("pug");
const fs = require("fs");
const data = require("./data.json");

const compiledFunction = pug.compileFile("index.pug");

const images = [
  "_MG_4499.jpg",
  "_MG_5511.jpg",
  "202201310944246.jpg",
  "20190618010133237.jpg",
  "aIMG_5321.jpg",
  "jan_kachlik_nove_zaluzie.jpg",
  "jana_loffelmann_nove_zaluzie.jpg",
  "janca_paikova_fullres_final_small.jpg",
  "karel_kral_nove_zaluzie.jpg",
  "katerina_mensikova_nove_zaluzie_1.jpg",
  "magdalena_kalisova_nove_zaluzie.jpg",
  "michal_simoncic_labona.jpg",
  "pavel_hrdlicka_nove_zaluzie.jpg",
  "stepan_hejda_nove_zaluzie.jpg",
  "tomas_zahradnik_labona.jpg",
];

images.forEach((img) => {
  const html = compiledFunction({ ...data, photo: img });

  inlineCss(html, { url: `file://${__dirname}/` }).then((html) => {
    fs.writeFile(`export/${img.split(".")[0]}.html`, html, (err) => {
      if (err) console.log(err);
    });
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
