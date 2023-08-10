import type { NextPage } from "next";

import { useRouter } from "next/router";
import styled from "styled-components";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <h1>Welcome to ButfitSeoul boilerplate</h1>
      <Button onClick={() => router.push("/googlesheet")}>
        <span>구글 시트 샘플 보기</span>
      </Button>
      <Button
        onClick={() => router.push("/spotify")}
        style={{ background: "blue" }}
      >
        <span>스포티파이 샘플 보기</span>
      </Button>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  background: #79a4c5;
  border: none;
  border-radius: 10px;

  & span {
    color: #fff;
    font-weight: bold;
  }
`;
