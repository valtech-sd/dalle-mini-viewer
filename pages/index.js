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
    .execute()
    .then((result) => {
      return result.resources[0].url;
    });
  console.log(finalImage);

  return {
    props: { imageSrc: finalImage }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [recipeTitle, setRecipeTitle] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/random?&number=1&apiKey=957083af550c433a81b9127d40cf869e`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setRecipeTitle(data.recipes.recipes[0].title);
        }
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  console.log(props);
  return (
    <>
      <Head>
        <meta httpEquiv="Refresh" content="120" />
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
        HI
      </div>
    </>
  );
}
