import { createGlobalStyle } from "styled-components"

export const light = {
  body: "#f0f2f5",
  headItem: "#0000000d",
  header: "#fff",
  headerSmall: "#fff",
  borderHeader: "#fff",
  logo: "#1877f2",
  menuItemBac: "#fff",
  menuItemBacHover: "rgba(78, 78, 78, 0.164)",
  bacNavBarImg: "#e4e6eb",
  fontColor: "#000",
  navBarBac: "#ffffff",
  colorAbouMe: "#000",
  colorDeteilInfo: "#000",
  statusColor: "#000",
  descriptionColor: "#000",
  headerColor: "#adadad",
  EditBack: "#a9b5bf",
  swithThemeBac: "#9e9c9c",
  swithThemeBall: "#232323",
  bacPost: "#fff",
  bacSearch: "#1877f2",
  bacSearchHover: "#1877f2bf",
  bacMenu: "#e4e6eb",
  hoverBacMenu: "#ced1d8",
  followBtn: "rgb(255 164 164)",
  followBtnHover: "rgb(247, 179, 179)",
  BorderBottom: "#ced0d4",
  bacInput: "rgba(0, 0, 0, 0.267)",
  bacInputBorder: "rgba(0, 0, 0, 0.267)",
  bacInputForm: "#c3c3c3",
  HoversaveBut: "#a7a7a7",
  bbLogin: "#000",
  bacInputLogin: "rgb(197, 197, 197)",
  error: "black",
  statusHover: "#aac1ca8c",
  usersListItemHover: "#dde0e2",
  anythingNew: "rgba(0, 0, 0, 0.075)",
  anythingNewHover: "rgba(0, 0, 0, 0.116)",
  editProfileBlock: "#0000001a",
  editProfileBlockHover: "rgba(0, 0, 0, 0.151)",
  editInfo: "rgba(0, 0, 0, 0.11)",
}

Object.defineProperty(light, "toString", {
  value: () => "light",
  enumerable: false,
})

export const dark = {
  body: "#18191a",
  headItem: "rgb(65, 64, 64)",
  header: "#242526",
  headerSmall: "#18191a",
  borderHeader: "#3e4042",
  logo: "#fff",
  menuItemBac: "#3a3b3c",
  menuItemBacHover: "rgba(255, 255, 255, 0.178)",
  bacSearch: "#ffffff1a",
  bacSearchHover: "#ffffff2e",
  bacNavBarImg: "#ffffff1a",
  navBarBac: "#242526",
  fontColor: "#fff",
  bacPost: "#242526",
  colorAbouMe: "rgb(197, 197, 197)",
  statusColor: "rgba(255, 255, 255, 0.623)",
  colorDeteilInfo: "#fff",
  descriptionColor: "#fff",
  headerColor: "#2e353e",
  EditBack: "#4a4a4a",
  swithThemeBac: "#4e4e4e",
  swithThemeBall: "#fff",
  bacMenu: "#ffffff1a",
  hoverBacMenu: "#535353",
  followBtn: "#2f2a56",
  followBtnHover: "#3b3475",
  BorderBottom: "#3e4042",
  bacInput: "rgba(255, 255, 255, 0.267)",
  bacInputBorder: "rgba(255, 255, 255, 0.267)",
  bacInputForm: "#25292f",
  HoversaveBut: "rgb(81, 81, 100)",
  bbLogin: "rgb(224, 173, 173)",
  bacInputLogin: "rgb(255, 255, 255)",
  error: "red",
  statusHover: "#ffffff49",
  usersListItemHover: "rgba(255, 255, 255, 0.068)",
  anythingNew: "rgba(255, 255, 255, 0.075)",
  anythingNewHover: "rgba(255, 255, 255, 0.151)",
  editProfileBlock: "#ffffff1a",
  editProfileBlockHover: "#ffffff36",
  editInfo: "rgba(255, 255, 255, 0.11)",
  exitEditMenu: "rgba(255, 255, 255, 0.158)",
  exitEditMenuHover: "rgba(255, 255, 255, 0.267)"
}

Object.defineProperty(dark, "toString", {
  value: () => "dark",
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
