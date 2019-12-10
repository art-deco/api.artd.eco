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
  render() {
    const { auth, loading, replyTo } = this.state
    const signedIn = auth.github_user || auth.linkedin_user

    return (<div>
      <AppUser error={this.state.error} loading={loading} auth={auth} host={this.props.host} onSignOut={() => {
        this.setState({ auth: {} })
      }} />

      <CommentForm signedIn={signedIn} replyTo={replyTo} host={this.props.host}
        path={`${this.props.host}/comment`} auth={auth}
        setReply={(val) => {
          if (val === null) {
            this.setState({ replyTo: undefined })
          } else {
            // no way
          }
        }}
        submitFinish={async (res) => {
          const { 'error': error, id } = await res.json()
          if (!error && id) {
            if (this.list) this.list.fetch(id)
          }
        }} />

      <List setReply={({ id, name }) => {
        document.querySelector('[data-id="comment-text-area"]').scrollIntoView({
          behavior: 'smooth',
        })
        this.setState({ replyTo: { id, name } })
      }} signedIn={signedIn} host={this.props.host} ref={(e) => {
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