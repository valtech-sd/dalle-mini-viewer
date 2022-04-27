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

  const queryStartTime = new Date();
  fetch("http://52.52.59.188:8080" + `/dalle`, {
    method: "POST",
    headers: {
      "Bypass-Tunnel-Reminder": "go",
      mode: "no-cors",
    },
    body: JSON.stringify({
      text: "donald duck eating a banana",
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

  res.status(200).send();

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
