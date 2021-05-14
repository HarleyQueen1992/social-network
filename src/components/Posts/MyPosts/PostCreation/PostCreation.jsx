import React from "react"
import s from "./PostCreation.module.css"
import Obelus from "./../../../../assets/images/obelus.png"
import save from "./../../../../assets/images/save.png"
import Music from "./../../../../assets/images/music.png"
import Gallery from "./../../../../assets/images/gallery.png"
import More from "./../../../../assets/images/more.png"
import Settings from "./../../../../assets/images/settings (1).png"

const PostCreation = props => {
  let newPostElement = React.createRef()

  let addPost = () => {
    let text = newPostElement.current.value
    if (text === "") {
      props.toggleIsPostCreation(false)
    } else {
      props.addPostActionCreator(text)
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
          autoFocus
          placeholder='Title'
        ></textarea>
      </div>
      <div className={s.body}>
        <textarea
          placeholder='Что нового?'
          ref={newPostElement}
          className={s.fieldInput}
        ></textarea>
      </div>
      <div className={s.bot}>
        <div>
          <img src={Gallery} alt='gallery' />
        </div>
        <div className={s.musicBlock}>
          <img className={s.music} alt='music' src={Music} />
        </div>
        <div>
          <img alt='more' src={More} />
        </div>
        <div />
        <div>
          <img alt='settings' src={Settings} />
        </div>
      </div>
    </div>
  )
}

export default PostCreation
