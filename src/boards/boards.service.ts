import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';


@Injectable()
export class BoardsService {
    // private boards: Board[] = [];

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){ }

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    // createBoard(createBoardDto: CreateBoardDto){
    //     const {title, description} = createBoardDto;

    //     const board: Board = {
    //         id:uuid(),
    //         title,
    //         description,
    //         status:BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    async createBoard(createBoardDto:CreateBoardDto): Promise <Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    // getBoardById(id: string):Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if(!found){
    //         throw new NotFoundException();
    //     }
        
    //     return found;
    // }

    async getBoardById(id:number): Promise <Board> {
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // deleteBoard(id:string):void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    async deleteBoard(id:number) : Promise <void>{
        const result = await this.boardRepository.delete(id);
        
        if(result.affected ===0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status',BoardStatusValidationPipe) status: BoardStatus,
    // ) : Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

    async updateBoardStatus(id:number, status:BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
