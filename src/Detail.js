import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { stockContext } from './App.js';

let box = styled.div`
  padding: 20px;
`;

let box2 = styled.h4`
  font-size: 25px;
`;

function Detail(props) {
  
  let [alert, setAlert] = useState(true);
  let [inputVal, setInputVal] = useState('');

  useEffect(()=>{ 
    let timer = setTimeout(()=>{
      setAlert(false);
    },2000)
    return ()=>{
      clearTimeout(timer);
    }
    //return function fadeout() {
      // 사라질때 실행
    //}
  },[alert]);

  let { id } = useParams();
  let findId = props.shoes.find(function(shoesId){
    return shoesId.id == id
  });
  let history = useHistory();

  return(
    <div className="container">
      <div>
        <h4 className="red">Detail</h4>
      </div>
      {inputVal}
      <input onChange={(e)=>{setInputVal(e.target.value)}}></input>

      {
        alert == true ? <AlertBox></AlertBox> : null
      }
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{findId.title}</h4>
          <p>{findId.content}</p>
          <p>{findId.price}원</p>
          <Info></Info>
          <button className="btn btn-danger" onClick={()=>{

          }}>주문하기</button> &nbsp;
          <button className="btn btn-danger" onClick={()=>{
            history.goBack();
          }}>뒤로가기</button>
        </div>
      </div>
    </div>
  );
}

function AlertBox() {
  return(
    <div className="my-alert">
      <p>재고가 얼마 남지 않았습니다.</p>
    </div>
  );
}

function Info() {
  let stock = useContext(stockContext);
  return <p>{stock}</p>
}

export default Detail;