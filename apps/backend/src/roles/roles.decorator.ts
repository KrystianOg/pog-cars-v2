import { Reflector } from '@nestjs/core';

type Table = 'agency' | 'car' | 'user';
type Action = 'create' | 'view' | 'update' | 'delete';
export type Role = `${Action}_${Table}` | 'view_self';

export const Roles = Reflector.createDecorator<Role | Role[]>();
