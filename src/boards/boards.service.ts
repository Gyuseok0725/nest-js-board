import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto){
        const {title, description} = createBoardDto;

        const board: Board = {
            id:uuid(),
            title,
            description,
            status:BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string):Board {
        const found = this.boards.find((board) => board.id === id);

        if(!found){
            throw new NotFoundException();
        }
        
        return found;
    }

    deleteBoard(id:string):void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(
        @Param('id') id: string,
        @Body('status',BoardStatusValidationPipe) status: BoardStatus,
    ) : Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }

}
