import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  //
};
const Fire = initializeApp(firebaseConfig);
const Auth = getAuth(Fire);
const Database = getFirestore(Fire, {
  experimentalAutoDetectLongPolling: true,
  experimentalForceLongPolling: true,
});
const RealDatabase = getDatabase(Fire);
export {Fire, Auth, Database, RealDatabase};
