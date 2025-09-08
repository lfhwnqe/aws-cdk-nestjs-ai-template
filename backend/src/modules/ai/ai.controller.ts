import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Public } from '@/common/decorators/public.decorator';
import { AiService } from './ai.service';
import { Role, Roles } from '@/common/decorators/roles.decorator';

@ApiTags('AI')
@Controller('weather')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // todo 不适用 public 修饰器会401，但token是有效的
  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.USER)
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
