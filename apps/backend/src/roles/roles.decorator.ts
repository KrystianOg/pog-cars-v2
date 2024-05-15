import { Reflector } from '@nestjs/core';
import type { Permission } from '../types/db';

export const Permissions = Reflector.createDecorator<
  Permission | Permission[]
>();

export type { Permission };
