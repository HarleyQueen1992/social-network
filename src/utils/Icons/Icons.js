import GitHubWhite from "./../../assets/images/githubWhite.png"
import vkWhite from "./../../assets/images/vkWhite.png"
import facebookWhite from "./../../assets/images/facebookWhite.png"
import instWhite from "./../../assets/images/instWhite.png"
import twitterWhite from "./../../assets/images/twitterWhite.png"
import youtubeWhite from "./../../assets/images/youtubeWhite.png"
import websiteWhite from "./../../assets/images/websiteWhite.png"
import mainLinkWhite from "./../../assets/images/mainLinkWhite.png"

import HomeWhite from "./../../assets/images/homeWhite.png"
import HomeBlack from "./../../assets/images/homeBlack.png"
import HomeBlueActive from "./../../assets/images/homeBlueActive.png"

import ProfileWhite from "./../../assets/images/profileWhite.png"
import ProfileBlack from "./../../assets/images/profileBlack.png"
import ProfileBlueActive from "./../../assets/images/profileBlueActive.png"

import PostsWhite from "./../../assets/images/postsWhite.png"
import PostsBlack from "./../../assets/images/postsBlack.png"
import PostsBlueActive from "./../../assets/images/postsBlueActive.png"

import UsersWhite from "./../../assets/images/usersWhite.png"
import UsersBlack from "./../../assets/images/usersBlack.png"
import UsersBlueActive from "./../../assets/images/usersBlueActive.png"

import FriendsWhite from "./../../assets/images/friendsWhite.png"
import FriendsBlack from "./../../assets/images/friendsBlack.png"
import FriendsBlueActive from "./../../assets/images/friendsBlueActive.png"

import ArrowDownWhite from "./../../assets/images/arrowDownWhite.png"
import ArrowDownBlack from "./../../assets/images/arrowDownBlack.png"

import SettingsWhite from "./../../assets/images/settingsWhite.png"
import SettingsBlack from "./../../assets/images/settingsBlack.png"

import LogOutWhite from "./../../assets/images/logOutWhite.png"
import LogOutBlack from "./../../assets/images/logOutBlack.png"

import ErrorMessageWhite from "./../../assets/images/errorMessageWhite.png"
import ErrorMessageBlack from "./../../assets/images/errorMessageBlack.png"

import GitHub from "./../../assets/images/github.png"
import vk from "./../../assets/images/vk.png"
import facebook from "./../../assets/images/facebook.png"
import inst from "./../../assets/images/inst.png"
import twitter from "./../../assets/images/twitter.png"
import youtube from "./../../assets/images/youtube.png"
import website from "./../../assets/images/website.png"
import mainLink from "./../../assets/images/mainLink.png"

export const Icons = (theme, index = NaN) => {
  return {
    home:
      theme == "lightTheme"
        ? index == 0
          ? HomeBlueActive
          : HomeBlack
        : index == 0
        ? HomeBlueActive
        : HomeWhite,
    profile:
      theme == "lightTheme"
        ? index == 1
          ? ProfileBlueActive
          : ProfileBlack
        : index == 1
        ? ProfileBlueActive
        : ProfileWhite,
    posts:
      theme == "lightTheme"
        ? index == 2
          ? PostsBlueActive
          : PostsBlack
        : index == 2
        ? PostsBlueActive
        : PostsWhite,
    users:
      theme == "lightTheme"
        ? index == 3
          ? UsersBlueActive
          : UsersBlack
        : index == 3
        ? UsersBlueActive
        : UsersWhite,
    friends:
      theme == "lightTheme"
        ? index == 4
          ? FriendsBlueActive
          : FriendsBlack
        : index == 4
        ? FriendsBlueActive
        : FriendsWhite,
    arrowDown: theme == "lightTheme" ? ArrowDownBlack : ArrowDownWhite,
    settings: theme == "lightTheme" ? SettingsBlack : SettingsWhite,
    logOut: theme == "lightTheme" ? LogOutBlack : LogOutWhite,
    giveFeedback: theme == "lightTheme" ? ErrorMessageBlack : ErrorMessageWhite,
  }
}
// export const Icons = {
//   github: GitHub,
//   vk: vk,
//   facebook: facebook,
//   instagram: inst,
//   twitter: twitter,
//   youtube: youtube,
//   website: website,
//   mainLink: mainLink,
// }

export const IconsWhite = {
  github: GitHubWhite,
  vk: vkWhite,
  facebook: facebookWhite,
  instagram: instWhite,
  twitter: twitterWhite,
  youtube: youtubeWhite,
  website: websiteWhite,
  mainLink: mainLinkWhite,
}
