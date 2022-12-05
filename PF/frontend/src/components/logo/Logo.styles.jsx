import styled from "styled-components";

var display = 'block'
var mleft = '0px'
var mright = '0px'
var width = "auto"
var height = "100%"

export const StyledLogo = styled.img`
    height: ${props => props.height};
    display: ${props => props.display};
    margin-left: ${props => props.mleft};
    margin-right: ${props => props.mright};
`