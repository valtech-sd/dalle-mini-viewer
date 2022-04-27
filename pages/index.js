import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import cloudinary from "cloudinary";

export async function getServerSideProps(context) {
  let image;
  cloudinary.config({
    cloud_name: "detzng4ks",
    api_key: "884299288848248",
    api_secret: "AUB676yF644mn8O771ztWambF9A",
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
  console.log(finalImage);

  return {
    props: { imageSrc: finalImage.src, description: finalImage.alt }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [recipeTitle, setRecipeTitle] = useState("");

  console.log(props);
  return (
    <>
      <Head>
        <meta httpEquiv="Refresh" content="3600" />
      </Head>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={props.imageSrc}
          style={{
            height: "800px",
            width: "800px",
          }}
        />
        <h1 style={{ color: "white", textAlign: "center" }}>
          {props.description}
        </h1>
      </div>
    </>
  );
}
