import { Component } from 'preact'
import { FormGroup } from '@depack/form'
import { checkSubscribed, subscribe } from '../client'

export default class Subscriptions extends Component {
  async getRegister() {
    const register = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    })
    return register
  }
  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const register = await this.getRegister()
      const { comments, p256dh } = await checkSubscribed(register, this.props.host)
      if (comments) this.setState({ p256dh })
    } finally {
      this.setState({ loading: false })
    }
  }
  async subscribe() {
    this.setState({ loading: true })
    try {
      const register = await this.getRegister()
      const { p256dh } = await subscribe(register, this.props.host)
      this.setState({ p256dh })
    } finally {
      this.setState({ loading: false })
    }
  }
  async unsubscribe() {
    const { p256dh } = this.state
    if (!p256dh) return
    this.setState({ loading: true })
    try {
      const res = await fetch(`${this.props.host}/unsubscribe?comments=true&key=${p256dh}`)
      const { 'comments': comments } = await res.json()
      if (comments === false) this.setState({ p256dh: undefined })
    } finally {
      this.setState({ loading: false })
    }
  }
  render({ disabled }) {
    const { p256dh, loading } = this.state
    return <FormGroup form-row col-2 label="Subscribe" help="Receive push notifications with replies.">
      <div className="col-10">
        <div className="form-check col-4">
          <input checked={disabled ? false : p256dh} onChange={(ev) => {
            if (!ev.currentTarget.checked) {
              const res = window.confirm('Are you sure you want so unsubscribe? You will stop receiving notifications from ALL comments on the website.')
              if (!res) return ev.currentTarget.checked = true
              this.unsubscribe()
            } else this.subscribe()
          }} disabled={disabled} type="checkbox" className="form-check-input" id="subscribe"/>
          <label className="form-check-label" htmlFor="subscribe">
            {(!disabled && loading) && <span style="color:grey">Checking your subscriptions...</span>}
            {(!disabled && !loading && p256dh) && <span style="color:green">You've subscribed 👍</span> }
          </label>
          <input value={p256dh} name="sub-id" type="hidden" />
        </div>
      </div>
    </FormGroup>
  }
}