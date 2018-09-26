# Latest version
FROM node:10.7.0-slim
LABEL maintainer "team@shiftcommerce.com"

# Install essentials and cURL
RUN apt-get update -qq && apt-get install -y --no-install-recommends build-essential curl git apt-transport-https libpng-dev

# Add the Yarn source
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Install basic packages
RUN apt-get update -qq && apt-get install -y --no-install-recommends yarn

#Install nodemon to hot reload on server changes
RUN npm install -g nodemon

# Configure the main working directory
ENV app /app
RUN mkdir $app
WORKDIR $app

# Link the whole application up
ADD . $app
