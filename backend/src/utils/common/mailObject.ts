import { MAIL_ID } from '../../config/serverConfig'

export const workspaceJoinMail = function (workspace: any) {
  return {
    from: MAIL_ID,
    subject: 'You are added to a workspace',
    text: `Congratulation!  You are added to a workspace ${workspace.name}`
  }
}
