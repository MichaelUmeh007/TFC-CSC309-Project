import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    @font-face {
        font-family: 'Alexandria', sans-serif;
        src: url('https://fonts.googleapis.com/css2?family=Alexandria:wght@500&display=swap'),
        src: url('https://fonts.googleapis.com/css2?family=Alexandria:wght@700&display=swap');
    }
}
`;
