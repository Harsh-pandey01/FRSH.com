export default function userUserInfo(details) {
  const { displayName, email, uid, photoURL } = details;
  return { displayName, email, uid, photoURL };
}
