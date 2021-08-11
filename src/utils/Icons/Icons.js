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

import MenuWhite from "./../../assets/images/menuWhite.png"
import MenuBlack from "./../../assets/images/menuBlack.png"
import MenuBlueActive from "./../../assets/images/menuBlueActive.png"

import SearchBlack from "./../../assets/images/searchBlack.png"
import SearchWhite from "./../../assets/images/searchWhite.png"

import EditBlack from './../../assets/images/editBlack.png'
import EditWhite from './../../assets/images/editWhite.png'

import FilterBlack from './../../assets/images/filterBlack.png'
import FilterWhite from './../../assets/images/filterWhite.png'

import BirthdayWhite from './../../assets/images/birthdayWhite.png'
import BirthdayBlack from './../../assets/images/birthdayBlack.png'

import LocationWhite from './../../assets/images/cityWhite.png'
import LocationBlack from './../../assets/images/cityBlack.png'

import AboutMeWhite from './../../assets/images/aboutMeWhite.png'
import AboutMeBlack from './../../assets/images/aboutMeBlack.png'

import PasswordWhite from "./../../assets/images/passwordWhite.png"
import PasswordBlack from "./../../assets/images/passwordBlack.png"

import CheckMarkWhite from './../../assets/images/checkMarkWhite.png'
import CheckMarkBlack from './../../assets/images/checkMarkBlack.png'
import CheckMarkBlue from './../../assets/images/checkMarkBlue.png'


import GitHub from "./../../assets/images/github.png"
import vk from "./../../assets/images/vk.png"
import facebook from "./../../assets/images/facebook.png"
import inst from "./../../assets/images/inst.png"
import twitter from "./../../assets/images/twitter.png"
import youtube from "./../../assets/images/youtube.png"
import website from "./../../assets/images/website.png"
import mainLink from "./../../assets/images/mainLink.png"

export const Icons = (theme, index = NaN) => {
  let themeLight = 'lightTheme'
  return {
    home:
      theme == themeLight
        ? index == 0
          ? HomeBlueActive
          : HomeBlack
        : index == 0
        ? HomeBlueActive
        : HomeWhite,
    profile:
      theme == themeLight
        ? index == 1
          ? ProfileBlueActive
          : ProfileBlack
        : index == 1
        ? ProfileBlueActive
        : ProfileWhite,
    posts:
      theme == themeLight
        ? index == 2
          ? PostsBlueActive
          : PostsBlack
        : index == 2
        ? PostsBlueActive
        : PostsWhite,
    users:
      theme == themeLight
        ? index == 3
          ? UsersBlueActive
          : UsersBlack
        : index == 3
        ? UsersBlueActive
        : UsersWhite,
    friends:
      theme == themeLight
        ? index == 4
          ? FriendsBlueActive
          : FriendsBlack
        : index == 4
        ? FriendsBlueActive
        : FriendsWhite,
    arrowDown: theme == themeLight ? ArrowDownBlack : ArrowDownWhite,
    settings: theme == themeLight ? SettingsBlack : SettingsWhite,
    logOut: theme == themeLight ? LogOutBlack : LogOutWhite,
    giveFeedback: theme == themeLight ? ErrorMessageBlack : ErrorMessageWhite,
    menu:
      theme == themeLight
        ? index == 5
          ? MenuBlueActive
          : MenuBlack
        : index == 5
        ? MenuBlueActive
        : MenuWhite,
    search: theme == themeLight ? SearchBlack : SearchWhite,
    edit: theme == themeLight ? EditBlack : EditWhite,
    filter: theme == themeLight ? FilterBlack : FilterWhite,
    birthday: theme == themeLight ? BirthdayBlack : BirthdayWhite ,
    location: theme == themeLight ? LocationBlack : LocationWhite,
    aboutMe: theme == themeLight ? AboutMeBlack : AboutMeWhite,
    password: theme == themeLight ? PasswordBlack :PasswordWhite,
    checkMark:CheckMarkBlue
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
