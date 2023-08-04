import styled from "styled-components";

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background-color:  cadetblue;
`;

export const PersonList = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background: transparent;
`;

export const PersonLine = styled.div`
  display: flex;
  height: 45px;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  &:nth-child(even) {
    background-color: lightgreen;
  }
`;

export const PersonForm = styled(PersonList)`
  flex-direction: row;
  margin: 50px 0;
  padding-top: 0;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled.input`
  width: 130px;
  height: 25px;
  padding-left: 10px;
`;
export const Button = styled.button`
  width: 120px;
  height: 20px;
`;

export const SwitchButtons = styled(PersonForm)`
  margin: 30px 0;
  height: 40px;
`;

export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48%;
  border: 1px solid white;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
  ${(props) => {
    if (props.name === props["data-active"]) {
      return `background-color:rgba(255,255,255,0.3)`;
    }
  }}
`;

export const WorkForm = styled(PersonForm)`
  flex-direction: column;
`;