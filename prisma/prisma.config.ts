import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join(__dirname, 'schema.prisma'),
  datasource: {
    url: 'postgresql://postgres:WRohDSuopliqaxgVfmLgwPKqcBqDINgS@acela.proxy.rlwy.net:43865/railway',
  },
})