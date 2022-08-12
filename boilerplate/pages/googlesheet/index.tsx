import React from 'react'

import { useState } from "react";

import styled from 'styled-components';

interface IData {
  [key: string]: string;
}

const GoogleSheet = () => {
  const [data, setData] = useState<IData | null>(null)

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
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const content = await res.json();
    alert(content.data);
  };
  return (
    <Wrapper onSubmit={onSubmit}>
      <h2>구글 시트 입력</h2>
      <div className='form__input'>
        <p className='form__input-label'>
          이름
        </p>
        <input type="text" name={"이름"} value={data?.name} onChange={onChange} />
      </div>
      <div className='form__input'>
        <p className='form__input-label'>
          번호
        </p>
        <input
          type="text"
          name={"번호"}
          value={data?.phone_number}
          onChange={onChange}
        />
      </div>
      <div className='form__input'>
        <p className='form__input-label'>
          이메일
        </p>
        <input
          type="text"
          name={"이메일"}
          value={data?.email}
          onChange={onChange}
        />
      </div>
      <Button type={"submit"}>
        <span>저장</span>
      </Button>
    </Wrapper>
  )
}

export default GoogleSheet;

const Wrapper = styled.form`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
  & h2{
    color: #4d4d4d;
    margin-bottom: 50px;
  }

  & input{
    width: 200px;
    height: 35px;
    border-radius:  5px;
    border: 1px solid #8f9091;
    text-indent: 10px;

    :focus{
      outline: none;
    }
  }

  & .form__input{
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  & .form__input > .form__input-label{
    color: #4d4d4d;
    margin-right: 10px;
  }


`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  background: #79a4c5;
  border: none;
  border-radius: 10px;

  & span{
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
  `;