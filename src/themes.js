import { createGlobalStyle } from "styled-components"

export const lightTheme = {
  body: "#edeef0",
  fontColor: "#000",
  colorAbouMe: "rgb(197, 197, 197)",
  colorDeteilInfo: "#000",
  statusColor: "#000",
  descriptionColor: "#000",
  headerColor: "#adadad",
  EditBack: "#a9b5bf",
  swithThemeBac: "#9e9c9c",
  swithThemeBall: "#232323",
  bacMenu: "rgb(216 74 74)",
  followBtn: "rgb(255 164 164)",
  followBtnHover: "rgb(247, 179, 179)",
  BorderBottom: "rgb(49, 49, 49)",
  bacInput: "rgb(255, 255, 255)",
  bacInputBorder: "#cdd1e8",
  bacInputForm: "#c3c3c3",
  HoversaveBut: "#a7a7a7",
  bbLogin: "#000",
  bacInputLogin: "rgb(197, 197, 197)",
  error: "black",
  statusHover: "#aac1ca8c",
}

Object.defineProperty(lightTheme, "toString", {
  value: () => "lightTheme",
  enumerable: false,
})

export const darkTheme = {
  body: "#18191a",
  fontColor: "#fff",
  colorAbouMe: "rgb(197, 197, 197)",
  statusColor: "rgb(140 140 140)",
  colorDeteilInfo: "#fff",
  descriptionColor: "#fff",
  headerColor: "#2e353e",
  EditBack: "#4a4a4a",
  swithThemeBac: "#4e4e4e",
  swithThemeBall: "#fff",
  bacMenu: "rgb(138 24 24)",
  followBtn: "#2f2a56",
  followBtnHover: "#3b3475",
  BorderBottom: "#3e4042",
  bacInput: "#25292f",
  bacInputBorder: "#333333",
  bacInputForm: "#25292f",
  HoversaveBut: "rgb(81, 81, 100)",
  bbLogin: "rgb(224, 173, 173)",
  bacInputLogin: "rgb(255, 255, 255)",
  error: "red",
  statusHover: "#ffffff49",
}

Object.defineProperty(darkTheme, "toString", {
  value: () => "darkTheme",
  enumerable: false,
})

// darkTheme.prototype.toString = () => {
//     return 'darkTheme'
// }

// export const GlobalStyles = createGlobalStyle `

// 	body {

// 		background-color: ${(props) => props.theme.body};

// 	}

// `;
