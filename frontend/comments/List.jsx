import { Component } from 'preact'
import fetch from 'unfetch'
import './style.css'

export default class List extends Component {
  constructor() {
    super()
    this.state = {
      /** @type {!Array<WebsiteComment>} */
      comments: [],
      page: 0,
      csrf: null,
    }
  }
  componentDidMount() {
    this.fetch()
  }
  serialize(obj) {
    let str = []
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        const val = obj[p]
        if (val === undefined) continue
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val))
      }
    const s = str.join("&")
    if (!s.length) return ''
    return `?${s}`
  }
  /**
   * @param {string} [id]
   * @param {string} [lastCommentId]
   */
  async fetch(id, lastCommentId) {
    this.setState({ loading: true })
    const { host } = this.context
    const { responseTo } = this.props
    const i = this.serialize({
      id,
      'reply-to': responseTo,
      'last-comment-id': lastCommentId,
    })
    try {
      const f = await fetch(`${host}/json-comments${i}`, {
        credentials: 'include',
      })
      const { 'comments': comments, csrf } = await f.json()
      const c = lastCommentId ? [...this.state.comments, ...comments] :
        [...comments, ...this.state.comments]
      this.setState({ comments: c, csrf })
    } catch(err) {
      this.setState({ error: err.message })
    } finally {
      this.setState({ loading: false })
    }
  }
  render({ totalItems = Infinity }) {
    const { error, loading, comments, csrf } = this.state
    console.log(totalItems, comments.length)
    // debugger
    if (error)
      return (<div>Error loading list: {error}</div>)

    return (<div className="CommentsList">
      {comments.map((comment) => {
        return (<Item list={this} key={comment._id} comment={comment} csrf={csrf} onRemove={(id) => {
          this.setState({
            comments: comments.filter(({ _id }) => {
              return _id != id
            }),
          })
        }} />)
      })}
      {loading && <div>Loading list...</div>}
      {!comments.length && <div>No comments yet.</div>}

      {(!!comments.length && totalItems > comments.length) && <a onClick={(ev) => {
        ev.preventDefault()
        this.fetch(undefined, comments[comments.length - 1]._id)
        return false
      }} href="#">Load more</a>}
    </div>)
  }
}

const Login = ({ github_user }) => {
  if (!github_user) return null
  return (<span> (
    <a href={github_user.html_url}>{github_user.login}</a>)
  </span>)
}

class Item extends Component {
  constructor() {
    super()
    this.list = null
  }
  /**
   * @param {!Object} [opts]
   * @param {!WebsiteComment} [opts.comment]
   */
  render({ comment: {
    _id, country, isAuthor, name, photo, comment, date, github_user,
    replies }, onRemove, csrf }) {
    const { signedIn, host, setReply } = this.context
    const { expandResponses } = this.state
    return (<div className="comment">
      <strong>{name || 'Anonymous'}</strong>{<Login github_user={github_user}/>}
      {country ? ` from ${country}`: ''}
      {' '}on <em>{new Date(date).toLocaleString()}</em> {isAuthor && <a className="badge badge-danger" href="#" onClick={async (e) => {
        e.preventDefault()
        const c = confirm('Are you sure you want to delete comment?')
        if (!c) return false
        try {
          const f = await fetch(`${host}/remove-comment?csrf=${csrf}&id=${_id}`, {
            credentials: 'include',
          })
          const { error: er } = await f.json()
          if (er) alert(er)
          else onRemove(_id)
        } catch(err) {
          alert(err.message)
        }
        return false
      }}>
        Remove
      </a>} <a className="badge badge-primary" href="#" style={signedIn ? undefined : 'color:grey' } onClick={(ev) => {
        ev.preventDefault()
        if (!signedIn) alert('Please sign in to reply')
        else setReply({ id: _id, name, expandResponses: (id) => {
          if (this.list) this.list.fetch(id)
          else this.setState({ expandResponses: true })
        } })
        return false
      }}>Reply</a>
      <div data-comment={_id} className="LCommentBlock">
        {photo && <div>
          <img src={photo} />
        </div>}
        <div>
          {comment}
          {!expandResponses && <ReplyBtn onClick={(ev) => {
            ev.preventDefault()
            this.setState({ expandResponses: true })
            return false
          }} replies={replies} />}
        </div>
      </div>
      {expandResponses && <div data-comment={_id} className="LCommentBlock">
        <div style="width:50px;"/>
        <div>
          <List ref={(list) => {
            this.list = list
          }} responseTo={_id} totalItems={replies}/>
        </div>
      </div>}
    </div>)
  }
}

const ReplyBtn = ({ replies, onClick }) => {
  if (!replies) return null
  return (<div>
    <a href="#" onClick={onClick}>Load {replies} repl{replies > 1 ? 'ies' : 'y'}</a>
  </div>)
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').WebsiteComment} WebsiteComment
 */