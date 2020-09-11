(function () {
  // global variables
  const appNameButton = document.querySelector("#appNameButton");
  const geolocationButton = document.querySelector("#geolocationButton");
  const clipboardButton = document.querySelector("#clipboardButton");
  const loadDogButton = document.querySelector("#loadDogButton");
  const loadCatButton = document.querySelector("#loadCatButton");
  const surpriseButton = document.querySelector("#surpriseButton");
  const header = document.querySelector(".titleH1");
  const text1 = document.querySelector("#text1");
  const text2 = document.querySelector("#text2");
  const text3 = document.querySelector("#text3");
  const text4 = document.querySelector("#text4");
  const text5 = document.querySelector("#text5");
  const img1 = document.querySelector("#img1");
  const img2 = document.querySelector("#img2");
  const img3 = document.querySelector("#img3");
  let currentDate = new Date();
  let currentHour = currentDate.getHours();

  // Using navigator

  // Function to show what's your browser / returns Netscape if it is IE11, Firefox, Chrome or Safari
  const whatsYourBrowser = () => {
    let resultText = "Browser's Name: " + navigator.appName;
    text1.innerHTML = resultText;
  };

  // Function to show what's your current position
  const whatsYourGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      text2.innerHTML =
        "Geolocation is not supported by this browser. Get a better one!";
    }
  };

  // Getting and setting coordinates
  const showPosition = (position) => {
    text2.innerHTML =
      "Your current position is: " +
      "<br>Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude;
  };

  // Using navigator & promise with then & catch
  // Function to show what's on your clipboard
  const whatsOnYourClipboard = () => {
    navigator.clipboard
      .readText()
      .then((clipText) => (text3.innerText = clipText))
      .catch((e) => {
        text3.innerText = `Something went wrong! ${e}`;
      });
  };

  // Using promise with resolve / reject
  // Function to show new header-text and picture
  // after surprise-button is clicked and async function is launched
  const checkTimeAndSetWelcomeText = (seconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentHour < 7) {
          reject((header.innerText = "You should go to bed!"));
          img3.src = "sleep.jpg";
          document.body.style.backgroundColor = "lightcoral";
        } else {
          resolve((header.innerText = "Let's click som buttons!"));
          img3.src = "letsplay.png";
        }
      }, seconds * 1000);
    });
  };

  // Using function with async / await
  // Function to wait a while before next funktion is launched
  async function waitAWhile() {
    const result = await checkTimeAndSetWelcomeText(5);
  }

  // Using promise with then & catch

  // Function to load a randome picture of the dog with API
  const loadDog = () => {
    fetch("https://api.thedogapi.com/v1/images/search")
      .then((dogInfo) => {
        return dogInfo.json();
      })
      .then((dogJson) => {
        const dogImageUrl = dogJson[0].url;
        img1.src = dogImageUrl;
      })
      .catch((e) => {
        text4.innerText = `Something went wrong! ${e}`;
      });
  };

  // Function to load a randome picture of the cat with API
  const loadCat = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((catInfo) => {
        return catInfo.json();
      })
      .then((catJson) => {
        const catImageUrl = catJson[0].url;
        img2.src = catImageUrl;
      })
      .catch((e) => {
        text5.innerText = `Something went wrong! ${e}`;
      });
  };

  // Event listeners to buttons
  appNameButton.addEventListener("click", whatsYourBrowser);
  geolocationButton.addEventListener("click", whatsYourGeolocation);
  clipboardButton.addEventListener("click", whatsOnYourClipboard);
  loadDogButton.addEventListener("click", loadDog);
  loadCatButton.addEventListener("click", loadCat);
  surpriseButton.addEventListener("click", waitAWhile);
})();
