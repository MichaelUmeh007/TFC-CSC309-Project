import styled from "styled-components";

export const StyledStudios = styled.div`
    width: 100%;
    height: 70%;

    .split-screen {
        display: flex;
        flex-wrap: nowrap;
    }
    
    .split-screen .list-column {
        flex: 50%;
    }
    
    .split-screen .map-column {
        flex: 60%;
    }
`
// div.list-column {
//     flex: 50%;
//     padding: 10px;
//     height: 300px;
// }

// div.map-column {
//     flex: 50%;
//     padding: 10px;
// }