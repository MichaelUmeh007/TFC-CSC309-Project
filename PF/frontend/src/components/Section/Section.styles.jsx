import styled from "styled-components"
import { Link } from "react-router-dom"

const padding = '0em'
const margin = '0em'
const color = 'black'
const background = 'cornflowerblue'

export const Section = styled.section`
    color: ${color};
    padding: ${padding};
    margin: ${margin};
    background: ${background};

    render(
        <Section>
        </Section>
    )
`