import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

const env = dotenv.config();
expand(env);

import { execSync } from 'node:child_process';

const isWsl = execSync('grep -i microsoft /proc/version', { stdio: 'pipe' }).toString().length > 0;

const host = isWsl
  ? execSync("ip route show default | awk '{print $3}'", { stdio: 'pipe' }).toString().trim()
  : 'localhost';

export default {
  enable: process.env.RAY_ENABLE === 'true',
  host,
  port: process.env.RAY_PORT || 23517,
  scheme: process.env.RAY_SCHEME || 'http',
};
