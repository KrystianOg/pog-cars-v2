import { Reflector } from '@nestjs/core';

type Table = 'cars' | 'roles' | 'users' | 'agencies';
type Action = 'create' | 'view' | 'update' | 'delete';
type Role = `${Action}_${Table}`;

export const Roles = Reflector.createDecorator<Role[]>();
