# React: Activity 1

### Step 0:

1. Clone the starter code:
    ```sh
    git clone https://github.com/tx00-resources-en/react-auth-starter react-auth
    cd react-auth
    ```

2. Inside the `react-auth/backend` folder:
    - Rename `.env.example` to `.env`. Notice the environmental variables `SECRET` and `MONGO_URI`.
    - Run `npm install`, then start the server by running `npm start` from within the **backend** folder. Alternatively, you can use `npm run dev` after installing `nodemon` for live-reload functionality.

3. Inside the `react-auth/frontend` folder:
    - Run `npm install`, then start the client by running `npm run dev` from within the **frontend** folder.

---

### Step 1:

1. Register a new user and observe how the local storage is utilized. Please **use a strong password** e.g `4wa95=Vx#`, otherwise you will get error

2. Log out and note the changes in local storage after logout.

---

### Step 2:

Inside `frontend/src`: 

1. Implement the `handleLogin` function in `pages/LoginComponent.jsx`. You can use a similar approach to the one used in `handleSignup` found in `pages/SignupComponent.jsx`.

2. Endpoint: `POST /api/user/login`

3. Log in and observe the changes in local storage.

---

### Step 3:

Modify the `App` component to render the `Login` component instead of the `Signup` component when the user is not authenticated.

---

### Step 4:

Refactor the code responsible for token storage, retrieval, and removal. Use `sessionStorage` instead of `localStorage` for this purpose.

---

### Helpful Links:

- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
