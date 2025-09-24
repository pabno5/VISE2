import { Module } from "@nestjs/common";
import { ViseController } from "./vise.controller";
import { ViseService } from "./vise.service";

@Module({
  imports: [],
  controllers: [ViseController],
  providers: [ViseService],
})
export class ViseModule {}
