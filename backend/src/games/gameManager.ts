import type { Game } from "../types/game";

export class GameManager {
    private games = new Map<string, Game>();

    createGame(roomId: string, socketId: string):void{
        if (this.games.has(roomId)) {
            return;
        }
        const game:Game={
            board:Array(9).fill(null),
            currentPlayer:"circle",
            players:{
                circle:socketId,
            },
            winner:null 
        }

        this.games.set(roomId,game)
    }

    joinGame(roomId:string,socketId:string):void{
        const game=this.games.get(roomId)
        if (!game) {
            return;
        }
        game.players.cross=socketId;
    }

}