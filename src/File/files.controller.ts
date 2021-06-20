import {
  Controller,
  Post,
  Req,
  Res,
  HttpStatus,
  HttpException,
  Get,
  Body,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  FilesInterceptor, UploadedFiles, FileFieldsInterceptor,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateMaquilleuseDto } from '../Maquilleuse/Model/CreateMaquilleuseDto';
import { FileUploaded } from './interfaces/fileuploaded.interface';
@ApiUseTags('files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
  ) {}

  @Post('uploadFile')

  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {

    console.log(file);
  }

  @Post('uploadFiles')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files) {
    console.log(files);
  }

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar1', maxCount: 1 },
  ]))
  uploadMultipleFile(@UploadedFiles() files) {
    console.log(files);
    const fichier: FileUploaded = files.avatar1[0];
    return this.filesService.provideFile(fichier);
  }

  @Get()
  async listFiles(@Res() res: any) {
    const filesList =  this.filesService.list();
    return res.status(HttpStatus.OK).json(filesList);
  }

}
