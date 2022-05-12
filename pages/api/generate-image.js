// https://towardsdatascience.com/connecting-google-colab-to-an-amazon-ec2-instance-b61be9f9cf30

export default async function handler(req, res) {
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
    "The Terminator",
    "Charlie Brown",
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
    "Eric Cartman",
    "Pikachu",
    "Freddy Krueger",
    "Bambi",
    "Ronald McDonald",
    "Waldo",
    "Wolverine",
    "Ron Burgundy",
    "Betty Boop",
    "Bilbo Baggins",
    "Porky Pig",
    "Shrek",
    "Optimus Prime",
    "Sonic the Hedgehog",
  ];
  const paintingStyles = [
    "painting in pop art style",
    "painting in cubist style",
    "painting in surrealist style",
    "painting in the style of van gogh",
    "painting in the style of claude monet",
    "drawing",
    "charcoal drawing",
    "crayon drawing",
    "chalk drawing",
    "pencil sketch",
    "pixel art illustration",
    "illustration",
    "sepia tone photograph",
    "ukiyo-e print",
    "cartoon",
    "black and white photograph",
    "wood engraving",
    "postage stamp",
    "poster",
    "painting in pop art style",
  ];
  const locations = [
    "sitting in a field",
    "sitting at a beach",
    "sitting on the moon",
    "sitting on a mountain",
    "sitting under a waterfall",
    "sitting in a fire",
  ];
  const timeOfDay = [
    "at dusk",
    "at dawn",
    "at night",
    "at sunrise",
    "at twilight",
    "at sunset",
    "in the summer",
  ];

  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];
  const randomCharacter =
    characters[Math.floor(Math.random() * characters.length)];
  const randomPaintingStyle =
    paintingStyles[Math.floor(Math.random() * paintingStyles.length)];
  const randomTimeOfDay =
    timeOfDay[Math.floor(Math.random() * timeOfDay.length)];

  // const recipe = await fetch(
  //   `https://api.spoonacular.com/recipes/random?&number=1&apiKey=957083af550c433a81b9127d40cf869e`,
  //   {
  //     method: "GET",
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data) {
  //       return data.recipes[0].title;
  //     }
  //   })
  //   .catch(() => {
  //     console.log("error");
  //   });

  const textPrompt = `a ${randomPaintingStyle} of ${randomCharacter} ${randomLocation} ${randomTimeOfDay}`;

  fetch("http://52.52.59.188:8080" + `/dalle`, {
    method: "POST",
    headers: {
      "Bypass-Tunnel-Reminder": "go",
      mode: "no-cors",
    },
    body: JSON.stringify({
      text: textPrompt,
      num_images: 1,
    }),
  });

  res.status(200).send({
    currentPrompt: textPrompt,
  });
}
