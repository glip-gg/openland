import styled from "styled-components";


const Title = styled.div`
    font-family: 'Chakra Petch';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #FFFFFF;
    margin-top: 32px;
    margin-bottom: 18px;
`;

/*
    Title with margins and styling
*/ 
export default function FilterSectionTitle(props: any) {        

    return (
        <Title>{props.children}</Title>
    );
}
