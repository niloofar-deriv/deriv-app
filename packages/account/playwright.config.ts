import { PlaywrightTestConfig } from '@playwright/test';
import base from '../../playwright.config';

const config: PlaywrightTestConfig = {
    ...base,
    use: {
        ...base.use,
    },
};

export default config;
