import buildServer from './server.js';

async function main() {
  try {
    const server = buildServer();
    await server.listen({ port: 3000 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}

main();
