import { Component } from 'preact'
import fetch from 'unfetch'
import './style.css'

export default class List extends Component {
  constructor() {
    super()
    this.state = {
      /** @type {!Array<Comment>} */
      comments: [],
      page: 0,
      csrf: null,
    }
  }
  componentDidMount() {
    this.fetch()
  }
  /**
   * @param {string} [id]
   */
  async fetch(id) {
    this.setState({ loading: true })
    const i = id ? `?id=${id}` : ''
    try {
      const f = await fetch(`${this.props.host}/json-comments${i}`, {
        credentials: 'include',
      })
      const { 'comments': comments, csrf } = await f.json()
      this.setState({ comments: [...comments, ...this.state.comments], csrf })
    } catch(err) {
      this.setState({ error: err.message })
    } finally {
      this.setState({ loading: false })
    }
  }
  render() {
    const { error, loading, comments, csrf } = this.state
    const { signedIn, host, setReply } = this.props
    if (error)
      return (<div>Error loading list: {error}</div>)
    if (loading)
      return (<div>Loading list...</div>)

    return (<div className="CommentsList">
      {comments.map((comment) => {
        return (<Item setReply={setReply} signedIn={signedIn} key={comment._id} comment={comment} csrf={csrf} host={host} onRemove={(id) => {
          this.setState({
            comments: comments.filter(({ _id }) => {
              return _id != id
            }),
          })
        }} />)
      })}</div>)
  }
}

const Login = ({ github_user }) => {
  if (!github_user) return null
  return (<span> (
    <a href={github_user.html_url}>{github_user.login}</a>)
  </span>)
}
/**
 * @param {Object} opts
 * @param {WebsiteComment} opts.comment
 */
const Item = ({ comment: { _id, country, isAuthor, name, photo, comment, date, github_user },
  onRemove, csrf, host, setReply, signedIn }) => {
  return (<div className="comment">
    <strong>{name || 'Anonymous'}</strong>{<Login github_user={github_user}/>}
    {country ? ` from ${country}`: ''}
    {' '}on <em>{new Date(date).toLocaleString()}</em> {isAuthor && <a href="#" onClick={async (e) => {
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
    </a>} <a href="#" style={signedIn ? undefined : 'color:grey' } onClick={(ev) => {
      if (!signedIn) alert('Please sign in to reply')
      else setReply({ id: _id, name })
      ev.preventDefault()
      return false
    }}>Reply</a>
    <div data-comment={_id} className="LCommentBlock">
      {photo && <div>
        <img src={photo} />
      </div>}
      <div>
        {comment}
      </div>
    </div>
  </div>)
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../').WebsiteComment} WebsiteComment
 */