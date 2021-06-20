import { Component } from '@nestjs/common';
import { FileUploaded } from './interfaces/fileuploaded.interface';
import { Photos } from '../Photos/photos.entity';
import * as http from 'http';

@Component()
export class FilesService {
  private readonly files: FileUploaded[] = [];
  private  urlUpload: string = 'http://82.165.253.223:3050/uploads/';
 /* private static createFile(file): FileUploaded {
    const type: string = file.originalname.replace(/.*\.(.*)/, '$1');
    const path: string = file.path;
    return {path, type};
  }*/

  public async provideFile(fichier: FileUploaded): Promise<any>{
    const chem = this.saveFile(fichier);
    console.log('chemin' + chem);

    console.log('url phot:' + this.urlUpload + fichier.originalname);

    const phot: Photos = await Photos.createPhoto(this.urlUpload + fichier.originalname);
    return phot;
  }
  private saveFile(fichier: FileUploaded): string {
    const fs = require('fs');
    const path = './public/uploads/' + fichier.originalname;
// write to a new file named 2pac.txt
    fs.writeFile(path, fichier.buffer, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('File saved!');
    });

    return path;

  }
 /* createArray(files) {
    console.log('create array 1');
    const savedFiles: File[] = files.map(file => FilesService.createFile(file));
    console.log('create array 2');
    this.files.push(...savedFiles);
    console.log('create array 3');
    return savedFiles;
  }*/

  list(): FileUploaded[] {
    return this.files;
  }
}
