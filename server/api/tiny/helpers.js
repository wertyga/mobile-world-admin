import fs from 'fs';
import path from 'path'
import { config } from '../../common/config';

export const findContentImages = async (content, preview) => {
  const images = (content.match(/\/static\/\S+/g) || [])
    .map(image => image.split(' ')[0].replace(/"/, ''));
  try {
    const queue = collectFiles([...images, preview.replace(config.gateway, '')]);

    await Promise.all(queue)
  } catch (e) {
    throw e;
  }
}

const collectFiles = (files) => {
  return files.map(imagePath => {
    return new Promise((res, rej) => fs.unlink(path.join(process.cwd(), imagePath), err => {
      if (err) {
        console.warn(imagePath, err.message);
      }
      res(imagePath);
    }))
  });
}

const replaceImagesContentWithServerPath = (content) => {
  
} 

export const configureImagePath = imagePath => `${config.gateway}${imagePath}`;