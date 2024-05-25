import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ERRORS } from '../commons/utils';
import { MessageDto } from './dto/message.dto';
import { LLMHistory } from './schemas/llmHistory.schemas';



@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor() {}

  validateRoom(room: string) {
    if (!room) {
      throw new WsException({
        statusCode: ERRORS.ROOM_EMPTY.statusCode,
        message: ERRORS.ROOM_EMPTY.message,
      });
    }
  }

  validateSendMessage(data: MessageDto) {
    if (!data.message) {
      this.logger.error(`Validation Error: The message is empty.`);
      throw new WsException('The message cannot be empty.');
    }
    if (!data.nickname) {
      this.logger.error(`Validation Error: The nickname is empty.`);
      throw new WsException('The nickname cannot be empty.');
    }
    if (!data.room) {
      this.logger.error(`Validation Error: The room is empty.`);
      throw new WsException('The room cannot be empty.');
    }
  }
}
