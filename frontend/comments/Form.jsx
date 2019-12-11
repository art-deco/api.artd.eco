import Form, {
  FormGroup, Input, TextArea, SubmitButton, SubmitForm,
} from '@depack/form'
import { getUserData } from '../Auth/lib'
import Subscriptions from './Subscriptions'

export default class CommentForm extends SubmitForm {
  constructor() {
    super()
    this.fetchOptions = { credentials: 'include' }
    this.state.country_code = undefined
  }
  async componentWillMount() {
    try {
      const res = await fetch('https://freegeoip.app/json/', {})
      const { 'country_code': country_code } = await res.json()
      if (country_code) {
        this.setState({ country_code })
      }
    } catch (err) {
      // ok
    }
  }
  /**
   * @param {!Object} [props]
   * @param {Auth} [props.auth]
   */
  render({ onChange, auth, ...props
  }) {
    const { host, signedIn, setReply,
      replyTo: { id: replyTo, name: replyToName } = {} } = this.context
    const { formLoading, error, success } = this.state

    const { picture, name } = getUserData(auth)

    return (<Form {...props} onSubmit={this.submit.bind(this)} onChange={values => {
      this.reset()
      if(onChange) onChange(values)
    }}>
      {picture && <Input type="hidden" name="photo" value={picture} />}
      <Input type="hidden" name="csrf" value={auth.csrf} />
      <FormGroup form-row col-2 label="Name*" help="This will appear on the website">
        <Input disabled={!signedIn} col-10 name="name" value={name} />
      </FormGroup>
      <FormGroup form-row col-2 label="GitHub" help={auth.github_user ? 'GitHub username, sign out to remove' : 'Please sign in with GitHub'}>
        <Input col-5 name="github" disabled value={auth.github_user ? auth.github_user.html_url : null}/>
        {auth.github_user && <div className="form-check form-check-inline col-4">
          <input type="checkbox" className="form-check-input" id="defaultCheck2" name="hide-github"/>
          <label className="form-check-label" htmlFor="defaultCheck2">
            Hide from public
          </label>
        </div>}
      </FormGroup>
      <FormGroup form-row col-2 label="Comment*" help="Please enter your opinion">
        <div className="col-10">
          <TextArea data-id="comment-text-area" disabled={!signedIn} required name="comment">
            {replyToName && `${replyToName}, `}
            I think you're right/wrong because...
          </TextArea>
          {replyTo && <input type="hidden" name="reply-to" value={replyTo} />}
        </div>
        {replyTo && <div className="col-10">
          You're replying to <a href="#" onClick={(ev) => {
            ev.preventDefault()
            const el = document.querySelector(`[data-comment="${replyTo}"]`)
            el.scrollIntoView({ behavior: 'smooth' })
            return false
          }}>
            {replyToName}.
          </a> <a href="#" onClick={(ev) => {
            ev.preventDefault()
            setReply(null)
            return false
          }}>
            Clear response
          </a>
        </div>}
      </FormGroup>
      <Subscriptions disabled={!signedIn} host={host} />
      <SubmitButton disabled={!signedIn} loading={formLoading} type="warning"
        confirmText="Submit Data" />
      {error && `Error: ${error}`}
      {success && `Comment has been submitted!`}
    </Form>)
  }
}

// <FormGroup label="Country" help="Where are you from?"
//   form-row col-2>
//   <Select col-10 name="country_code" value={this.state.country_code}
//     defaultText="select country" options={countries.map(a => {
//       return { value: a.code, title: a.name }
//     })} />
// </FormGroup>
{/* <CaptchaFormGroup host={host} auth={auth} /> */}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Auth} Auth
 */
