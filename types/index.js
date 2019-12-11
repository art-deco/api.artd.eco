import render from '@depack/render' // eslint-disable-line

export {}
/**
 * @typedef {{ admin: boolean, github_token: string, linkedin_token: string } & Auth} Session
 * @typedef {import('@typedefs/goa').Context & { render: typeof render, client: elastic.Client, session: Session, mongo: mongodb.Db }} Context
 * @typedef {(ctx: Context, next: Middleware) => Promise} Middleware
 */


/* typal types/index.xml namespace */
/**
 * @typedef {import('@elastic/elasticsearch').Client} elastic.Client
 * @typedef {import('mongodb').Db} mongodb.Db
 * @typedef {import('@idio/github').GithubUser} _idio.GithubUser
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {Object} LinkedInUser `＠record`
 * @prop {string} id The user ID.
 * @prop {string} firstName The user's first name.
 * @prop {string} lastName The user's last name.
 * @prop {string} profilePicture The URL to the profile picture.
 * @typedef {Object} Auth `＠record`
 * @prop {LinkedInUser} [linkedin_user] User Info.
 * @prop {_idio.GithubUser} [github_user] GitHub User.
 * @prop {string} [csrf] The CSRF token.
 * @typedef {Object} WebsiteComment
 * @prop {string} [_id] id.
 * @prop {boolean} [isAuthor] Whether the current session user wrote this comment.
 * @prop {string} [country] The country name.
 * @prop {string} [ip] The IP address.
 * @prop {string} [name] The display name.
 * @prop {string} [photo] The photo to show.
 * @prop {boolean} [path] The path where the comment was left on.
 * @prop {boolean} [hideGithub] Whether to hide GitHub profile.
 * @prop {string} comment The text of the comment.
 * @prop {string} [subId] The web push subscription ID.
 * @prop {string} [replyTo] The ID of the comment which was replied to.
 * @prop {number} [replies] The number of replies.
 * @prop {Date} date When the comment was added.
 * @prop {_idio.GithubUser} github_user GitHub user, if logged in.
 * @prop {LinkedInUser} linkedin_user LinkedIn user, if logged in.
 * @typedef {Object} PushNotification
 * @prop {string} [title] Title of the notification.
 * @prop {boolean} [body] Body of the notification.
 * @prop {string} [icon] The icon to show.
 * @prop {string} [url] The URL to open on click.
 */
