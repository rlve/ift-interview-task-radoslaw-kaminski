# ift-interview-task-radoslaw-kaminski

Welcome to my solution for the Test Automation Engineer Coding Challenge.

## Approach

### Language

I chose **TypeScript with Bun** as the runtime for this project. TypeScript is the language I am most comfortable with,
and Bun simplifies the setup compared to Node.js, aligning with my goal to keep the solution straightforward.

### Test Framework

I utilized the built-in **Bun Test Runner** as the test framework. It is Jest compatible and well-suited for the
requirements of this project.

## Project Overview

### Setup

To streamline the configuration and initialization of Waku Nodes, I created a Docker Compose file
`./docker-compose.yml`. This file sets up two Waku Nodes with appropriate network configurations. The nodes are being
started using the helper scripts:

- `./scripts/run-node-1.sh`
- `./scripts/run-node-2.sh`

I containerized the test as well. A separate Docker Compose file, `docker-compose-tests.yml`, builds and runs the test
project.

To further simplify the setup, I created the script `./scripts/run-tests.sh`, which:

1. Builds and starts the Waku Nodes.
2. Builds and starts the test project. Displays the test results.
3. Performs a teardown to clean up the environment.

For simplicity, all URLs and IP addresses are hardcoded.

### Tests

Tests are organized within the `./tests/` directory, including two main test suites:

- `basic.test.ts` - Test Suite 1 (Basic Node Operation)
- `inter-node.test.ts` - Test Suite 2 (Inter-Node Communication).

## How to Run

### Locally

**Preconditions:**

- Ensure Docker is installed and running.

**Steps to Execute:**

```bash
./scripts/run-tests.sh
```

### GitHub Actions

Tests are integrated with GitHub Actions, allowing execution via pull requests or on-demand workflows. You can find the
workflow configuration [here](https://github.com/rlve/ift-interview-task-radoslaw-kaminski/actions/workflows/tests.yml).
