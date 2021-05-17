import React from "react"
import s from "./PostCreation.module.css"
import Obelus from "./../../../../assets/images/obelusW.png"
import save from "./../../../../assets/images/saveW.png"
import Music from "./../../../../assets/images/music.png"
import MusicW from "./../../../../assets/images/musicW.png"
import Gallery from "./../../../../assets/images/gallery.png"
import More from "./../../../../assets/images/more.png"
import Settings from "./../../../../assets/images/settings (1).png"
import GalleryW from "./../../../../assets/images/galleryW.png"
import MoreW from "./../../../../assets/images/moreW.png"
import SettingsW from "./../../../../assets/images/settings (1)W.png"

const PostCreation = props => {
  let music
  let more
  let settings
  let gallery

  if (props.theme != "lightTheme") {
    music = MusicW
    more = MoreW
    settings = SettingsW
    gallery = GalleryW
  } else {
    music = Music
    more = More
    settings = Settings
    gallery = Gallery
  }

  let newPostElementText = React.createRef()
  let newPostElementTitle = React.createRef()

  let addPost = () => {
    let text = newPostElementText.current.value
    let title = newPostElementTitle.current.value
    if (text === "") {
      props.toggleIsPostCreation(false)
    } else {
      props.addPostActionCreator(text, title)
      props.toggleIsPostCreation(false)
    }
    props.toggleIsHeaderBlur(false)
  }
  return (
    <div className={s.PostCreationBlock}>
      <header className={s.header}>
        <div
          className={s.back}
          onClick={() => {
            props.toggleIsPostCreation(false)
            props.toggleIsHeaderBlur(false)
          }}
        >
          <img className={s.obelus} alt='obelus' src={Obelus} />
        </div>
        <div className={s.newPost}>New post</div>
        <div className={s.save} onClick={addPost}>
          <img className={s.tick} alt='save' src={save} />
        </div>
      </header>
      <div className={s.title}>
        <textarea
          maxLength='62'
          className={s.titleField}
          ref={newPostElementTitle}
          autoFocus
          placeholder='Title'
        ></textarea>
      </div>
      <div className={s.body}>
        <textarea
          placeholder='Что нового?'
          ref={newPostElementText}
          className={s.fieldInput}
        ></textarea>
      </div>
      <div className={s.bot}>
        <div>
          <img src={gallery} alt='gallery' />
        </div>
        <div className={s.musicBlock}>
          <img className={s.music} alt='music' src={music} />
        </div>
        <div>
          <img alt='more' src={more} />
        </div>
        <div />
        <div>
          <img alt='settings' src={settings} />
        </div>
      </div>
    </div>
  )
}

export default PostCreation
