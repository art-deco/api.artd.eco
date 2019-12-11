/* typal types/index.xml externs */
/**
 * @record
 */
var LinkedInUser
/**
 * The user ID.
 * @type {string}
 */
LinkedInUser.prototype.id
/**
 * The user's first name.
 * @type {string}
 */
LinkedInUser.prototype.firstName
/**
 * The user's last name.
 * @type {string}
 */
LinkedInUser.prototype.lastName
/**
 * The URL to the profile picture.
 * @type {string}
 */
LinkedInUser.prototype.profilePicture
/**
 * @record
 */
var Auth
/**
 * User Info.
 * @type {LinkedInUser|undefined}
 */
Auth.prototype.linkedin_user
/**
 * GitHub User.
 * @type {_idio.GithubUser|undefined}
 */
Auth.prototype.github_user
/**
 * The CSRF token.
 * @type {string|undefined}
 */
Auth.prototype.csrf
/**
 * @typedef {{ _id: (string|undefined), isAuthor: (boolean|undefined), country: (string|undefined), ip: (string|undefined), name: (string|undefined), photo: (string|undefined), path: (boolean|undefined), hideGithub: (boolean|undefined), comment: string, subId: (string|undefined), replyTo: (string|undefined), replies: (number|undefined), date: Date, github_user: _idio.GithubUser, linkedin_user: LinkedInUser }}
 */
var WebsiteComment
/**
 * @typedef {{ title: (string|undefined), body: (boolean|undefined), icon: (string|undefined), url: (string|undefined) }}
 */
var PushNotification
