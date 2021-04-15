import styled from "styled-components";

export const Fake = styled.div`
  background-color: #DDD;
  height: ${props => props.height || 20}px;
`;

export const PageArea = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const LeftContainer = styled.div`
  flex: 1;
  margin-right: 20px; 
`;

export const AdImage = styled.div`
  width: 320px;
  height: 320px;
  margin-right:20px;

  .each-slide img{
    display:flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    height: 320px;
  }

`;

export const AdTitle = styled.h2`
  margin:0;
  margin-top: 20px;
`;

export const AdSmall = styled.small`
  color: #999;
`;

export const AdInfo = styled.div`
  flex:1;
`;
export const AdName = styled.div`
  margin-bottom: 20px;
`;
export const AdDescription = styled.div`

`;

export const RightContainer = styled.div`
  width: 250px;
`;

export const Box = styled.div`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #999;
  margin-bottom: 20px;
  &.box--padding{
    padding:10px;
  }
  &.left{
    display: flex;
  }
  &.createdBy{
    small{
      display: block;
      color: #999;
      margin-top: 10px;
    }
    strong{
      display: block;
    }
  }
`;

export const SellerLink = styled.a`
  background: #0000ff;
  color:#fff;
  height: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px #999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-bottom: 20px;
`;


export const AdPrice = styled.div`
  span{
    color: #0000ff;
    display: block;
    font-size: 27px;
    font-weight: bold;

  }
`;


export const AdList = styled.div`
  display: flex;
  flex-wrap: wrap;
  .itemAd{
    width: 25%;
  }

`;
export const OthersArea = styled.div`
  h2{
    font-size:20px;
  }
  
`;

export const BreadCrumb = styled.div`
  font-size:13px;
  margin-top: 20px;
  a{
    display: inline-block;
    margin: 0 5px;
    text-decoration: underline;
    color: #000;
  }

`;