import { createGlobalStyle } from "styled-components"

export const lightTheme = {
  body: "#edeef0",
  fontColor: "#000",
  colorAbouMe: "rgb(197, 197, 197)",
  colorDeteilInfo: "#000",
  statusColor: "#000",
  descriptionColor: "#000",
  headerColor: "#adadad",
  EditBack: "rgb(210 195 186)",
  swithThemeBac: "#9e9c9c",
  swithThemeBall: "#232323",
  bacMenu: "rgb(216 74 74)",
  followBtn: "rgb(255 164 164)",
  followBtnHover: "rgb(247, 179, 179)",
  BorderBottom: "rgb(49, 49, 49)",
  bacInput: "rgb(255, 255, 255)",
  bacInputForm: "#c3c3c3",
  HoversaveBut: "#a7a7a7",
}

Object.defineProperty(lightTheme, "toString", {
  value: () => "lightTheme",
  enumerable: false,
})

export const darkTheme = {
  body: "rgb(35, 35, 35)",
  fontColor: "#fff",
  colorAbouMe: "rgb(197, 197, 197)",
  statusColor: "rgb(140 140 140)",
  colorDeteilInfo: "#fff",
  descriptionColor: "#fff",
  headerColor: "rgb(56, 56, 56)",
  EditBack: "rgb(113 113 113)",
  swithThemeBac: "#111",
  swithThemeBall: "#fff",
  bacMenu: "rgb(138 24 24)",
  followBtn: "#484848",
  followBtnHover: "rgb(247, 179, 179)",
  BorderBottom: "rgb(49, 49, 49)",
  bacInput: "rgb(192, 192, 192)",
  bacInputForm: "rgb(49, 49, 49)",
  HoversaveBut: "gray",
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
