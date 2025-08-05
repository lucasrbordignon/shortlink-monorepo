import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import shortlinkRoutes from './routes/shortlink';

dotenv.config();

const app = express();
const swaggerDocument = YAML.load('./src/docs/openapi.yaml');

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', shortlinkRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`Documentação: http://localhost:${port}/docs`)
});