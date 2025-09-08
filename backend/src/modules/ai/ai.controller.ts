import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Public } from '@/common/decorators/public.decorator';
import { AiService } from './ai.service';

@ApiTags('AI')
@Controller('weather')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get()
  @ApiOperation({ summary: '根据城市查询天气（调用 Mastra Weather Agent）' })
  @ApiQuery({
    name: 'city',
    required: true,
    description: '城市名称，例如 Beijing, Tokyo, New York',
  })
  async getWeather(@Query('city') city?: string) {
    return this.aiService.getWeatherByCity(city);
  }
}
