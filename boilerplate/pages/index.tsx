import type { NextPage } from "next";

import axios from "axios";
import { google } from "googleapis";

import { useState } from "react";
import styled from "styled-components";

interface IData {
  [key: string]: string;
}

const Home: NextPage = () => {
  const [data, setData] = useState<IData | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (data) {
      setData({ ...data, [name]: value });
    } else {
      setData({ [name]: value });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = data;

    const res = await fetch("/api/writeSheet", {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const content = await res.json();
    alert(content.data);
  };

  return (
    <Wrapper onSubmit={onSubmit}>
      <h2>Welcome to ButfitSeoul boilerplate :)</h2>
      <input type="text" name={"name"} value={data?.name} onChange={onChange} />
      <input
        type="text"
        name={"phone_number"}
        value={data?.phone_number}
        onChange={onChange}
      />
      <input
        type="text"
        name={"email"}
        value={data?.email}
        onChange={onChange}
      />
      <button type={"submit"}>저장</button>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.form`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
