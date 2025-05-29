import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  enableIndexedDbPersistence,
} from "firebase/firestore";

// Initialise
export const app = initializeApp({
  apiKey:             import.meta.env.VITE_FB_API,
  authDomain:         import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:          import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket:      import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_FB_SENDER_ID,
  appId:              import.meta.env.VITE_FB_APP_ID,
  measurementId:      import.meta.env.VITE_FB_MEASUREMENT_ID,
});

export const auth = getAuth(app);
export const db   = getFirestore(app);

// Optional: cache Firestore for offline use
enableIndexedDbPersistence(db).catch(() => {/* ignore */});

// --- helpers ---------------------------------------------------
export async function googleLogin() {
  const res = await signInWithPopup(auth, new GoogleAuthProvider());
  // create empty user doc if first time
  const ref = doc(db, "users", res.user.uid);
  if (!(await getDoc(ref)).exists()) {
    await setDoc(ref, {
      mastered: {},
      ownedMats: {},
      settings: { theme: "default" },
    });
  }
}

export function onUser(cb: (uid: string | null) => void) {
  return onAuthStateChanged(auth, (u) => cb(u ? u.uid : null));
}
