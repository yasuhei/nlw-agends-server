import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { fastifyCors } from '@fastify/cors';
import { env } from './env.ts';
import { getRoomsRoute } from './routes/get-rooms.ts';
import { createRoomsRoute } from './routes/create-room.ts';
import { getRoomsQuestionsRoute } from './routes/get-room-questions.ts';
import { createQuestionRoute } from './routes/create-question.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return 'ok';
});
app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomsQuestionsRoute);
app.register(createQuestionRoute);

app.listen({ port: env.PORT });
