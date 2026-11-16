'use client';

import { createNotificationFactory } from './createNotificationFactory';
import { reactHotToastDriver } from './reactHotToastDriver';

export const notifications = createNotificationFactory(reactHotToastDriver);
