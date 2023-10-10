import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import *as path from 'path';
import * as fs from 'fs';
@Injectable()
export class UploadService {
  upload(file: any) {
    if (!file) {
      throw new BadRequestException('Invalid file')
    }
    const fileName = uuid() + path.extname(String(file.originalname));
    const filePath = path.resolve(__dirname, '..', 'static');
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true })
    }
    fs.writeFileSync(path.join(filePath, fileName), file.buffer)
    return fileName;
  }
}
