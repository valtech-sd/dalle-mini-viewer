// https://towardsdatascience.com/connecting-google-colab-to-an-amazon-ec2-instance-b61be9f9cf30

import cloudinary from "cloudinary";

export default async function handler(req, res) {
  cloudinary.config({
    cloud_name: "detzng4ks",
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const finalImage = await cloudinary.v2.search
    .expression("folder=dalle-mini")
    .sort_by("uploaded_at", "desc")
    .with_field("context")
    .execute()
    .then((result) => {
      console.log("RES");
      return {
        src: result.resources[0].url,
        alt: result.resources[0].context.alt,
      };
    });
  res.status(200).send({
    imageData: finalImage,
  });
}
