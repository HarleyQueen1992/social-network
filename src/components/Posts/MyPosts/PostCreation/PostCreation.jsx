// import React, { useEffect } from "react"
// import s from "./PostCreation.module.css"
// import Obelus from "./../../../../assets/images/obelusW.png"
// import save from "./../../../../assets/images/send.png"
// import Music from "./../../../../assets/images/music.png"
// import MusicW from "./../../../../assets/images/musicW.png"
// import Gallery from "./../../../../assets/images/gallery.png"
// import More from "./../../../../assets/images/more.png"
// import Settings from "./../../../../assets/images/settings (1).png"
// import GalleryW from "./../../../../assets/images/galleryW.png"
// import MoreW from "./../../../../assets/images/moreW.png"
// import SettingsW from "./../../../../assets/images/settings (1)W.png"
// import { had } from "../../../Header/Header"

// const PostCreation = props => {
//   // had()
//   // let setIsHeader = () => props.toggleIsHeaderBlur()
//   // useEffect(() => {
//   //   // const hab = props.toggleIsHeaderBlur(false)
//   //   window.addEventListener("mousemove", () => {})
//   //   // function had() {
//   //   //   setIsHeader()
//   //   // }

//   //   // returned function will be called on component unmount

//   //   return setIsHeader => {
//   //     window.removeEventListener("mousemove", () => {
//   //       // setIsHeader()
//   //     })

//   //     console.log("asd")
//   //   }
//   // }, [])
//   let music
//   let more
//   let settings
//   let gallery

//   if (props.theme != "lightTheme") {
//     music = MusicW
//     more = MoreW
//     settings = SettingsW
//     gallery = GalleryW
//   } else {
//     music = Music
//     more = More
//     settings = Settings
//     gallery = Gallery
//   }

//   let newPostElementText = React.createRef()
//   let newPostElementTitle = React.createRef()

//   let addPost = () => {
//     let text = newPostElementText.current.value
//     let title = newPostElementTitle.current.value
//     if (text === "") {
//       props.toggleIsPostCreation(false)
//     } else {
//       props.addPostActionCreator(text, title)
//       props.toggleIsPostCreation(false)
//     }
//   }
//   return (
//     <div className={s.PostCreationBlock}>
//       <div className={s.title}>
//         <textarea
//           maxLength='62'
//           className={s.titleField}
//           ref={newPostElementTitle}
//           autoFocus
//           placeholder='Title'
//         ></textarea>
//       </div>
//       <div className={s.body}>
//         <textarea
//           placeholder='Что нового?'
//           ref={newPostElementText}
//           className={s.fieldInput}
//         ></textarea>
//       </div>
//       <div className={s.bot}>
//         <img src={save} alt='send' />
//       </div>
//     </div>
//   )
// }

// export default PostCreation
