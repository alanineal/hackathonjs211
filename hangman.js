const letters = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
const words = [
  "grey",
  "school",
  "warrior",
  "thunder",
  "real",
  "shark",
  "butter",
  "tomato",
  "potato",
  "university",
  "popcorn",
  "progress",
  "elephant",
  "phone",
  "artist",
  "handkerchief",
  "chemistry",
  "picture",
  "camera",
  "alternate",
  "sandwich",
  "water",
  "traitor",
  "america",
  "basketball",
  "personal",
  "homerun",
  "apple",
  "banana",
  "monster",
  "lightning",
  "microphone",
  "door",
  "monitor",
  "television",
  "prisoner",
  "detective",
  "breaking",
  "solution",
  "fantasy",
  "ocean",
  "president",
  "patio",
  "titanic",
  "candy",
  "hamburger",
  "currency",
  "copper",
  "buffalo",
  "cowboy",
];

let randomWord;
newWord();

let i = 6;
let placeholder = generatePlaceholder(randomWord);

const $section = $(".letters-section");

$('<div class="triesCounter"></div>').insertAfter(".placeholder");

$(".letters-section").on("click", ".item", function () {
  if ($(this).attr("data-checked") === "true") {
    return false;
  }

  const letter = $(this).attr("data-value");

  checkLetter(letter, this);

  $(this).attr("data-checked", true);
});

letters.forEach(function (letter) {
  const $span = $("<span />", {
    html: "<span>" + letter + "</span>",
    class: "item",
    "data-value": letter.toUpperCase(),
  });

  $section.append($span);
});
triesCounter(i);
function checkLetter(letter, element) {
  if (randomWord.includes(letter)) {
    $(element).css({
      color: "#fff",
      background: "green",
    });

    console.log("gasit");

    const indexes = findAllIndexes(randomWord, letter);

    placeholder = placeholder.split("");

    indexes.forEach((index) => {
      placeholder[index] = letter;
    });

    placeholder = placeholder.join("");

    $(".placeholder").text(placeholder);

    if (placeholder === randomWord) {
      let message = "You Win!";
      let messageWord = "You are right, word is: ";
      tryAgain(message, messageWord, randomWord);
    }

    triesCounter(i);
  } else {
    $(element).css({
      color: "#fff",
      background: "red",
    });

    i--;

    if (i === 0) {
      let message = "You Lose!";
      let messageWord = "The word was: ";
      tryAgain(message, messageWord, randomWord);
    }

    triesCounter(i);
  }
}

function newWord() {
  randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  console.log(randomWord);
}

function triesCounter(i) {
  $(".triesCounter").css("margin-top", "30px");
  $(".triesCounter").text(i + " Tries left");

  if (i > 4) {
    $(".triesCounter").css("color", "green");
  } else if (i > 2) {
    $(".triesCounter").css("color", "orange");
  } else {
    $(".triesCounter").css("color", "red");
  }
}

function tryAgain(message, messageWord, wordToGuess) {
  $(
    `<div class="popov">  
					<span class="popBox">
						<p>` +
      message +
      `</p>
						<p> ` +
      messageWord +
      wordToGuess +
      ` </p> 
						<button class="tryAgain">Try Again!</button>
					</span>
				</div>`
  ).insertBefore("body");

  $(".tryAgain").click(function () {
    $(this).closest("div").remove();

    $(".letters-section").each(function (el) {
      $(this).children().removeAttr("data-checked");
      $(this).children().removeAttr("style");
      newWord();
      placeholder = generatePlaceholder(randomWord);
      i = 6;
      triesCounter(i);
    });
  });
}

function generatePlaceholder(word) {
  let placeholder = "";

  for (let i = 0; i < word.length; i++) {
    placeholder = placeholder + "_";
  }

  $(".placeholder").text(placeholder);
  return placeholder;
}

function findAllIndexes(str, letter) {
  let indexes = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === letter) {
      indexes.push(i);
    }
  }

  return indexes;
}
