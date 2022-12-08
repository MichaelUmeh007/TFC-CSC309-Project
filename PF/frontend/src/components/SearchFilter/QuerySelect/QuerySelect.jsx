import React from "react";
import Select from "react-select";

import { StyledQuerySelect } from "./QuerySelect.styled";

// Using inspiration and code from: https://github.com/mdeveloper20/reactReminder
const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      padding: 5,
      backgroundColor:'#929ba8'
    }),
  
    control: (_, { selectProps: { width }}) => ({
      width: width
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

const QuerySelect = (props) => {
    return (
        <StyledQuerySelect>
            <h3>Search By:</h3>
            <Select styles={customStyles} options={props.options} onChange={props.onChange} defaultValue={props.defaultValue} />
        </StyledQuerySelect>
    );
}

export default QuerySelect;