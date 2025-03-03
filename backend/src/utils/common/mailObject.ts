import { APP_LINK, MAIL_ID } from '../../config/serverConfig'

export const workspaceJoinMail = function (workspace: any) {
  return {
    from: MAIL_ID,
    subject: 'You are added to a workspace',
    text: `Congratulation!  You are added to a workspace ${workspace.name}`
  }
}

export const verifyEmailMail = function (verificationToken: string) {
  return {
    from: MAIL_ID,
    subject: 'Welcome to the app! Verify your email',
    text: `Please verify your email by clicking on the link below: ${APP_LINK}/verify/${verificationToken}`
  }
}
