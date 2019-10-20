import shortid from 'short-id';

const GENERATE_TIME = 1000 * 60 * 60 * 3; // 3 hours

let token;
export const generateToken = () => {
  token = shortid.generate();
  setInterval(() => {
    token = shortid.generate();
  }, GENERATE_TIME);
};

export const getToken = () => token;