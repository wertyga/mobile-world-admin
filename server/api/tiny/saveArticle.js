import { Article } from 'server/models'
import { config } from '../../common/config';

import { gfAdminArticle } from 'goldfish';

const TEXT = {
  error: 'Статья с таким именем уже существует',
}

export const saveArticle = async ({
  filePaths = [],
  fields,
  isUpdate,
}) => {
  const { id = [], file = [], name = [], content = [] } = fields;
  const updateID = id[0];
  const keys = Object.entries(gfAdminArticle.inputs).reduce((init, [key, { splitString }]) => ({
    ...init,
    [key]: splitString ? fields[key][0].split(',').map(item => item.trim()) : (fields[key] || [])[0],
  }), {})
  const updatedImagesContent = content[0].replace(/src="static\/images/g, `src="${config.gateway}/static/images`);

  let article = {};
  const previewImage = filePaths[0] || file[0];
  const saveObject = {
    ...keys,
    previewImage: `${config.gateway}${previewImage}`,
    content: updatedImagesContent,
  };

  if (updateID) {
    article = await Article.findByIdAndUpdate(updateID, { $set: saveObject }, { upsert: true, new: true })
  } else {
    const existArticle = await Article.findOne({ name })

    if (existArticle) throw new Error(TEXT.error)
    article = await new Article({
      ...saveObject,
      content: updatedImagesContent,
    }).save()
  }

  return article;
}
