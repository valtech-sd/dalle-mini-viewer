import { useEffect } from "react";
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
  console.log("PROPS", props.imageSrc);
  // useEffect(() => {
  //   fetch(
  //     "https://884299288848248:AUB676yF644mn8O771ztWambF9A@detzng4ks@api.cloudinary.com/v1_1/detzng4ks/resources/search",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         expression: "folder=dalle-mini",
  //         sort_by: [{ uploaded_at: "desc" }],
  //         max_results: 30,
  //       }),
  //     }
  //   ).then((response) => {
  //     if (!response.ok) {
  //       throw Error("error!!!", JSON.stringify(response.statusText));
  //     }
  //     return response;
  //   });

  //   // cloudinary.v2.search
  //   //   .expression("folder=dalle-mini")
  //   //   .sort_by("uploaded_at", "desc")
  //   //   .execute()
  //   //   .then((result) => console.log(result));
  // }, []);
  console.log(props);
  return (
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
  );
}
