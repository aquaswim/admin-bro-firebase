import { loginPage } from './login.page';
import { loginComponent } from './login.component';
import firebaseInstance from 'firebase';

let firebaseApp;

const getUserData = async (): Promise<Record<string, unknown>> =>
  new Promise((resolve, reject) => {
    const user = firebaseApp.auth().currentUser;
    if (user) resolve(user?.toJSON?.());
    else reject();
  });

export const authenticateWithFirebase = async (
  email: string,
  password: string
): Promise<Record<string, unknown> | null> => {
  try {
    const userCred = await firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password);
    return userCred.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const setupLogin = (
  app,
  {
    firebase,
    firebaseConfig,
    authenticationConfig,
    registerPage,
  }: {
    firebase: typeof firebaseInstance;
    firebaseConfig: Record<string, unknown>;
    authenticationConfig?: Record<string, unknown>;
    registerPage?: string;
  }
) => {
  firebaseApp = firebase;

  if (registerPage) {
    app.get(registerPage, (req, res) => {
      res.send(loginPage(loginComponent(firebaseConfig, authenticationConfig)));
    });
  }
};
