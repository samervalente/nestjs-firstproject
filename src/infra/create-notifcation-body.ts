import { IsNotEmpty, IsUUID, Length } from 'class-validator';
export class CreateNotifcationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 249)
  content: string;

  @IsNotEmpty()
  category: string;
}
