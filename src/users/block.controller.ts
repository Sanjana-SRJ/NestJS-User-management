import { Controller, Post, Body, Param } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post(':id')
  async block(@Param('id') userId: string, @Body() blockUserId: string): Promise<void> {
    await this.blockService.block(userId, blockUserId);
  }

  @Post(':id/unblock')
  async unblock(@Param('id') userId: string, @Body() unblockUserId: string): Promise<void> {
    await this.blockService.unblock(userId, unblockUserId);
  }
}