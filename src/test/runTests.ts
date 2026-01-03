import { run } from './suite/index';

// Run the tests
run().catch(err => {
    console.error(err);
    process.exit(1);
});










