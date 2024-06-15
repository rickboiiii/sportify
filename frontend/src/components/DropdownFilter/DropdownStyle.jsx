import styled from "styled-components";

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
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
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const OptionLabel = styled.label`
  display: block;
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const NestedSelects = styled.div`
  display:flex;
  margin-top: 10px;
`;

export const NestedLabel = styled.label`
  display: block;
  margin: 10px 0;
`;
