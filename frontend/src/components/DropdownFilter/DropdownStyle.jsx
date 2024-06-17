import styled from "styled-components";

export const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
    font-family: var(--second-font);
    justify-content: center;
`;

export const DropdownButton = styled.button`
  background-color: var(--lapis-lazuli);
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;  
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

export const DropdownContent = styled.div`
  display: ${(props) => ((props.show === "true") ? 'flex' : 'none')};
  position: absolute;
  width: max-content;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const OptionLabel = styled.label`
    display: block;
    margin: auto;
    padding: 1vh;
    cursor: pointer;
    color: var(--oxion);
    font-weight: 400;
    
    &:hover {
        background-color: #f1f1f1;
    }
`;

export const NestedSelects = styled.div`
    display:flex;
    padding: 1vh;
    color: var(--oxion);
    font-weight: 400;
    font-family: var(--second-font);
`;

export const NestedLabel = styled.label`
    display: block;
    padding: 1vh;
    color: var(--oxion);
    font-weight: 400;
`;
