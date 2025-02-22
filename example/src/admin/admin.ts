import AdminBroExpress from '@admin-bro/express';
import { FirestoreAdapter } from '@aquaswim/admin-bro-firebase';
import AdminBro from 'admin-bro';
import { Express } from 'express';
import { createUserResource } from './resources/user/user.resource';
import firebase from 'firebase';

const setupAdmin = async (app: Express): Promise<void> => {
  AdminBro.registerAdapter(FirestoreAdapter as any);
  const adminBro = new AdminBro({
    branding: {
      companyName: 'Firebase example',
    },
    resources: [
      createUserResource(),
      {
        collection: firebase.firestore().collection('Locations'),
        schema: {
          name: 'string',
          latitude: 'number',
          longitude: 'number',
        },
      },
    ],
  });

  const router = await AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, router);
};

export default setupAdmin;
