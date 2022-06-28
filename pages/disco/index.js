import Head from "next/head";
import Image from "next/image";
import cloudinary from "cloudinary";
import styled from "styled-components";

export async function getServerSideProps(context) {
  cloudinary.config({
    cloud_name: "detzng4ks",
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const finalImage = await cloudinary.v2.search
    .expression("folder=disco-diffusion")
    .sort_by("uploaded_at", "desc")
    .with_field("context")
    .execute()
    .then((result) => {
      return {
        src: result.resources[0].url,
        alt: result.resources[0].context.alt,
      };
    });

  return {
    props: { imageSrc: finalImage.src, description: finalImage.alt },
  };
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const ColumnSmall = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    height: 600px;
    width: 90%;
  }
`;

const ColumnLarge = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 600px;
    width: 100%;
  }
`;

const ImageGAN = styled.img`
  height: 506px;
  width: 800px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 400px;
    height: 253px;
  }
`;

const Description = styled.h1`
  color: white;
  width: 800px;

  @media (max-width: 768px) {
    width: 360px;
  }
`;

export default function Home(props) {
  return (
    <>
      <Head>
        <meta httpEquiv="Refresh" content="1200" />
      </Head>
      <Row>
        <ColumnSmall>
          <div
            style={{
              width: "200px",
            }}
          >
            <Image
              src="/FS_Logo_White.png"
              alt="future studio logo"
              width={1121}
              height={478}
              layout="responsive"
              objectFit="contain"
            />
          </div>
        </ColumnSmall>
        <ColumnLarge>
          <ImageGAN src={props.imageSrc} />
          <Description>{props.description}</Description>
        </ColumnLarge>
      </Row>
    </>
  );
}
