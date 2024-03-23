// @ts-nocheck
export default function avatarFetch(name?: string | null) {
  let letters = name?.substring(0, 2).toUpperCase().split("").join(" ");
  const link = `https://ui-avatars.com/api/?background=6b7280&name=${letters}&rounded=true&size=128&color=000000`;
  return link;
}
