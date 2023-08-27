import { PlaywrightTestConfig } from '@playwright/test';
import base from '../../playwright.config';

const config: PlaywrightTestConfig = {
    ...base,
    testDir: './src/integration-test',
    use: {
        ...base.use,
    },
};

export default config;
