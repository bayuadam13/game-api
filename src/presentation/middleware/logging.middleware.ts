
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.on('finish', () => {
      console.log({
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode
      });
    });
    next();
  }
}
