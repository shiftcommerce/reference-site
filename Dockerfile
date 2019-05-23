# Latest version
FROM node:11.13.0-slim
LABEL maintainer "team@shiftcommerce.com"

# Install essentials and cURL
RUN apt-get update -qq && apt-get install -y --no-install-recommends build-essential curl git apt-transport-https libpng-dev libgconf-2-4

# Install nodemon to hot reload on server changes
RUN npm install -g nodemon

# Configure the main working directory
ENV app /app
RUN mkdir $app
WORKDIR $app

# Link the whole application up
ADD . $app

CMD ['yarn', 'devserver']
