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
    "Darth Vader",
    "The Tramp",
    "Peter Pan",
    "Indiana Jones",
    "Rocky Balboa",
    "Han Solo",
    "Homer Simpson",
    "King Kong",
    "Spiderman",
    "Barbie",
    "Spock",
    "Godzilla",
    "The Joker",
    "Winnie-the-Pooh",
    "Popeye",
    "Tarzan",
    "Forrest Gump",
    "Big Bird",
    "Tony Montana",
    "Tony Soprano",
    "The Terminator",
    "Charlie Brown",
    "E.T.",
    "Fred Flintstone",
    "Kermit the Frog",
    "Yoda",
    "Zorro",
    "Mary Poppins",
    "Mario",
    "Harry Potter",
    "Gandalf",
    "The Grinch",
    "Willy Wonka",
    "The Hulk",
    "Scooby-Doo",
    "Edward Scissorhands",
    "Eric Cartman",
    "Pikachu",
    "Michael Scott",
    "Freddy Krueger",
    "Captain America",
    "Bambi",
    "Ronald McDonald",
    "Waldo/Wally",
    "Buffy Summers",
    "Wolverine",
    "Ron Burgundy",
    "Betty Boop",
    "Bilbo Baggins",
    "Porky Pig",
    "Shrek",
    "Optimus Prime",
    "Sonic the Hedgehog",
  ];

  const location = [
    "at central park",
    "on surface of the moon",
    "at a baja beach",
    "at a cabo beach",
    ", clear skies with hot air balloon",
    "on a mostly cloudy day",
    "a snowy blizzard",
    "the north pole",
    "the green hills of ireland",
    "the grand canyon",
    "the saharan desert",
    "a green jungle",
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
      text: `${randomCharacter} ${randomLocation}`,
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
