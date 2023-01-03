import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

const logoutFunction = (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  )
  res.status(200).json({ success: true })
}

export default logoutFunction
