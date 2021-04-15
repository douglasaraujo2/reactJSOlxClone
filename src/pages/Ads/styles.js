import styled from "styled-components";


export const PageArea = styled.div`
    display:flex;
    margin-top: 20px;

`;


export const LeftContainer = styled.div`
    width: 250px;
    margin-right: 10px;

    .filterName{
        font-size:15px;
        margin: 10px 0;
    }

    input, select{
        width: 100%;
        height: 40px;
        border: 2px solid #9bb83c;
        border-radius: 5px;
        outline: 0;
        font-size: 15px;
        color: #000;
        padding: 5px;
    }

    ul , li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .categoryItem{
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        color :#000;
        cursor: pointer;
        
        img{
            width: 25px;
            height: 25px;
            margin-right: 5px;
        }
        span{
            font-size: 14px;
        }
    }

    .categoryItem:hover,
    .categoryItem.active{
        background-color: #9bb83c;
        color:#fff;
    }
`;


export const RightContainer = styled.div`
    flex: 1;
    h2{
        margin-top:0;
        font-size:18px;
    }
`;

export const AdList = styled.div`
    display:flex;
    flex-wrap: wrap;
    opacity:  ${props => props.opacity ? props.opacity : 1};
    .itemAd{
        width: 33%;
    }
`;

export const ListWarning = styled.div`
    padding: 30px;
    text-align: center;
`;

export const Pagination = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;
    flex-wrap: wrap;
    margin: 10px 0;
`;

export const PaginationItem = styled.div`
    display: ${props => props.showItem ? 'flex' : 'none'};
    width:  30px;
    height: 30px;
    border: 1px solid #000;
    align-items: center;
    justify-content:center;
    font-size: 14px;
    margin: 5px;
    cursor:pointer; 
    &:hover{
        background: #000;
        color: #fff;
    }
`;

