import { randomUUID } from 'crypto';
import { getUser } from './userService.js';

const id = randomUUID();
console.log('id: ', id);

// Top-Level await
const user = await getUser();
console.log(user);
