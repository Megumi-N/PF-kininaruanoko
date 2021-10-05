const SCREEN_WIDTH = window.innerWidth; // キャンバス幅（ピクセル）
const SCREEN_HEIGHT = window.innerHeight; // キャンバス高さ（ピクセル）

let canvas = null; // キャンバス
let g = null; // コンテキスト
let vec = { x: 0, y: 0 }; // 加速度センサー値格納用
let anoko = null; // 表示する気になるあのこ
const image = new Image();
image.src = "./face.png";
let point = 1;
// パドルの分割
let p = 6;
let paddle1 = SCREEN_HEIGHT / p;
let paddle2 = (SCREEN_HEIGHT / p) * 2;
let paddle3 = (SCREEN_HEIGHT / p) * 3;
let paddle4 = (SCREEN_HEIGHT / p) * 4;
let paddle5 = (SCREEN_HEIGHT / p) * 5;
let body;
let title;

// ボールクラス
class KininaruAnoko {
  constructor(x, y, r) {
    // constructorメソッドは、classで作成されたオブジェクトの生成と初期化のための特殊なメソッドです
    this.x = x; // x座標
    this.y = y; // y座標
    this.r = r; // 半径
  }
  draw() {
    // 位置を計算
    this.x += vec.x;
    this.y += vec.y;

    g.beginPath();
    g.drawImage(image, this.x, this.y);

    // 上壁に当たった場合
    if (this.y < 0) {
      title = "ゆびさきがふるえるくらいドキドキ";
      body = "はつこいレベルのドキドキ感！";
      modalEdit(title, body);
    }
    // 下壁に当たった場合
    else if (this.y > SCREEN_HEIGHT - 50) {
      title = "もうすこしで手に入りそうでドキドキ";
      body = "つめがあまい！";
      modalEdit(title, body);
    }

    if (this.x < 0 || this.x > SCREEN_WIDTH - 50) {
      if (
        this.x > SCREEN_WIDTH - 50 &&
        this.y < SCREEN_HEIGHT &&
        this.y > paddle5
      ) {
        title = "気になるあの子がついに！";
        body = `
        あなたのころがしテクニックに追いつけるものはいません。<br>
        気になるあの子はもうあなたにメロメロ。<br>
        そうとうなことがないかぎりあなたからはなれられないですね。<br>
        <a href="https://twitter.com/intent/tweet?&text=他の追随を許さない転がしテクニックを持っています。%0a%0aスマホの傾き検知機能を使って気になるあの子をコロコロしよう。%0aandroid環境推奨。%0a%23気になるあの子%0a%23コロコロ%0a%23気になるあの子をコロコロするだけのアプリ%0a&url=https://affectionate-bohr-19c20b.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        >ツイートする</a>`;
        modalEdit(title, body);
      } else {
        title = "おんなごころはむずかしい";
        body = "うまくいきそうだったのに...";
        modalEdit(title, body);
      }
    }

    if (this.x > 75) {
      // 一本め通過
      if (this.y > paddle1 - 35 && this.y < paddle1) {
        title = "うでがふるえるくらいドキドキ";
        body = "ドキドキしすぎてうでのふるえが止まらない";
        modalEdit(title, body);
      }
      // 3本め通過
      else if (this.y > paddle3 - 35 && this.y < paddle3) {
        title = "からだふるえるくらいドキドキ";
        body = "ちゅうばんにさしかかって気をぬいたすきによこからもってかれた！";
        modalEdit(title, body);
      }
      // 5ほんめ
      else if (this.y > paddle5 - 35 && this.y < paddle5) {
        title = "あと少しで...";
        body = "もう少しであの子はかんぜんにおちます。";
        modalEdit(title, body);
      }
    }

    if (this.x < SCREEN_WIDTH - 75) {
      // 二本め通過
      if (this.y > paddle2 - 35 && this.y < paddle2) {
        title = "はつこいのようなきもちはなくなって...";
        body = "ふり向かせたすぎてからまわり！";
        modalEdit(title, body);
      }
      if (this.y > paddle4 - 35 && this.y < paddle4) {
        title = "うよきょくせつ";
        body = "うよきょくせつありつつも、あと少しで...";
        modalEdit(title, body);
      }
    }
  }
}

function paddle() {
  g.beginPath();
  g.fillStyle = "green";
  // x：矩形領域の始点のうち、X座標を指定します。y：矩形領域の始点のうち、Y座標を指定します。width：矩形領域の横幅を指定します。height：矩形領域の高さを指定します。
  // 囲む
  g.fillRect(0, 0, SCREEN_WIDTH, 15); //上
  g.fillRect(0, 0, 15, SCREEN_HEIGHT); //左
  g.fillRect(SCREEN_WIDTH - 15, 0, 15, SCREEN_HEIGHT); //右
  g.fillRect(0, SCREEN_HEIGHT - 15, SCREEN_WIDTH, 15); //下

  g.fillRect(70, paddle1, SCREEN_WIDTH, 15); // １本め
  g.fillRect(-SCREEN_WIDTH + SCREEN_WIDTH - 70, paddle2, SCREEN_WIDTH, 15); // ２本め
  g.fillRect(70, paddle3, SCREEN_WIDTH, 15); // ３本め
  g.fillRect(-SCREEN_WIDTH + SCREEN_WIDTH - 70, paddle4, SCREEN_WIDTH, 15); // ４本め
  g.fillRect(70, paddle5, SCREEN_WIDTH, 15); // ５本め

  g.fillStyle = "red";
  g.fillRect(SCREEN_WIDTH - 15, paddle5 + 15, 15, SCREEN_HEIGHT - paddle5 - 30); //右
}

// ゲームループ
function mainLoop() {
  const handImage = new Image();
  handImage.src = "./hand.png";
  g.drawImage(handImage, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  anoko.draw();
  paddle();
  // 再帰呼び出し;
  const requestId = requestAnimationFrame(mainLoop);
  if (point == 1) {
    requestId;
  } else if (point < 1) {
    cancelAnimationFrame(requestId);
  }
}

// 起動処理
document.getElementById("btn").addEventListener("click", function () {
  canvas = document.getElementById("canvas"); // キャンバス情報取得
  g = canvas.getContext("2d");
  // キャンバスサイズ設定
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
  anoko = new KininaruAnoko(SCREEN_WIDTH - 70, 35, 0); // ボールを一つ生成 x,y,r
  mainLoop(); // メインループ実行
});

// 簡易OS判定
function detectOSSimply() {
  let ret;
  if (
    navigator.userAgent.indexOf("iPhone") > 0 ||
    navigator.userAgent.indexOf("iPad") > 0 ||
    navigator.userAgent.indexOf("iPod") > 0
  ) {
    // iPad OS13のsafariはデフォルト「Macintosh」なので別途要対応
    ret = "iphone";
  } else if (navigator.userAgent.indexOf("Android") > 0) {
    ret = "android";
  } else {
    ret = "pc";
  }

  return ret;
}

// iPhone + Safariの場合はDeviceOrientation APIの使用許可をユーザに求める
// function permitDeviceOrientationForSafari() {
//   DeviceOrientationEvent.requestPermission()
//     .then((response) => {
//       if (response === "granted") {
//         window.addEventListener("deviceorientation", detectDirection);
//       }
//     })
//     .catch(console.error);
// }
function permitDeviceOrientationForSafari() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", detectDirection);
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
    console.log("not iOS");
  }
}

let os;

// DOM構築完了イベントハンドラ登録
window.addEventListener("DOMContentLoaded", init);

// 初期化
function init() {
  // 簡易的なOS判定
  os = detectOSSimply();
  if (os == "iphone") {
    // safari用。DeviceOrientation APIの使用をユーザに許可して貰う
    document
      .querySelector("#permit")
      .addEventListener("click", permitDeviceOrientationForSafari);
    //  加速度センサーの値を取得
    window.addEventListener(
      "deviceorientation",
      function orientation(e) {
        vec.x = e.gamma / 5; // x方向の移動量: そのままでは大きい為、小さくする
        vec.y = e.beta / 5; // y方向の移動量:
      },
      true
    );
  } else if (os == "android") {
    window.addEventListener(
      "deviceorientation",
      function orientation(e) {
        vec.x = e.gamma / 5; // x方向の移動量: そのままでは大きい為、小さくする
        vec.y = e.beta / 5; // y方向の移動量:
      },
      true
    );
  } else {
    window.alert("PCは未対応です。");
  }
}
