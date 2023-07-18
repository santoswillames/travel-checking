import { z } from 'zod'
import { schema } from './schema'

export type FormProps = z.infer<typeof schema>
