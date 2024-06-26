# MAKE SHIFT

## Project Overview

This project consists of two main components:

- **Python Django REST API:** A Python Django REST API that serves events and user data using PostgreSQL as the database and JWT authentication.

- **React Calendar App:** A React calendar app that provides user authentication, event management, and calendar visualization.

## Technologies Used

### Backend:

- **Technologies:**

  - Python
  - Django
  - Django REST framework
  - PostgreSQL
  - JWT authentication


- **Key Features:** User registration and authentication using JWT tokens.
Event creation, retrieval, updating, and deletion.
Data storage in PostgreSQL database.

### Frontend:

- **Technologies:**
  - React
  - Redux
  - Axios

## Current status
Current Status:

The application is currently deployed in production at the following [link](https://314b7aea-ba9e-4e77-b02a-fa391ce1d99a.e1-us-cdp-2.choreoapps.dev/). However, it's important to note that the application has a runtime of one hour, after which the database is shut down.

## Demo
[link](https://drive.google.com/file/d/1U9CGfxkKT55NU5XNdFK2aueCTqiod10g/view?usp=sharing)


## Setting up 

### Backend

```cmd
  cd backend
```
> Move to the backend folder

```cmd
  pip install -r requirements. txt
```
> Install all Python dependencies

```cmd
  python manage.py runserver
```
> Start the Django development server

### Frontend

```cmd
  cd fronted
```
> Move to the fronted folder

```cmd
  yarn install
```
> Install all JavaScript dependencies

```cmd
  yarn dev
```
> Start the React development server

```cmd
  yarn test
```
> Run the unite test for the React application