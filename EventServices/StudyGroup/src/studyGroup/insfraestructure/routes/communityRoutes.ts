import express, { Router } from "express";
import {
    createCommunityController,
    getByIdCommunityController,
    getAllCommunitysController,
    // updateCommunityController,
    // getByStudentIdController
} from "../dependencies";
import { validateToken } from "../../../helpers/token.helper";

export const communityRouter = Router();

communityRouter.post('/', validateToken, createCommunityController.execute.bind(createCommunityController));
communityRouter.get('/:id', validateToken, getByIdCommunityController.execute.bind(getByIdCommunityController));
// communityRouter.get('/user/:iduser', getByStudentIdController.execute.bind(getByStudentIdController));
communityRouter.get('/', validateToken, getAllCommunitysController.execute.bind(getAllCommunitysController));
// communityRouter.put('/:id', updateCommunityController.execute.bind(updateCommunityController));