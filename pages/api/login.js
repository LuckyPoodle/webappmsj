import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

const loginFunction = (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60,
      sameSite: 'strict',
      path: '/',
    })
  )
  res.status(200).json({ success: true })
}

export default loginFunction
