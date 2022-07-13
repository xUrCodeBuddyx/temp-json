import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BinsService } from './bins.service';
import { CreateBinDto } from './dtos/createBin.dto';

@Controller('bins')
export class BinsController {
  constructor(private readonly binsService: BinsService) {}

  @Post()
  create(@Body() createBinDto: CreateBinDto) {
    return this.binsService.save(createBinDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('b')
  createPrivateBin(@Body() createBinDto: CreateBinDto, @Req() req) {
    console.log(req.user);
    return this.binsService.save({ ...createBinDto, userId: req.user.userId });
  }

  @Get('content/:id')
  getBinContent(@Param('id') id: string) {
    return this.binsService.findOne(id, true);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.binsService.findOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('b/content/:id')
  getPrivateBinContent(@Param('id') id: string) {
    return this.binsService.findOne(id, true);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('b/:id')
  getPrivateBin(@Param('id') id: string) {
    return this.binsService.findOne(id);
  }
}
