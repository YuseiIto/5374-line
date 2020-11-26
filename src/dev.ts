import Express from 'express';
import route from './index';

const PORT: Number= Number(process.env.PORT) || 5000;
const app: Express.Express = Express();

app.use('/webhook', route);

app.listen(PORT, () => {
    console.log(`Listen started at port ${PORT}.`);
});

export default app;
