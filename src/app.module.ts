import { Module } from '@nestjs/common';
import { FuncionarioModule } from './modules/funcionarios/funcionario.module';

@Module({
  imports: [FuncionarioModule],
})
export class AppModule {}
