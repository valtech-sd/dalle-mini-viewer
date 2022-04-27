// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import JsonBigint from "json-bigint";
import cloudinary from "cloudinary";

export default async function handler(req, res) {
  // cloudinary.config({
  //   cloud_name: "detzng4ks",
  //   api_key: "884299288848248",
  //   api_secret: "AUB676yF644mn8O771ztWambF9A",
  // });
  console.log("HIII");

  // const REQUEST_TIMEOUT_SEC = 300000;

  const characters = [
    "Superman",
    "Mickey Mouse",
    "James Bond",
    "Bugs Bunny",
    "Batman",
    "Dorothy Gale",
    "Darth Vader",
    "The Tramp",
    "Peter Pan",
    "Indiana Jones",
    "Rocky Balboa",
    "Vito Corleone",
    "Han Solo",
    "Homer Simpson",
    "Lucy Ricardo",
    "Archie Bunker",
    "King Kong",
    "Spiderman",
    "Barbie",
    "Spock",
    "Godzilla",
    "The Joker",
    "Scarlett O'Hara",
    "Winnie-the-Pooh",
    "Popeye",
    "Tarzan",
    "Forrest Gump",
    "Hannibal Lector",
    "Big Bird",
    "Holden Caulfield",
    "Tony Montana",
    "Tony Soprano",
    "The Terminator",
    "Jon Snow",
    "Norman Bates",
    "Charles Foster Kane",
    "Marty McFly",
    "Rick Blaine",
    "Man With No Name",
    "Charlie Brown",
    "E.T.",
    "Arthur Fonzarelli",
    "",
    "Phillip Marlowe",
    "Jay Gatsby",
    "Lassie",
    "Fred Flintstone",
    "Rooster Cogburn",
    "Atticus Finch",
    "Kermit the Frog",
    "George Bailey",
    "Yoda",
    "Zorro",
    "Moe, Larry, and Curly",
    "Mary Poppins",
    "Mario",
    "Harry Potter",
    "Holly Golightly",
    "The Dude",
    "Gandalf",
    "The Grinch",
    "Willy Wonka",
    "The Hulk",
    "Scooby-Doo",
    "Sam Malone",
    "George Costanza",
    "Jules Winfield",
    "John McClane",
    "Ellen Ripley",
    "Ralph Kramden",
    "Edward Scissorhands",
    "Eric Cartman",
    "Walter White",
    "Cosmo Kramer",
    "Pikachu",
    "Michael Scott",
    "Freddy Krueger",
    "Captain America",
    "Goku",
    "Bambi",
    "Ronald McDonald",
    "Waldo/Wally",
    "Buffy Summers",
    "Frasier Crane",
    "Omar Little",
    "Wolverine",
    "Ron Burgundy",
    "Jason Voorhees",
    "Betty Boop",
    "Bilbo Baggins",
    "Tom Joad",
    "Tony Stark (Iron Man)",
    "Katniss Everdeen",
    "Porky Pig",
    "Travis Bickle",
    "Hawkeye Pierce",
    "Don Draper",
    "Cliff Huxtable",
    "Shrek",
    "Optimus Prime",
    "Sonic the Hedgehog",
    "Bubble:",
    "Pre-20th Century:",
  ];

  const location = [
    "central park",
    "surface of the moon",
    "baja beach",
    "cabo beach",
    "clear skies with hot air balloon",
    "mostly cloudy day",
    "a snowy blizzard",
    "the north pole",
    "green hills of ireland",
    "the grand canyon",
    "saharan desert",
    "green jungle",
  ];

  var randomLocation = location[Math.floor(Math.random() * location.length)];
  var randomCharacter =
    characters[Math.floor(Math.random() * characters.length)];

  const recipe = await fetch(
    `https://api.spoonacular.com/recipes/random?&number=1&apiKey=957083af550c433a81b9127d40cf869e`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        return data.recipes[0].title;
      }
    })
    .catch(() => {
      console.log("error");
    });

  console.log(recipe);

  const queryStartTime = new Date();
  fetch("http://52.52.59.188:8080" + `/dalle`, {
    method: "POST",
    headers: {
      "Bypass-Tunnel-Reminder": "go",
      mode: "no-cors",
    },
    body: JSON.stringify({
      text: `${randomCharacter} walking in ${randomLocation}`,
      num_images: 1,
    }),
  });

  // const imageData = JsonBigint.parse(response);
  // const fullImageData = `data:image/png;base64,${imageData}`;

  // const imageData = data:image/png;base64,${JsonBigint.parse(
  //   response["generatedImgs"]
  // )}`;
  // console.log("imageData", imageData);

  // cloudinary.v2.uploader.upload(
  //   fullImageData,
  //   {
  //     folder: "dalle-mini",
  //     width: 1200,
  //     height: 1200,
  //     metadata: "mickey mouse eating a banana",
  //   },
  //   function (error, result) {
  //     console.log("cloudinary response", result);
  //   }
  // );

  res.status(200).send({
    currentPrompt: `${randomCharacter}eating ${recipe} at ${randomLocation}`,
  });

  // try {
  //   const result = await fetch("http://52.52.59.188:8080" + `/dalle`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       text: "Pirates eating hot dogs on the sea",
  //       num_images: 1,
  //     }),
  //   });
  //   res.status(200).send(JsonBigint.parse(result));
  // } catch (err) {
  //   res.status(500).send({ error: "failed to fetch data" });
  // }

  // return {
  //   executionTime:
  //     Math.round(
  //       ((new Date() - queryStartTime) / 1000 + Number.EPSILON) * 100
  //     ) / 100,
  //   generatedImgs: JsonBigint.parse(response),
  // };

  // res.status(200).json({ name: "John Dsssoe" });
}
