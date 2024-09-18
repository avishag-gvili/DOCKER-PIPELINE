## DOCKER-PIPELINE
This project automates the process of building and pushing a Docker image to DockerHub every time there is a push or merge to the main branch. The automation is handled via a GitHub Action that uses a YAML workflow file.


## Overview
The main goal of this project is to ensure that the Docker image associated with the project is always up-to-date with the latest code in the repository's main branch. Whenever new changes are pushed or merged to main, a new Docker image is built from the code and automatically pushed to DockerHub.

## Key Features
Automatic Docker image build: Every push or merge to the main branch triggers the process of building a new Docker image.
Continuous Deployment to DockerHub: Once the image is built, it is pushed to DockerHub, ensuring that the latest version of the code is always packaged in a ready-to-use Docker image.
GitHub Actions Integration: The automation is powered by GitHub Actions using a YAML workflow configuration.

## Workflow Process
Trigger: Any push or pull request merge into the main branch triggers the GitHub Action.
Docker Build: The GitHub Action builds a Docker image based on the latest version of the code.
Push to DockerHub: The newly built image is pushed to the specified DockerHub repository.
#GitHub Actions Workflow
The core of the automation is handled by a YAML file (.github/workflows/docker-image.yml), which defines the steps to build and push the Docker image. Below is an example of how the workflow is structured:

## Workflow Explanation
on: This section defines the events that trigger the workflow. In this case, the workflow runs when there is a push or a pull request merge to the main branch.
jobs: Defines the individual steps of the process.
Checkout code: Uses the actions/checkout action to clone the repository.
Log in to DockerHub: Logs in to DockerHub using credentials stored as GitHub secrets (DOCKER_USERNAME and DOCKER_PASSWORD).
Build the Docker image: Builds the Docker image from the latest version of the code.
Push to DockerHub: Pushes the newly built image to DockerHub.
Prerequisites
To use this workflow, you need:

A DockerHub account.
A GitHub repository.
Docker installed on your machine (for local testing).
GitHub Secrets configured for DockerHub credentials:
DOCKER_USERNAME: Your DockerHub username.
DOCKER_PASSWORD: Your DockerHub password or access token.
