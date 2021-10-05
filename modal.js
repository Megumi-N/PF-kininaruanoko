const modal = document.getElementById("staticBackdrop");
const modalTitle = document.getElementById("staticBackdropLabel");
const modalBody = document.getElementById("staticBackdropBody");

const resultmodal = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultBody = document.getElementById("resultBody");

const modalBase = new bootstrap.Modal(document.getElementById("modal"), {
  keyboard: false,
  backdrop: "static",
});

const modalResult = new bootstrap.Modal(document.getElementById("result"), {
  keyboard: false,
  backdrop: "static",
});

window.onload = () => {
  modalBase.show();
  modalTitle.innerHTML = `気になるあの子を<br>コロコロ 〜in スマホ〜`;
  modalBody.innerHTML = `気になっているあの子をコロコロして、赤いラインのGOALまで進めよう！<br>
  遊びかたは簡単！<br>
  1.コロコロボタンをおすとすぐはじまるから、スマホをじめんとへいこうにする！<br>
  2.スマホをかたむけて、気になるあの子がコロコロする！<br>
  3.赤いラインまで気になるあの子をつれていく！<br>
  <br>
  緑の線に近づきすぎると気になるあの子とのかんけいはリセットされるので気をつけてね！<br>
  そうしないとすぐにジ・エンドだよ！<br>
  <a href="https://twitter.com/intent/tweet?&text=気になるあの子をコロコロしよう。%0aandroid環境推奨。%0a%23気になるあの子%0a%23コロコロ%0a%23気になるあの子をコロコロするだけのアプリ%0a&url=https://affectionate-bohr-19c20b.netlify.app/"
  target="_blank"
  rel="noopener noreferrer"
  >ツイートする</a>
  `;
};

function modalEdit(title, body) {
  point--;
  modalResult.show();
  resultTitle.innerHTML = title;
  resultBody.innerHTML = body;
}
