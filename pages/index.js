import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import cloudinary from "cloudinary";
import styled from "styled-components";

export async function getServerSideProps(context) {
  let image;
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
  console.log(finalImage);

  return {
    props: { imageSrc: finalImage.src, description: finalImage.alt }, // will be passed to the page component as props
  };
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default function Home(props) {
  const [recipeTitle, setRecipeTitle] = useState("");

  console.log(props);
  return (
    <>
      <Head>{/* <meta httpEquiv="Refresh" content="30" /> */}</Head>
      <Row>
        <Column>
          <div
            style={{
              width: "300px",
            }}
          >
            <Image
              src="/FS_Logo_White.png"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              width: "200px",
            }}
          >
            <Image
              src="/qr-code.png"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div>
            <div
              style={{ color: "white", fontSize: "48px", paddingTop: "32px" }}
            >
              <span style={{ fontWeight: "bold" }}>Scan</span> to Lean More
            </div>
          </div>
        </Column>
        <Column>
          <img
            src={props.imageSrc}
            style={{
              height: "500px",
              width: "500px",
            }}
          />
          <h1 style={{ color: "white", textAlign: "center" }}>
            {props.description}
          </h1>
        </Column>
      </Row>
    </>
  );
}
