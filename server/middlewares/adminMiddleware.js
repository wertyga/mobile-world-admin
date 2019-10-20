import { getToken } from '../common/credentialHandle';

export const adminAuthMiddleware = (req, res, next) => {
  const { session: { adminToken }, url } = req;
  if (url === '/auth' || /_next/.test(url)) return next();
  if(adminToken === getToken()) {
    next();
  } else {
    res.redirect('/auth')
  }
}