import Session, { SessionDocument } from '../model/session.model'
import { FilterQuery, LeanDocument } from 'mongoose'
import config from 'config'
import { get } from 'lodash'
import { sign, decode } from '../utils/jwt.utils'
import { findUser } from './user.service'
import { UserDocument } from '../model/user.model'

export async function createSession (userId: string, userAgent: string) {
    const session = await Session.create({ user: userId, userAgent })

    return session.toJSON()
}

export async function findSessions (query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean()
}

export function createAccessToken ({
    user,
    session
}: {
    user:
    | Omit<UserDocument, 'password'>
    | LeanDocument<Omit<UserDocument, 'password'>>
    session:
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>
}) {
    const accessToken = sign(
        { ...user, sesison: session._id },
        { expiresIn: config.get('accessTokenTtl') }
    )

    return accessToken
}