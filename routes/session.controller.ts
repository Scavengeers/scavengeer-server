import express, { Request, Response } from "express";
import sessionDocument from "../routes/session.model";
import { SessionTable } from "./session.constructor";
import { v4 as uuidv4 } from 'uuid';
import { Session } from "inspector";

//session table should keep data of the player's project.

//post request
const createSession = async (req: Request, res: Response) => {
    let {uSessionId, gameId, uId, isFinished,gameModuleIndex, isCompleted } = req.body;
    try {
        const newSession = new sessionDocument({
            uSessionId,
            gameId,
            uId,
            isFinished,
            gameModuleIndex,
            isCompleted
        })
        const saveSession = await newSession();
        res.send(saveSession);
    } catch(error) {
        res.send(error).status(500)
    }
}

const getSession = async (req: Request, res: Response) => {
    const gameId = req.params._id;
    const uId = req.params.uId;
    const session = await sessionDocument.find({gameId: gameId, uId: uId});
    try {
        if(session[0] === undefined) {
            const newSession = new sessionDocument({
                _id: uuidv4(),
                uId: uId,
                gameId: gameId,
                isFinished: false,
                gameModulesIndex: 0,
                isCompleted: false,
            })
            const saveSession = await newSession.save()
            console.log('create new session😎')
            res.send(saveSession).status(200);
        } else if(session) {
            console.log('🫡got session')
            res.send(session[0]).status(201)
        }
    } catch(error) {
        res.send(error).status(500)
    }
}

module.exports = {
    createSession,
    getSession
}