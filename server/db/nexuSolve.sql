DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments;

CREATE TABLE profiles (
    account_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) DEFAULT 'My Profile',
    email VARCHAR(255) NOT NULL,
    image_name VARCHAR(500) NULL,
    image_url VARCHAR(500) NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (account_id)
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    account_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    expiration_timestamp TIMESTAMP NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (account_id) REFERENCES profiles("account_id") ON DELETE CASCADE
);

CREATE TABLE posts (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    account_id INT NOT NULL,
    category VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    anonymous BOOLEAN NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (account_id) REFERENCES profiles("account_id") ON DELETE CASCADE
);

CREATE TABLE comments (
    comment_id INT GENERATED ALWAYS AS IDENTITY,
    account_id INT NOT NULL,
    post_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    anonymous BOOLEAN NOT NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (account_id) REFERENCES profiles("account_id") ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts("post_id")
);