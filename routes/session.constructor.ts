import { v4 as uuidv4 } from 'uuid';
export class SessionTable {
    uSessionId: String;
    gameId: String;
    uId: String;
    isFinished: Boolean;
    gameModuleIndex: Number;
    isCompleted: Boolean;
  
    public constructor() {
      this.uSessionId = uuidv4();
      this.gameId = "";
      this.uId = "";
      this.isFinished = false;
      this.gameModuleIndex = 0;
      this.isCompleted = false;
    }
  }
  