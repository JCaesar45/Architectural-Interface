import express, { Request, Response } from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

const successSchema = <T extends z.ZodTypeAny>(dataSchema: T) => 
  z.object({ status: z.literal('success'), data: dataSchema });

const errorSchema = z.object({ 
  status: z.literal('error'), 
  errorCode: z.number(), 
  message: z.string() 
});

const responseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => 
  z.union([successSchema(dataSchema), errorSchema]);

const validationDataSchema = z.object({ message: z.string() });
const ApiResponseSchema = responseSchema(validationDataSchema);

app.post('/api/v1/validate', (req: Request, res: Response) => {
  const payload = { status: 'success' as const, data: { message: 'Polyglot contract verified' } };
  const validated = ApiResponseSchema.parse(payload);
  res.json(validated);
});

app.listen(3000);
