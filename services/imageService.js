import HttpError from "../helpers/HttpError.js";
import Jimp from "jimp";
import path from "path";
import * as fse from "fs-extra";

const fullFilePath = path.join('public', 'avatars');

export async function resizeImg(file) {
  try {

    await fse.ensureDir(fullFilePath);

    const avatar = await Jimp.read(file.path);
    await avatar
      .cover(250, 250)
      .quality(90)
      .writeAsync(path.join(fullFilePath, file.filename));
    
    return path.join(fullFilePath, file.filename);

  } catch (error) {
    console.log("resize error");
    throw HttpError(500);
  }
}