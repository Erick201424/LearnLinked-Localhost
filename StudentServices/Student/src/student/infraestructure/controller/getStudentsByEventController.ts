import { Request, Response } from "express";
import { GetStudentsByEventUseCase } from "../../application/getStudentsByEventUseCase";

export class GetStudentsByEventController {
    constructor(readonly getStudentsUseCase: GetStudentsByEventUseCase) { }

    async execute(req: Request, res: Response) {
        try {
            // Obtén los IDs de eventos desde la consulta en la URL (req.query)
            const { users: userIdsParam } = req.query;

            // Validación: Asegúrate de que userIdsParam es una cadena
            if (typeof userIdsParam !== 'string') {
                return res.status(400).send({
                    status: "error",
                    message: "users debe ser una cadena de IDs de usuario separada por comas",
                });
            }

            // Convierte la cadena de userIds a un array de números
            const userIds: number[] = userIdsParam.split(',').map((id) => parseInt(id, 10));

            // Ejecuta el caso de uso con los IDs de eventos
            const studentList = await this.getStudentsUseCase.execute(userIds);

            // Logging: Agregar un registro para indicar la finalización exitosa del controlador
            console.log("GetStudentsByEventController completed successfully.");

            // Devuelve la respuesta exitosa con la lista de estudiantes
            if (studentList) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        studentList
                    }
                })
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while getting users by event"
                });
            }

        } catch (error) {
            // Logging: Agregar un registro para indicar un error en el controlador
            console.error("Error in GetStudentsByEventController:", error);

            // Devuelve una respuesta de error con información sobre el error
            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred while getting users by event",
                error: error, // Puedes ajustar esto según tus necesidades
            });
        }
    }
}
