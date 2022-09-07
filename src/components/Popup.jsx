import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    diplay: flex
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    position: relative;
    padding: 32px;
    width: 100%;
    max-width: 640px;
    background-color: #FFF;
`;


function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <Container>
            <Content>
                <button onClick={(e) => props.handler(e)}>close</button>
                {props.children}
            </Content>
            </Container>
        </div>
    ) : "";
}

export default Popup