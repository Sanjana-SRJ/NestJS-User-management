import { Controller, Post, Body, Param } from '@nestjs/common';
import { BlockService } from './block.service';
import { log } from 'console';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post(':id')
  async block(@Param('id') userId: string, @Body() blockUserId: string): Promise<void> {
    const parsedBody = typeof blockUserId === 'string' ? JSON.parse(blockUserId) : blockUserId;
    await this.blockService.block(userId, parsedBody.blockUserId);
  }

  @Post(':id/unblock')
  async unblock(@Param('id') userId: string, @Body() unblockUserId: string): Promise<void> {
    const parsedBody = typeof unblockUserId === 'string' ? JSON.parse(unblockUserId) : unblockUserId;
    await this.blockService.unblock(userId, parsedBody.unblockUserId);
  }
}