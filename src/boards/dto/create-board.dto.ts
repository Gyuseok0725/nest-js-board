import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @ApiProperty({
        example: '문의드립니다.',
        description: '제목',
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: 'xxx가 안되요.',
        description: '내용'
    })
    @IsNotEmpty()
    description: string;
}