import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: "rgb(209, 209, 214)",
    fontColor: "#000",
    colorAbouMe: "rgb(197, 197, 197)",
    colorDeteilInfo: "#000",
    statusColor: "#000",
    descriptionColor: "#000",
    headerColor: "rgb(140 140 140)",
    EditBack: "rgb(108 107 121)"
};

export const darkTheme = {
    body: "rgb(35, 35, 35)",
    fontColor: "#fff",
    colorAbouMe: "rgb(197, 197, 197)",
    statusColor: "rgb(140 140 140)",
    colorDeteilInfo: "#fff",
    descriptionColor: "#fff",
    headerColor: "rgb(56, 56, 56)"
};

export const GlobalStyles = createGlobalStyle `

	body {

		background-color: ${(props) => props.theme.body};

	}

`;