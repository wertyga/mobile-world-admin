import express from 'express'
import { Admin } from '../../models'
import { getToken } from '../../common/credentialHandle';

export const adminRoute = express.Router()

adminRoute.post('/auth', async (req, res) => {
  const { body: { name, pass } } = req;
  if (name && pass) {
    const existAdmin = await Admin.findOne({ name });
    if (!existAdmin || !existAdmin.comparePasswords(pass)) {
      req.session = null;
      return res.status(400).json({ error: 'Access denided!' });
    }
    req.session.adminToken = getToken();
    return res.status(200).json('Access granted!');
  }

  res.status(400).json({ error: 'Access denided!' });
})

adminRoute.get('/check-session', async ({ session }, res) => {
  if (session && session.adminToken) return res.json('session ok')

  res.status(400).json('session failure')
})
