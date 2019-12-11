import { render } from 'preact'
import CommentForm from './Form'
import Auth from '../Auth'
import AppUser from '../Auth/AppUser'
import List from './List'

class App extends Auth {
  constructor() {
    super()
    this.list = null
    this.state = {
      auth: {},
    }
  }
  get signedIn() {
    const { auth } = this.state
    const signedIn = auth.github_user || auth.linkedin_user
    return signedIn
  }
  getChildContext() {
    return {
      signedIn: this.signedIn,
      host: this.props.host,
      replyTo: this.state.replyTo,
      setReply: (val) => {
        if (val === null) {
          this.setState({ replyTo: undefined })
        } else {
          const { id, name, expandResponses } = val
          document.querySelector('[data-id="comment-text-area"]').scrollIntoView({
            behavior: 'smooth',
          })
          this.setState({ replyTo: { id, name, expandResponses } })
        }
      },
    }
  }
  render() {
    const { auth, loading, error } = this.state

    return (<div>
      <AppUser error={error} loading={loading} auth={auth} host={this.props.host}
        onSignOut={() => {
          this.setState({ auth: {} })
        }} />

      <CommentForm
        path={`${this.props.host}/comment`} auth={auth}
        submitFinish={async (res) => {
          const { 'error': err, id } = await res.json()
          if (!err && id) {
            debugger
            const { replyTo: { expandResponses } = {} } = this.state
            if (expandResponses) expandResponses(id)
            else if (this.list) this.list.fetch(id)
          }
        }} />

      <List ref={(e) => {
        this.list = e
      }} />

    </div>)
  }
}

window['comments'] = ({
  'host': host = 'https://api.artd.eco', 'container': container = 'preact',
}) => {
  render(<App host={host}/>, document.getElementById(container))
}