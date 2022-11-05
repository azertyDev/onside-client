import fs from 'fs';
import path from 'path';
import mv from 'mv';

export const uploadImage = async (file: any) => {
    const imagePath = file.filepath;
    const mimetype = file.mimetype.split('/');
    const pathToWriteImage = `./pic/uploads/${file.newFilename}.${mimetype[1]}`;

    const data = fs.readFileSync(path.resolve(__dirname, imagePath));

    mv(imagePath, pathToWriteImage, function (err) {
        if (err) {
            console.log('Uploading error:', err);
            throw err;
        }
    });

    console.log('pathToWriteImage: ', pathToWriteImage);

    return `/${file.newFilename}.${mimetype[1]}`;
};

export const RemoveImage = async (path: string) => {
    await fs.unlinkSync(`./pic/uploads${path}`);
};
