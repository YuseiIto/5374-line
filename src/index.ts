import Express from 'express';

export default function lambdaIndexFunction(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    res.status(501).json({ message: 'Not Implemented.' });
}
