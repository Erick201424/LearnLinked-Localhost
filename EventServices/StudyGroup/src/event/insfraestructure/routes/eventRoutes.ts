import express, { Router, Request, Response } from "express";
import {
    createEventController,
    getByIdEventController,
    getAllEventsController,
    cancelEventController,
    getByCommunityIdController
} from "../dependencies";
import { validateToken } from "../../../helpers/token.helper";

export const eventRouter = Router();

eventRouter.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

eventRouter.post('/', validateToken, createEventController.execute.bind(createEventController));
eventRouter.get('/:id', validateToken, getByIdEventController.execute.bind(getByIdEventController));
eventRouter.get('/community/:id_community', validateToken, getByCommunityIdController.execute.bind(getByCommunityIdController));
eventRouter.get('/', validateToken, getAllEventsController.execute.bind(getAllEventsController));
eventRouter.put('/:id', validateToken, cancelEventController.execute.bind(cancelEventController));

// EventRouter.put('/:id', updateEventController.execute.bind(updateEventController));