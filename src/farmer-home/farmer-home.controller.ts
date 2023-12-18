import { Controller, Get, Post, Req, Res, UseGuards, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FarmerHomeService } from './farmer-home.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { IsAuthenticatedGuard } from '../auths/is-authenticated.guard';
import { setupMulter } from './multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from './product.dto';
import * as fs from 'fs';
import * as path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

@Controller()
export class FarmerHomeController {
  constructor(private farmerHomeService: FarmerHomeService) {}

  @Get('farmer_report')
  @UseGuards(IsAuthenticatedGuard)
  async getFarmerReport(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { ownedproductsreport, farmerProfile, soldproductsreport, totalOwe, chartData, notifications } = await this.farmerHomeService.getFarmerReport(req.session.userId);
    res.view('/farmer_home.ejs', { ownedproductsreport, farmerProfile, soldproductsreport, totalOwe, chartData, notifications });
  }

  @Get('/add_product')
  @UseGuards(IsAuthenticatedGuard)
  getAddProduct(@Res() res: FastifyReply) {
    res.view('/add_product.ejs');
  }

  @Post('/add_product')
  @UseGuards(IsAuthenticatedGuard)
  async addProduct(@Req() req: FastifyRequest, @Res() res: any) {
    try {
      const data = await req.file();
      console.log(data);
      const fileStream = data.file;
      console.log(fileStream)
      const originalFileName = data.filename;
      const fields = data.fields;
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${originalFileName}`;


      if (!fileStream) {
        throw new Error('File stream is undefined');
      }

      // Save file to disk (example path, you should configure it)
      const savePath = path.join(__dirname, '../../uploads', fileName);
      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(savePath);
        fileStream.pipe(writeStream);
        fileStream.on('end', resolve);
        fileStream.on('error', reject);
      });

      const name = fields.name.value;
      const description = fields.description.value;
      const category = fields.category.value;
      const quantity = fields.quantity.value;
      const price = fields.price.value;
      // Store only the relative path
      const relativePath = `uploads/${fileName}`;
      // Access other form fields here


      // Create product (replace with your actual logic)
      await this.farmerHomeService.addProduct(req.session.userId, name, description, category, quantity, price, relativePath)

      
      res.redirect(302, '/farmer_report');

    } catch (error) {
      console.error(error);
      res.code(500).send('An error occurred');
    }
  }




}



